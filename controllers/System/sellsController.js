const Store = require("../../models/System/sellsModels");
const { incrementBillCount } = require("./billcontroller");
module.exports = {
  async createSell(req, res) {
    try {
      const store = new Store(req.body);
      await incrementBillCount();
      await store.save();
      res.send(store);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async getSells(req, res) {
    try {
      const stores = await Store.find();
      res.send(stores);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async getSell(req, res) {
    try {
      const store = await Store.findById(req.params.id);
      if (!store) return res.status(404).send("Sell not found");
      res.send(store);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async updateSell(req, res) {
    try {
      const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      await incrementBillCount();
      if (!store) return res.status(404).send("Sell not found");

      res.send(store);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async deleteSell(req, res) {
    try {
      const store = await Store.findByIdAndDelete(req.params.id);

      if (!store) return res.status(404).send("Sell not found");

      res.send({ message: "Sell deleted successfully" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
