const asyncHandler = require("express-async-handler");
const sharp = require("sharp");
const { v4: uuidV4 } = require("uuid");
const User = require("../models/user.model");
const {
  createOne,
  getOne,
  paginate,
  updateOne,
  deleteOne,
} = require("../services/factory-handler");
const { uploadSingle } = require("../services/file-upload");

exports.uploadProfileImage = uploadSingle("profileImage");

exports.resizeProfileImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `user-${uuidV4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    // save img to db
    req.body.profileImage = filename;
  }
  next();
});

/**
 * @desc create a new user
 * @path POST /v1/users
 * @access private ADMIN
 */
exports.createUser = createOne(User);

/**
 * @desc get users
 * @path GET /v1/users
 * @access private ADMIN
 */
exports.getUsers = paginate(User, ["name", "email"]);

/**
 * @desc get user by id
 * @path GET /v1/users/:id
 * @access private ADMIN
 */
exports.getUser = getOne(User);

/**
 * @desc update user by id
 * @path PUT /v1/users/:id
 * @access private ADMIN
 */
exports.updateUser = updateOne(User);

/**
 * @desc delete user by id
 * @path DELETE /v1/users/:id
 * @access private ADMIN
 */
exports.deleteUser = deleteOne(User);
