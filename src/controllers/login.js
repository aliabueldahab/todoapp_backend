const user = require("../models/user.model");
const checkuser = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return
       res.status(401).json({
        message: "email and password are required",
      });
    }

    const result = await checkuser(email, password);
    if (!result) {
      return res.status(404).json({
        error: "Email or password is incorrect",
      });
    }

    const token = jwt.sign(
      { id: result._id, email: result.email },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "5h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: result._id,
        name: result.username,
        email: result.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    console.log(error);
    
  }
};

module.exports = login;
