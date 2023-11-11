const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
    {
        phone: {
            type:Number,
            require:true
        },
        name: {
            type:String,
            require:true,
            trim:true
        },
        productType: {
            type:String,
            require:true
        },
        NetProfit: { //safy
            type:Number,
        }
    }
);

const supplierModel = mongoose.model("Supplier", supplierSchema);

module.exports = supplierModel;

