import express from 'express';
import * as adminController from '../controllers/admin/admin.controller';


const router = express.Router();

router.get('/approve-user/:token', adminController.approveUser);
router.get('/get-user', adminController.getAllUsers);
router.get('/get-user/:id', adminController.getUserById);
router.get('/get-attendance', adminController.getAllAttendance)
router.post('/delete-user/:userId', adminController.deleteUserById);


module.exports = router;
