const { oauth2client } = require("../utils/googleConfig");
const axios = require("axios");
const UserModel = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    if (!code) {
      return res.status(400).json({
        message: "Google OAuth code is missing",
      });
    }
    const googleRes = await oauth2client.getToken(code);
    oauth2client.setCredentials(googleRes.tokens);
    let userRes;
    try {
      userRes = await axios.get(
        `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
      );
    } catch (err) {
      console.error("Failed to fetch Google user info:", err);
      return res.status(500).json({
        message: "Failed to fetch user information from Google",
        error: err.message,
      });
    }

    console.log("Google user info:", userRes.data);
    const { email, name, picture, id } = userRes.data;

    let user = await UserModel.findOne({ email });

    if (!user) {
      user = await UserModel.create({
        name,
        email,
        image: picture,
        googleId: id, 
        role: "user",
      });
    } else {
      if (!user.googleId) {

        user.googleId = id;
        user.image = picture; 
        await user.save();
      }
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        message: "JWT secret not defined in environment variables",
      });
    }
    
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Google login successful",
      user: {
        _id: user._id,         
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Google login error:", err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

module.exports = { googleLogin };
