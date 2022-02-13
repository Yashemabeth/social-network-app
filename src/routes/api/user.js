const { Router } = require("express");
const {
  getAllUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
} = require("../../controllers/api/user");

//const friends = require("./friends");

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserByID);
router.post("/", createUser);
router.put("/:id", updateUserByID);
router.delete("/:id", deleteUserByID);

//router.use("/:id/friends", friends);

module.exports = router;