const { Router } = require("express");
const {
  deleteUserFriend,
  addNewFriendUser,
} = require("../../controllers/api/friends");

const router = Router({ mergeParams: true });

router.post("/", deleteUserFriend);
router.delete("/:friendId", addNewFriendUser);

module.exports = router;