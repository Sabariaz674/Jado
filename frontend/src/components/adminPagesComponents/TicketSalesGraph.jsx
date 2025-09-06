import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getTicketSalesStats } from "../../api/ticketgraph"; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TicketSalesGard = () => {
  const [timePeriod, setTimePeriod] = useState("week"); // default: week
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch data using helper
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getTicketSalesStats(timePeriod);
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch sales stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [timePeriod]);

  const data = {
    labels: stats.map((s) => s._id),
    datasets: [
      {
        label: "Tickets Sold",
        data: stats.map((s) => s.totalBookings),
        backgroundColor: "#1e3a8a",
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 max-w-283 mx-auto flex flex-col lg:flex-row gap-6">
      {/* Left Section (Chart) */}
      <div className="w-full lg:w-full flex flex-col lg:mt-7">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Ticket Sales
            </h2>
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              {loading
                ? "Loading..."
                : `${stats.reduce((sum, s) => sum + s.totalBookings, 0)} Tickets Sold`}
            </p>
          </div>
          <div className="mt-2 sm:mt-0 flex-shrink-0">
            <select
              className="bg-[#1e3a8a] text-white px-4 py-2 rounded-md text-sm"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            >
              <option value="day">This Day</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        <div className="w-full h-64 sm:h-80 lg:h-96 mt-7">
          {loading ? (
            <p className="text-center text-gray-500">Loading chart...</p>
          ) : (
            <Bar data={data} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketSalesGard;
