const { Router } = require("express");
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadProfileImage,
  resizeProfileImage,
} = require("../controller/user.controller");
const {
  createUserValidator,
  deleteUserValidator,
  getUserValidator,
  updateUserValidator,
} = require("../utils/validator/user.validator");

const router = Router();

router
  .route("/")
  .post(uploadProfileImage, resizeProfileImage, createUserValidator, createUser)
  .get(getUsers);

router
  .route("/:id")
  .get(getUserValidator, getUser)
  .put(uploadProfileImage, resizeProfileImage, updateUserValidator, updateUser)
  .delete(deleteUserValidator, deleteUser);

module.exports = router;
