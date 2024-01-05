const Order = require("../models/orderModel");

module.exports = {
  async createOrder(req, res) {
    try {
      const order = await Order.create(req.body);
      res.status(201).json({
        status: "success",
        order,
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  },

  async getOrders(req, res) {
    try {
      const orders = await Order.find();
      res.send(orders);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async getOrder(req, res) {
    try {
      const order = await Order.findById(req.params.id);
      if (!order) return res.status(404).send("Order not found");
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async updateOrder(req, res) {
    try {
      const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!order) return res.status(404).send("Order not found");
      res.send(order);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async deleteOrder(req, res) {
    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) return res.status(404).send("Bill not found");
      res.send({ message: "Order deleted successfully" });
    } catch (err) {
      res.status(500).send(err);
    }
  },
};
