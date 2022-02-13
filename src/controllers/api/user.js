const { User } = require("../../models");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate("friends");
    return res.json({ success: true, data: users });
  } catch (error) {
    console.log(`[ERROR]: Failed to get all users from DB | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to get all users" });
  }
};
const getUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate("friends");
    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(`[ERROR]: Failed to get user by ID | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to get user by ID" });
  }
};
const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.create({ username, email });
    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(`[ERROR]: Failed to create user | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create user in the DB" });
  }
};
const updateUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const user = await User.findByIdAndUpdate( id , { ...body }, {new:true});

    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(`[ERROR]: Failed to update user by ID | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to update user" });
  }
};

const deleteUserByID = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete user from DB | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete user from DB" });
  }
};

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  updateUserByID,
  deleteUserByID,
};