const { body, checkExact } = require("express-validator");
const User = require("../../models/user.model");
const validatorMiddleware = require("../../middleware/validatorMiddleware");

exports.registerValidator = [
  body("name")
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3 })
    .withMessage("name must be at least 3 characters")
    .trim(),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email address")
    .custom(async (input) => {
      const userExist = await User.findOne({ email: input });

      if (userExist) return Promise.reject("Email already exists");

      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters"),
  body("bio").optional(),
  body("profileImage").optional(),
  checkExact(),
  validatorMiddleware,
];

exports.loginValidator = [
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be a valid email address"),
  body("password").notEmpty().withMessage("password is required"),
  checkExact(),
  validatorMiddleware,
];
