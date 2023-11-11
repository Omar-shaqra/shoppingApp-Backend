const Owner = require("../../models/System/ownerModel");
const Branch = require("../../models/System/branchModel");
const Store = require("../../models/System/storeModel");
const Product = require("../../models/productModel");
var ObjectId = require('mongoose').Types.ObjectId; 



const asyncHandler = require("express-async-handler");

exports.createOwner = asyncHandler(async (req, res, next) => {
  const owner = await Owner.create(req.body);
  res.status(200).json({ data: owner });
});

exports.getOwners = asyncHandler(async (req, res, next) => {
  const owner = await Owner.find({});
  res.status(200).json({ results: owner.length, data: owner });
});

exports.getOwner = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const owner = await Owner.findById(id);

  if (!owner) {
    res.status(404).json({ msg: `no user for this id ${id}` });
  }
  res.status(200).json({ data: owner });
});

exports.updateOwner = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!user) {
    return next(new ApiError(`no user for this id ${req.params.id}`, 404));
  }
  res.status(200).json({ data: user });
});

exports.deleteOne = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new ApiError(`no user for this id ${id}`, 404));
  }

  res.status(204).send();
});

exports.getAllStores = async (req, res) => {
  let id = new ObjectId(req.params)
  await Store.find({ owner: id})
            .then((stores)=>{
              res.status(200).json({ length: stores.length , stores : stores  });
            })                           
            .catch(()=>{
              res.status(404).json({ message: "This owner no contain any store" });
            })
};

exports.getAllProducts = async (req, res) => {
  const { storeId } = req.params;
  await Product.find({ storeID : storeId})
            .then((products)=>{
              res.status(200).json({ length: products.length , products : products  });
            })                           
            .catch(()=>{
              res.status(404).json({ message: "This Store no contain any product" });
            })
};

exports.getAllBranch = async (req, res) => {
  // const { id: storeID } = req.body; // Destructure the 'id' property from the request body
  console.log(req.params);
  let id = new ObjectId(req.params)
  await Branch.find({ storeId : id })
            .then((branchs)=>{
              res.status(200).json({ length: branchs.length , branchs : branchs  });
            })                           
            .catch(()=>{
              res.status(404).json({ message: "This Store no contain any branch" });
            })
}
