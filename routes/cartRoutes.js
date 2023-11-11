const router = require("express").Router();
const { addProductToCart } = require("../controllers/cartServiece");
const authServices = require("../controllers/authservices");

router.use(authServices.protect, authServices.allowedto("user"));

router.route("/").post(addProductToCart);
//   .get(getLoggedUserCart)
//   .delete(clearCart);

module.exports = router;
