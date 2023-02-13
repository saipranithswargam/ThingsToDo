const express = require('express')
const userController = require('../controllers/user')
const Router =  express.Router()
const isAuth = require("../middleware/is-Auth")
Router.get("/create-collection",isAuth,userController.getCollectionPage)

Router.post("/create-collection",isAuth,userController.postCollectionPage);

Router.get("/user/dashboard",isAuth,userController.getDashboard);

Router.get("/:id",isAuth,userController.getProfilePage)

module.exports = Router;
