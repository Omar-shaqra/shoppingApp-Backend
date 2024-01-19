const slugify = require("slugify");
const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const newLocal = "./uploadImageMiddleware.js";
const { uploadSingleImage } = require(newLocal);

exports.uploadCategoryImage = uploadSingleImage("image");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (req.file) {
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`uploads/categories/${filename}`);

    req.body.image = filename;
  }

  next();
});

//@desc get list of categories
//@route get/api/v1/categories
//@acess public

//@desc get specific category by id
//@route get/api/v1/categories:id
//acess public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);

  if (!category) {
    res.status(404).json({ msg: `no category for this id ${id}` });
  }
  res.status(200).json({ data: category });
});
//@desc create category
//@route POST /api/v1/categories
//@access private

exports.createCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(200).json({ data: category });
});
//@desc update specific cateogry
//@route  PUT /api/v1/categories:id
//@access privte
exports.updateCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
    },
    {
      new: true,
    }
  );

  if (!category) {
    return next(new ApiError(`no category for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: category });
});

//@desc Delete specific cateogry
//@route  DElete /api/v1/categories:id
//@access privte
exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return next(new ApiError(`no category for this id ${id}`, 404));
  }

  res.status(204).send();
});
