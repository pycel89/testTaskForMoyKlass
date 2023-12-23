const Router = require('express')
const router = new Router()
const rootConstroller = require('../controllers/rootControllers')

router.get('/',rootConstroller.Get)


module.exports = router