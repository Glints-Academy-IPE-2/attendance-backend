import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';

const express = require('express');

const router = express.Router();

router.get('/login/:token/:username', userController.checkVerified);
router.post('/checkin/:id', validate(userValidator.checkin), userController.checkin);
router.post('/checkout/:id', validate(userValidator.checkout), userController.checkout);
router.put('/location/:id', userController.getLocation);

module.exports = router;
