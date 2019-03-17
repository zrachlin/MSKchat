const router = require('express').Router();
const { Channel, Message, LastVisit } = require('../db/models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = router;

router.get('/me/unread-message-counts', async (req, res, next) => {
  try {
    const channels = await Channel.findAll();
    const unreadMessagesArray = await Promise.all(
      channels.map(async channel => {
        const latestVisit = await LastVisit.findOne({
          where: {
            userId: req.user.id,
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
    res.json({ unreadMessagesArray });
  } catch (error) {
    next(error);
  }
});

router.get('/me/unread-message-counts/:channelId', async (req, res, next) => {
  try {
    const latestVisit = await LastVisit.findOne({
      where: { userId: req.user.id, channelId: req.params.channelId },
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
  } catch (error) {
    next(error);
  }
});

router.put('/me/latest-channel-visits/:channelId', async (req, res, next) => {
  try {
    console.log('hi');
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
});
