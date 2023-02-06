const express = require('express')
const Router = express.Router();
const authController = require('../controllers/auth');

Router.get("/login",authController.getLogin)
Router.get("/signup",authController.getSignup)


module.exports = Router