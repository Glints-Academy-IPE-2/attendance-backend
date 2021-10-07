// const { authJwt } = require("../middleware");

import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';

const router = express.Router();

//= ===============================
// Public routes
//= ===============================

router.post(
  '/register',
  validate(userValidator.register),
  userController.register,
);
router.post('/login', validate(userValidator.login), userController.login);

router.post('/requestResetPassword', validate(userValidator.requestResetPassword), userController.requestResetPasswordController);

router.post('/resetPassword/:email/:token', userController.resetPasswordController);

router.get('/verify-user/:token', userController.verifyUser);

module.exports = router;
