const express = require('express')
const usersController = require('../controllers/usersController')
const router = express.Router()


router.get('/:name', usersController.showUser)



module.exports = router