const { Router } = require("express");
const {
  register,
  login,
  refresh,
  logout,
} = require("../controller/auth.controller");
const {
  uploadProfileImage,
  resizeProfileImage,
} = require("../controller/user.controller");
const {
  registerValidator,
  loginValidator,
} = require("../utils/validator/auth.validator");

const router = Router();

router.post(
  "/register",
  uploadProfileImage,
  resizeProfileImage,
  registerValidator,
  register
);
router.post("/login", loginValidator, login);
router.get("/refresh", refresh);
router.delete("/logout", logout);

module.exports = router;
