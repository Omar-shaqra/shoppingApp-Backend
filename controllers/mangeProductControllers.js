
const manageProduct = require("../models/manageProductModel");

const create = async (req, res) => {
    const manageProducte = await manageProduct.create(req.body);
    res.status(200).json({ data: manageProducte });
};

const getByStoreId = async (req, res) => {
    const { id } = req.params;
    await manageProduct.find({shopeId: {$eq:id} })
        .then((docs)=>{
            res.status(200).json({ length:docs.length, data: docs });
        })
        .catch((error)=>{
            res.status(404),json({ error: error.message});
        });
};

const deleteOne = async (req, res) => {
    
}

module.exports = {
    create,
    getByStoreId
}



