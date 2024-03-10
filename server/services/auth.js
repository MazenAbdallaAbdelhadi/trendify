const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const UserToken = require("../models/user-token.model");
const { unAuthorized } = require("../utils/response/errors");

exports.generateAccessToken = function (payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "15m",
  });
};

exports.generateRefreshToken = function (payload) {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    algorithm: "HS256",
    expiresIn: "30d",
  });
};

exports.setRefreshTokenCookie = function (res, token) {
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: "none",
    secure: true,
  });
};

exports.protect = asyncHandler(async function (req, res, next) {
  // 1- get bearer token from header
  const BearerToken =
    req.headers["authorization"] || req.headers["Authorization"];

  let token;
  if (BearerToken && BearerToken.startsWith("Bearer ")) {
    token = BearerToken.split(" ")[1];
  } else {
    return next(unAuthorized({ message: "token not found please login" }));
  }

  // 2- validate token
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
      algorithms: ["HS256"],
    });
  } catch (error) {
    return next(unAuthorized({ message: error.message }));
  }

  // 3- check if token was issued before last changed password
  const credential = await UserToken.findOne({
    user: decoded.userId,
    token: token,
  }).populate("user");

  // if user not found
  if (!credential) return next(unAuthorized({ message: "unAuthorized" }));

  if (credential.user?.passwordChangedAt) {
    const passChangedTimestamp = parseInt(
      credential.user?.passwordChangedAt.getTime() / 1000,
      10
    );

    if (passChangedTimestamp > decoded.iat) {
      return next(
        unAuthorized({
          message: "User recently changed his password. please login again..",
        })
      );
    }
  }

  // 4- set user to request object
  req.user = credential.user;
  next();
});

exports.allowedRoles = (...roles) =>
  asyncHandler(async function (req, _res, next) {
    // check if user role is allowed
    if (!roles.includes(req.user.role))
      next(unAuthorized({ message: "access denied" }));

    next();
  });
