const router = require('express').Router();
const { Message } = require('../db/models');

module.exports = router;

// GET /api/messages
router.get('/', async (req, res, next) => {
  try {
    const messages = await Message.findAll();
    res.json(messages);
  } catch (err) {
    next(err);
  }
});

// POST /api/messages
router.post('/', async (req, res, next) => {
  try {
    const { content } = req.body;
    const message = await Message.create({ content, userId: req.user.id });
    res.json(message);
  } catch (err) {
    next(err);
  }
});

// Currently unused by frontend:

// PUT /api/messages
router.put('/:messageId', async (req, res, next) => {
  try {
    const messageId = req.params.messageId;
    const message = await Message.findById(messageId);
    await message.update(req.body);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// DELETE /api/messages
router.delete('/:messageId', async (req, res, next) => {
  try {
    const id = req.params.messageId;
    await Message.destroy({ where: { id } });
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
