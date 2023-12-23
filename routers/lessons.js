const Router = require('express')
const router = new Router()
const lessonsController = require('../controllers/lessonsControllers')

router.post('/',lessonsController.createLessons)


module.exports = router