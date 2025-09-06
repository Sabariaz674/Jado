// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const flightRoutes = require("./adminroutes/flightRoutes");
const stripeRoutes = require("./routes/paymentRoutes");
const bookingRoutes = require("./adminroutes/allbookingRoutes");
const ticketgraphRoutes = require("./adminroutes/ticketgraphRoutes");
const dashboardRoutes = require("./adminroutes/dashboardRoutes");
const emailRoutes = require("./routes/emailRoutes");



dotenv.config();

const app = express();


app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
connectDB();
app.use("/auth", authRoutes);
app.use("/api/flights", flightRoutes);
app.use("/api/payment", stripeRoutes);
app.use("/api/allbooking", bookingRoutes);
app.use("/api/ticketgraph", ticketgraphRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/email", emailRoutes);





app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
