const express = require("express");
const { loginController, registerController, authControler } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth.middleware");

//router object

const router = express.Router();

//routes

//LOGIN || POST
router.post("/login", loginController);

//REGISTER || POST

router.post("/register", registerController);

//Authorization || POST
router.post("/getUserData", authMiddleware, authControler)

module.exports = router;