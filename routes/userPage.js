const express = require('express')
const userController = require('../controllers/user')
const Router =  express.Router()
const isAuth = require("../middleware/is-Auth")
Router.get("/create-collection",isAuth,userController.getCollectionPage)

Router.post("/create-collection",isAuth,userController.postCollectionPage);

Router.get("/user/dashboard",isAuth,userController.getDashboard);

Router.post("/view-more",isAuth,userController.postViewMore);

Router.get("/view-more/:id",isAuth,userController.getViewMore);

Router.post("/delete/task",isAuth,userController.postDeleteTask);

module.exports = Router;
