const Store = require("../../models/System/storeModel");

module.exports = {
  async createStore(req, res) {
    try {
      const store = new Store(req.body);
      await store.save();
      res.send(store);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async getStores(req, res) {
    try {
      const stores = await Store.find();
      res.send(stores);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async getStore(req, res) {
    try {
      const store = await Store.findById(req.params.id);
      if (!store) return res.status(404).send("Store not found");
      res.send(store);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async updateStore(req, res) {
    try {
      const store = await Store.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });

      if (!store) return res.status(404).send("Store not found");

      res.send(store);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async deleteStore(req, res) {
    try {
      const store = await Store.findByIdAndDelete(req.params.id);

      if (!store) return res.status(404).send("Store not found");

      res.send({ message: "Store deleted successfully" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
