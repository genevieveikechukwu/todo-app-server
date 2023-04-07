const userController = require('../controllers/userController')

const router = require('express').Router()

router.post('/', userController.addUser)

module.exports = router