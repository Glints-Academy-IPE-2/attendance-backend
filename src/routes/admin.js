import express from 'express';
import * as adminController from '../controllers/admin/admin.controller';
import * as controller from '../controllers/dashboard';

const router = express.Router();

router.get('/user', adminController.getAllUsers);

router.get(
  '/dashboard',
  controller.adminBoard,
);

router.get('/approve-user', adminController.approveUser);

router.get('/show/:detailId', adminController.getUserById);

module.exports = router;
