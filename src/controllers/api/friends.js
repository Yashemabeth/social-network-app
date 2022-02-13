const { User } = require("../../models");

const addNewFriendToUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, username } = req.body;
    const friend = await User.create({ email, username });
    const friendId = friend._id;

    const user = await User.findById(id);
    user.friends.push(friendId);

    await User.replaceOne({ _id: id }, user);

    const updatedUser = await User.findById(id);

    return res.json({ success: true, data: updatedUser });
  } catch (error) {
    console.log(`[ERROR]: Failed to create friend for user | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to create friend for user" });
  }
};
const deleteUserFriend = async (req, res) => {
  try {
    const { friendId, id } = req.params;

    const user = await User.findById(id);

    const newFriends = user.friends.filter(
      (currentFriend) => currentFriend._id != friendId
    );

    await User.updateOne({ _id: id }, { friends: newFriends });

    const data = await User.findById(id);

    return res.json({ success: true, data: data });
  } catch (error) {
    console.log(`[ERROR]: Failed to delete friend | ${error.message}`);
    return res
      .status(500)
      .json({ success: false, error: "Failed to delete friend" });
  }
};

module.exports = { addNewFriendToUser, deleteUserFriend };
