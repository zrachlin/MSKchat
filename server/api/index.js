const router = require('express').Router();
module.exports = router;

router.use('/channels', require('./channels'));
router.use('/messages', require('./messages'));
router.use('/users',require('./users'))

router.use((req, res, next) => {
  res.status(404).send('API route not found');
});
