const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const generateToken = require("../utils/generateToken");

// LOGIN controller
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "❌ User not found" });
    }

    if (user.googleId) {
      return res.status(400).json({ message: "❌ Please log in with Google" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "❌ Invalid credentials" });
    }

    const token = generateToken(user._id, user.email, user.isAdmin ? "admin" : "user");

    // 🍪 Set JWT token cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // 🍪 Also set user info cookie (easy to access in frontend)
    res.cookie("user", JSON.stringify({
      _id: user._id,
      email: user.email,
      username: user.username,
      isAdmin: user.isAdmin,
    }), {
      httpOnly: false, // frontend can read this
      secure: false,
      sameSite: "Lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        isAdmin: user.isAdmin,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      message: "❌ Something went wrong during login",
      error: err.message,
    });
  }
};

module.exports = { login };
