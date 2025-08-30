const UserModel = require("../models/User");
require("dotenv").config(); 
const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
   
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    const saltRounds = process.env.SALT_ROUNDS || 10;
    const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "✅ User created successfully. Please check your email for verification." });
  } catch (err) {
    console.error("Signup error:", err);
    res
      .status(500)
      .json({ message: "Something went wrong during signup", error: err.message });
  }
};

module.exports = { signup };
