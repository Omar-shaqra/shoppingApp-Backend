const Bill = require("../../models/System/billModel");

module.exports = {
  async getBills(req, res) {
    try {
      const bills = await Bill.find();
      res.send(bills);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async getBill(req, res) {
    try {
      const bill = await Bill.findById(req.params.id);
      if (!bill) return res.status(404).send("Bill not found");
      res.send(bill);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async updateBill(req, res) {
    try {
      const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!bill) return res.status(404).send("Bill not found");
      res.send(bill);
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async deleteBill(req, res) {
    try {
      const bill = await Bill.findByIdAndDelete(req.params.id);
      if (!bill) return res.status(404).send("Bill not found");
      res.send({ message: "Bill deleted successfully" });
    } catch (err) {
      res.status(500).send(err);
    }
  },

  async incrementBillCount() {
    try {
      const bill = await Bill.findOne();
      if (!bill) {
        await Bill.create({ count: 1 });
      } else {
        bill.count++;
        await bill.save();
      }
    } catch (err) {
      console.log(err);
    }
  },
};
