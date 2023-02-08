const express = require('express')
const userController = require('../controllers/user')
const Router =  express.Router()
const isAuth = require("../middleware/is-Auth")
Router.get("/create-collection",isAuth,userController.getCollectionPage)

Router.get("/:id",isAuth,userController.getProfilePage)

module.exports = Router;
