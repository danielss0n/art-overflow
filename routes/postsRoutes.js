const express = require('express')
const postsController = require('../controllers/postsController')

const router = express.Router()
const checkAuth = require('../helpers/auth').checkAuth

const { imageUpload } = require('../helpers/image-upload')

router.get('/', postsController.showPosts)
router.get('/dashboard', checkAuth, postsController.dashboard)
router.get('/create', checkAuth, postsController.createPage)

router.get('/:title', postsController.postPage)


router.post(
    '/create', 
    checkAuth, 
    imageUpload.single('image'), 
    postsController.create
    )

module.exports = router