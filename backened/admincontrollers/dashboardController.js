const Flight = require("../models/Flight");
const Booking = require("../models/Payment");

exports.getDashboardStats = async (req, res) => {
  try {
   
    const totalFlights = await Flight.countDocuments();

    
    const totalBookings = await Booking.countDocuments();

   
    const revenueResult = await Booking.aggregate([
      { $group: { _id: null, totalRevenue: { $sum: "$totalPaid" } } }
    ]);
    const totalRevenue = revenueResult[0]?.totalRevenue || 0;

    res.status(200).json({
      totalFlights,
      totalBookings,
      totalRevenue
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ error: "Failed to fetch dashboard stats" });
  }
};
