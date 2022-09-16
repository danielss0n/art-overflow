const express = require('express')
const userController = require('../controllers/userController')
const postController = require('../controllers/postController')
const router = express.Router()
const { imageUpload } = require('../helpers/image-upload')

router.get('/register', userController.registerPage)
router.get('/login', userController.loginPage)
router.post('/register', userController.register)
router.post('/login', userController.login)

router.get('/logout', userController.logout)

router.post('/createpost',
    imageUpload.single('image'), 
    postController.posting)

module.exports = router