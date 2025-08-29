
require("dotenv").config();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("./models/User");
const connectDB = require("./db");   
async function seedAdmin() {
  try {
    const {
      ADMIN_EMAIL = "admin@yourapp.com",
      ADMIN_USERNAME = "Admin User",
      ADMIN_PASSWORD,
      SALT_ROUNDS,
    } = process.env;

    if (!ADMIN_PASSWORD) throw new Error("Missing ADMIN_PASSWORD in .env");
    if (!SALT_ROUNDS) throw new Error("Missing SALT_ROUNDS in .env");

   
    await connectDB();

 const saltRounds = Number(SALT_ROUNDS);
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, saltRounds);

    let user = await User.findOne({ email: ADMIN_EMAIL });

    if (user) {
      user.username = user.username || ADMIN_USERNAME;
      user.isAdmin = true;
      user.password = passwordHash;
      await user.save();
      console.log("✔ Admin updated:", ADMIN_EMAIL);
    } else {
      await User.create({
        email: ADMIN_EMAIL,
        username: ADMIN_USERNAME,
        password: passwordHash,
        isAdmin: true,
        isVerified: true,
      });
      console.log("✔ Admin created:", ADMIN_EMAIL);
    }

    await mongoose.connection.close();
    process.exit(0);
  } catch (e) {
    console.error("❌ Seeder error:", e.message);
    process.exit(1);
  }
}

seedAdmin();
