
const Supplier = require('../../models/System/supplierModel')

const addSupplier = async(req, res) => {
    const supplier = await Supplier.create(req.body);
    res.status(200).send({ data: supplier});
};

const updateSupplier = async(req, res) => {
    const { id } = req.params;
    const { phone, name, productType, NetProfit} = req.body;
    try{
        const update = {
            phone:phone, 
            name:name, 
            productType:productType,
            NetProfit:NetProfit,
        }
        let updateSupplier = await Supplier.findByIdAndUpdate(id, update, { new: true });
        res.status(200).json({ data: updateSupplier});
    }catch{
        res.status(500).send({ message: 'Server error'});
    }
}

const getSupplier = async(req, res) => {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    if(!supplier) {
        res.status(404).json({ msg: `no supplier for this id ${id}` });
        return;
    }
    res.status(200).json({ data: supplier});
}

const deleteSupplier = async(req, res) => {
    const { id } = req.params;
    const deletedSupplier = await Supplier.findByIdAndDelete(id);
    if (!deletedSupplier) {
        res.status(404).json({msg : "error : id of supplier is not found"});
        return;
    }
    res.status(202).send();

}

const getAllSuppliers = async(req, res) => {
    const user = await Supplier.find({});
    res.status(200).json({ results: user.length, data: user });
}

module.exports = {
    addSupplier,
    updateSupplier,
    getSupplier,
    deleteSupplier,
    getAllSuppliers
}