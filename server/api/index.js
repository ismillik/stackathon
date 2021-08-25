const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/imdb', require('./imdb'));
router.use('/stream', require('./stream'));

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
