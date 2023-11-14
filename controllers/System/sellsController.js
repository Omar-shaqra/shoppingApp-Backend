const Sells = require("../../models/System/sellsModels");
const Product = require("../../models/productModel");
const Storehouse = require("../../models/System/storehouseModel");
const ingredient = require("../../models/System/IngredientsModel");

const { incrementBillCount } = require("./billcontroller");
module.exports = {
  async createSell(req, res) {
    try {
      const sell = new Sells(req.body);
      await incrementBillCount();
      await sell.save();
      res.send(sell);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async getSells(req, res) {
    try {
      const sell = await Sells.find();
      res.send(sell);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async getSell(req, res) {
    try {
      const sell = await Sells.findById(req.params.id);
      if (!sell) return res.status(404).send("Sell not found");
      res.send(sell);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async updateSell(req, res) {
    try {
      const sell = await Sells.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      await incrementBillCount();
      if (!sell) return res.status(404).send("Sell not found");

      res.send(sell);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async deleteSell(req, res) {
    try {
      const sell = await Sells.findByIdAndDelete(req.params.id);

      if (!sell) return res.status(404).send("Sell not found");

      res.send({ message: "Sell deleted successfully" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async SubtractIngedients(req, res) {
    try {
      const storehouseId = req.params.storehouseId;
      const { productId, quantity, unit } = req.body;
      const {
        paymentType,
        shopId,
        systemUserId,
        clientId,
        billcount,
        totalPrice,
      } = req.body;

      // Find the product being sold
      const product = await Product.findById(productId).populate("ingredients");

      // Check if the product exists
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if the product category is "food"
      if (!product.category || product.category.name !== "food") {
        return res
          .status(400)
          .json({ error: "Only food products can be sold" });
      }

      // Calculate the quantity to subtract based on the unit
      let quantityToSubtract = quantity;
      if (unit === "kilograms") {
        quantityToSubtract *= 1000; // Convert kilograms to grams
      }

      // Check if the storehouse exists
      const storehouse = await Storehouse.findOne({ _id: storehouseId });
      if (!storehouse) {
        return res.status(404).json({ error: "Storehouse not found" });
      }

      // Subtract the sold product's ingredients from the storehouse quantity
      for (const ingredient of product.ingredients) {
        const ingredientQuantityToSubtract =
          ingredient.quantity * quantityToSubtract;
        const storehouseProduct = storehouse.products.find((p) =>
          p.product.equals(productId)
        );

        if (!storehouseProduct) {
          return res.status(404).json({
            error: ` ${storehouse.products} Storehouse quantitiy not found`,
          });
          continue;
        } else {
          storehouseProduct.quantity -= ingredientQuantityToSubtract;
        }
      }

      // Save the updated storehouse
      await storehouse.save();

      // Create a new sale record
      const sale = new Sells({
        productId,
        quantity,
        unit,
        paymentType,
        shopId,
        systemUserId,
        billcount,
        clientId,
        totalPrice,
      });

      // Save the sale record
      await sale.save();

      res
        .status(200)
        .json({ message: "Product sold successfully", data: sale });
    } catch (error) {
      console.error("Error selling product:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
