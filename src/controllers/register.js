const user = require("../models/user.model");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(401).json({
      message: "all fields are required",
    });
  }

  const isExistUsername = await user.findOne({ username });
  if (isExistUsername) {
    return res.status(401).json({
      message: "username is already exist",
    });
  }

  const isExistEmail = await user.findOne({ email });
  if (isExistEmail) {
    return res.status(401).json({
      message: "Email is already exist",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const newuser = new user({
    username,
    email,
    password: hashedPassword,
  });

  await newuser.save();

  res.status(200).json({
    newuser
  })
};

module.exports = register;
