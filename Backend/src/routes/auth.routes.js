const { Router } = require('express');
const authControllers = require('../controllers/auth.controllers');
const authMiddlewares = require('../middlewares/auth.middleware');

const authRouter = Router();

/*
* @route POST /api/auth/register
* @description Register a new user
* @access Public
*/
authRouter.post('/register',authControllers.registerUser);

/*
* @route POST /api/auth/login
* @description login user with email and password
* @access Public
*/
authRouter.post('/login',authControllers.loginUser);

/*
* @route GET /api/auth/logout
* @description clear token from user cookie and add the token in blacklist
* @access public
*/
authRouter.get('/logout',authControllers.logoutUser);

/*
* @route GET /api/auth/get-me
* @description get the current logged in user details
* @access private
*/
authRouter.get('/get-me',authMiddlewares.authUser,authControllers.getmeUser);

module.exports = authRouter;