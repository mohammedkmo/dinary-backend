const router = require('express').Router()
const pricesController = require('../controllers/pricesController')
const authUser = require('../middlewares/auth')

router.get('/',pricesController.get)
router.post('/new',authUser,pricesController.post)
router.get('/last',pricesController.getLast)



module.exports = router