const Router = require('express')
const router = new Router()
const root = require('./root')
const lessons = require('./lessons')

//router.use('/botMassage',botMassage)
router.use('/lessons',lessons)
router.use('/*',root)

module.exports = router