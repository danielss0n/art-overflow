const express = require('express')
const authController = require('../controllers/authController')
const postController = require('../controllers/postsController')
const router = express.Router()


router.get('/register', authController.registerPage)
router.get('/login', authController.loginPage)

router.post('/register', authController.register)
router.post('/login', authController.login)

router.get('/logout', authController.logout)



module.exports = router