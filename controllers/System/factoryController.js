const Factory = require("../../models/System/factoryModel");

// Get all factories
exports.getAllFactories = async (req, res) => {
  try {
    const factories = await Factory.find();
    res.status(200).json({
      status: "success",
      results: factories.length,
      data: {
        factories,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Get single factory
exports.getFactory = async (req, res) => {
  try {
    const factory = await Factory.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        factory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Create a factory
exports.createFactory = async (req, res) => {
  try {
    const newFactory = await Factory.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        factory: newFactory,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

// Update a factory
exports.updateFactory = async (req, res) => {
  try {
    const factory = await Factory.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        factory,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};

// Delete a factory
exports.deleteFactory = async (req, res) => {
  try {
    await Factory.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
};
