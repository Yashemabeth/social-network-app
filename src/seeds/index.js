const users = require("./User");

const thoughts = require("./thoughts");

const mongoose = require("mongoose");

const { User, Thought } = require("../models");

const init = async () => {
  await mongoose.connect("mongodb://localhost:27017/socialDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("database connection successful");
  await User.deleteMany({});

  const usersFromDB = await User.insertMany(users);
  

  console.log("[INFO]: Successfully seeded users");

  await Thought.deleteMany({});
  const thoughtsFromDb = await Thought.insertMany(thoughts);

  console.log("[INFO]: Successfully seeded thoughts");

  console.log(thoughtsFromDb)
  // seed thoughts for users
  const allthoughts = thoughtsFromDb.map(async (thought) => {
    const username = thought.username;

    const user = usersFromDB.find((user) => user.username === username);

    user.thoughts.push(thought._id.toString());

    console.log(user)

    await User.findByIdAndUpdate(user._id, { ...user });
  });
  await Promise.all(allthoughts);

  const friendsPromise = usersFromDB.map(async (user) => {
    const userName = user.username;
    const allUsers = usersFromDB.filter(
      (currentUser) => currentUser.username != userName
    );

    const randomFriend =
      usersFromDB[Math.floor(Math.random() * allUsers.length)];

    user.friends.push(randomFriend._id);

    await User.findByIdAndUpdate(user._id, { ...user });
  });

  await Promise.all(friendsPromise);

  await mongoose.disconnect();
};

init();
