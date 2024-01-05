const router = require("express").Router();
const { validateOrder } = require("../utils/validator/orderValidator");
const Authservices = require("../controllers/authservices");

const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderservices");

router
  .route("/")
  .get(
    // Authservices.protect,
    getOrders
  )
  .post(
    // Authservices.protect,
    validateOrder,
    createOrder
  );
router
  .route("/:id")
  .get(
    // Authservices.protect,
    getOrder
  )
  .put(
    // Authservices.protect,
    validateOrder,
    updateOrder
  )
  .delete(
    // Authservices.protect,
    deleteOrder
  );

module.exports = router;
