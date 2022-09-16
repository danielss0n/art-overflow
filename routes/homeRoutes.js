const express = require('express')
const homeController = require('../controllers/homeController')
const postController = require('../controllers/postController')

const router = express.Router()
const checkAuth = require('../helpers/auth').checkAuth

router.get('/posts', homeController.showPosts)
router.get('/dashboard', postController.dashboard)

module.exports = router