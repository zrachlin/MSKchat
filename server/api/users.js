const router = require('express').Router();
const { Channel, Message, LastVisit } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = router;

router.get('/:userId/unread-message-counts', async (req, res, next) => {
  try {
    if (Number(req.user.id) === Number(req.params.userId)) {
      const channels = await Channel.findAll();
      const unreadMessageArray = await Promise.all(
        channels.map(async channel => {
          const latestVisit = await LastVisit.findOne({
            where: {
              userId: req.params.userId,
              channelId: channel.id,
            },
          });
          const latestTime = (latestVisit && latestVisit.updatedAt) || null;

          const unreadMessages = await Message.findAll({
            where: {
              channelId: channel.id,
              updatedAt: {
                [Op.gt]: latestTime || 0,
              },
            },
          });
          return { channelId: channel.id, count: unreadMessages.length };
        })
      );
      res.json(unreadMessageArray);
    } else {
      res.send('Permission Denied');
    }
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:userId/unread-message-counts/:channelId',
  async (req, res, next) => {
    try {
      if (Number(req.user.id) === Number(req.params.userId)) {
        const latestVisit = await LastVisit.findOne({
          where: { userId: req.params.userId, channelId: req.params.channelId },
        });

        const latestTime = (latestVisit && latestVisit.updatedAt) || null;

        const unreadMessages = await Message.findAll({
          where: {
            channelId: req.params.channelId,
            updatedAt: {
              [Op.gt]: latestTime || 0,
            },
          },
        });

        res.json(unreadMessages.length);
      } else {
        res.send('Permission Denied');
      }
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:userId/latest-channel-visits/:channelId',
  async (req, res, next) => {
    try {
      const [channelVisit, created] = await LastVisit.findOrCreate({
        where: { userId: req.user.id, channelId: req.params.channelId },
      });
      channelVisit.time = new Date().toLocaleString();
      await channelVisit.save();
      const returnChannelVisit = channelVisit.toJSON();
      res.json(returnChannelVisit);
    } catch (error) {
      next(error);
    }
  }
);
