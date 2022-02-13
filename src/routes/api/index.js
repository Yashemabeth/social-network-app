const { Router } = require("express");

const users = require("./user");
// const thoughts = require("./thoughts");

const router = Router();

router.use("/users", users);
// router.use("/thoughts", thoughts);

module.exports = router;