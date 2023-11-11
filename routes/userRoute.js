const express = require("express");
const {
  createUser,
  deleteOne,
  getUser,
  getUsers,
  updateUser,
  getUserType
} = require("../controllers/userControllers");
const {
  getuserValidator,
  createuserValidator,
  updateuserValidator,
} = require("../utils/validator/uservalidation");

const router = express.Router();

router.route("/").post(createuserValidator, createUser).get(getUsers);

router
  .route("/:id")
  .put(updateuserValidator, updateUser)
  .delete(getuserValidator, deleteOne)
  .get(getuserValidator, getUser);

router.get('/userType/:id', getUserType)

module.exports = router;
