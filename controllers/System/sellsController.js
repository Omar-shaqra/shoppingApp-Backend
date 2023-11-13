const Sells = require("../../models/System/sellsModels");
const Product = require("../../models/productModel");
const Storehouse = require("../../models/System/storehouseModel");
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
    const { productId } = req.params;
    const { quantity, unit } = req.body;

    try {
      // Find the product by ID
      const product = await Product.findById(productId).populate(
        "ingredients.ingredient"
      );
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      // Check if the product is in the food category
      if (product.category === "food") {
        // Subtract the sold product's ingredients from the storehouse
        const storehouse = await Storehouse.findOne();
        if (!storehouse) {
          return res.status(404).json({ error: "Storehouse not found" });
        }

        for (const ingredient of product.ingredients) {
          const storedProduct = storehouse.products.find(
            (item) => item.product.toString() === productId
          );

          if (!storedProduct) {
            return res
              .status(404)
              .json({ error: "Product not found in storehouse" });
          }

          const soldIngredientQuantity =
            quantity * (ingredient.quantity / ingredient.unit);
          const updatedQuantity =
            storedProduct.quantity - soldIngredientQuantity;

          if (updatedQuantity < 0) {
            return res
              .status(400)
              .json({ error: "Insufficient quantity in storehouse" });
          }

          storedProduct.quantity = updatedQuantity;
        }

        // Save the updated storehouse
        await storehouse.save();
      }

      // Create a new sell entry
      const sell = new Sells({
        product: productId,
        quantity,
        unit,
      });

      await sell.save();

      return res.status(200).json({ message: "Product sold successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};
