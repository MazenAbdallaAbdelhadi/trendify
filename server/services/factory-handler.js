const asyncHandler = require("express-async-handler");
const errors = require("../utils/response/errors");

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.success({ data: document });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findById(req.params.id);

    if (!document) return next(errors.recordNotFound());

    res.success({ data: document });
  });

exports.getAll = (Model) =>
  asyncHandler(async (req, res) => {
    const documents = await Model.find();
    res.success(documents);
  });

exports.paginate = (Model, searchFields) =>
  asyncHandler(async (req, res) => {
    // TODO add pagination functionality
    const documents = await Model.find();
    res.success({data:documents});
  });

exports.updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) return next(errors.recordNotFound());

    res.success({ data: document });
  });

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) return next(errors.recordNotFound());

    res.success();
  });
