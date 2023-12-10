
const manageProduct = require("../models/manageProductModel");


//d@desc create manage product
//@route post /manageProduct
const create = async(req, res) => {
    const manageProducte = await manageProduct.create(req.body);
    res.status(200).json({ data: manageProducte });
};


module.exports = {
    create
}



