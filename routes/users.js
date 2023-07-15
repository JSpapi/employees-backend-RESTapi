const express = require("express");
const router = express.Router();
const { login, register, current } = require("../controllers/userControllers");
const { auth } = require("../middleware/auth");
// api/user/login
router.post("/login", login);

router.post("/register", register);
router.get("/current", auth, current);

module.exports = router;
