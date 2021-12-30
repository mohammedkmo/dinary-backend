const router = require('express').Router()
const userController = require('../controllers/userController')
const authUser = require('../middlewares/auth')

router.get('/',authUser,userController.get)
router.post('/login',userController.post)
router.patch('/update',userController.patch)

module.exports = router