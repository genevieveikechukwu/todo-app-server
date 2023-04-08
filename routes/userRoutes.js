const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

const router = require('express').Router()

router.post('/signup', userController.addUser)
router.post('/signin', authController.loginUser)

module.exports = router