var express = require("express");
import validate from "express-validation";

import * as userController from "../controllers/user/user.controller";
import * as userValidator from "../controllers/user/user.validator";

const router = express.Router();

// router.get("/:userId", userController.getUserById);

// router.put(
//   "/:userId",
//   validate(userValidator.updateUserById),
//   userController.updateUserById
// );

router.get('/login/:token/:username', userController.checkVerified)

router.post("/checkin/:id", validate(userValidator.checkin),userController.checkin);
router.post( "/checkout/:id", validate(userValidator.checkout),userController.checkout);

router.put("/location/:id", userController.getLocation);

module.exports = router;
