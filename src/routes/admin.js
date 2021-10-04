import express from "express";
import * as adminController from "../controllers/admin/admin.controller";
import * as controller from "../controllers/dashboard";

const router = express.Router();

//= ===============================
// Admin routes
//= ===============================
router.get("/user", adminController.getAllUsers);
// router.get('/user/:userId', adminController.manageAccess)

router.get(
  "/dashboard",
  controller.adminBoard
);

// router.get("/allAttendances", adminController.getAllAttendances);

router.get("/show/:detailId", adminController.getUserById);

module.exports = router;