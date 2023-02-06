const express = require('express')
const userController = require('../controllers/user')
const Router =  express.Router()

Router.get("/:id",userController.getProfilePage)

module.exports = Router;
