import express from 'express';
import * as adminController from '../controllers/admin/admin.controller';


const router = express.Router();

router.get('/approve-user', adminController.approveUser);
router.get('/get-user', adminController.getAllUsers);
router.get('/get-user/:id', adminController.getUserById);

module.exports = router;
