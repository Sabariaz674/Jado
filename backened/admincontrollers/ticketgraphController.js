const Booking = require("../models/Payment");
exports.getSalesStats = async (req, res) => {
  try {
    const { period } = req.query; 

    let groupFormat;
    if (period === "day") {
      groupFormat = "%Y-%m-%d"; 
    } else if (period === "week") {
      groupFormat = "%Y-%U"; 
    } else if (period === "month") {
      groupFormat = "%Y-%m"; 
    } else {
      groupFormat = "%Y"; 
    }

    const stats = await Booking.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: groupFormat, date: "$createdAt" } },
          totalBookings: { $sum: 1 },
          totalRevenue: { $sum: "$totalPaid" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching sales stats:", error);
    res.status(500).json({ error: "Failed to fetch sales stats" });
  }
};

