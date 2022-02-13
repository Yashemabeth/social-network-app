const users = require("./User");

const thoughts = require("./thoughts");

const mongoose = require("mongoose");

const {User, Thought}= require("../models");

const init = async () => {
    await mongoose.connect("mongodb://localhost:27017/socialDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log("database connection successful")
    await User.deleteMany({});
    await User.insertMany(users);

    console.log("[INFO]: Successfully seeded users");

    await Thought.deleteMany({});
    await Thought.insertMany(thoughts);

    console.log("[INFO]: Successfully seeded thoughts");
};

init ();

