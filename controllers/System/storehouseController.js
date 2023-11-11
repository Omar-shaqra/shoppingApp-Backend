const Storehouse = require("../../models/System/storehouseModel");

module.exports = {
  async createStorehouse(req, res) {
    try {
      const storehouse = new Storehouse(req.body);
      await storehouse.save();
      res.send(storehouse);
    } catch (err) {
      res.status(400).send(err);
    }
  },

  async getStorehouses(req, res) {
    try {
      const storehouses = await Storehouse.find();
      res.send(storehouses);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async getStorehouse(req, res) {
    try {
      const storehouse = await Storehouse.findById(req.params.id);
      if (!storehouse) return res.status(404).send("Storehouse not found");
      res.send(storehouse);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async updateStorehouse(req, res) {
    try {
      const storehouse = await Storehouse.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!storehouse) return res.status(404).send("Storehouse not found");

      res.send(storehouse);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async deleteStorehouse(req, res) {
    try {
      const storehouse = await Storehouse.findByIdAndDelete(req.params.id);

      if (!storehouse) return res.status(404).send("Storehouse not found");

      res.send({ message: "Storehouse deleted" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
