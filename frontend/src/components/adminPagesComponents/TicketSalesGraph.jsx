import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import PopularDestination from './PopularDestination';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TicketSalesGard = () => {
  const [timePeriod, setTimePeriod] = useState('week');

  const weeklyData = [1200, 1800, 2200, 3200, 1500, 2100, 1900];
  const monthlyData = [8000, 10000, 12000, 15000, 11000, 14000, 13000];
  const yearlyData = [50000, 60000, 70000, 80000, 75000, 70000, 65000];

  const handleTimePeriodChange = (period) => {
    setTimePeriod(period);
  };

  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Tickets Sold',
        data:
          timePeriod === 'week'
            ? weeklyData
            : timePeriod === 'month'
            ? monthlyData
            : yearlyData,
        backgroundColor: '#1e3a8a',
        borderRadius: 6,
        borderSkipped: false
      },
      {
        label: 'Other Sales',
        data:
          timePeriod === 'week'
            ? [1000, 1500, 1900, 2500, 1400, 1900, 1600]
            : timePeriod === 'month'
            ? [5000, 7000, 8000, 10000, 6500, 9000, 8500]
            : [30000, 35000, 40000, 45000, 42000, 39000, 38000],
        backgroundColor: '#D1D5DB',
        borderRadius: 6,
        borderSkipped: false
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1000
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 max-w-283 mx-auto flex flex-col lg:flex-row gap-6">
      
      {/* Left Section (Chart) */}
      <div className="w-full lg:w-1/2 flex flex-col lg:mt-7">
        {/* Header with Title and Dropdown */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-700">
              Ticket Sales
            </h2>
            <p className="text-lg sm:text-xl font-bold text-gray-900">12,500 Tickets Sold</p>
          </div>
          <div className="mt-2 sm:mt-0 flex-shrink-0">
            <select
              className="bg-[#1e3a8a] text-white px-4 py-2 rounded-md text-sm"
              value={timePeriod}
              onChange={(e) => handleTimePeriodChange(e.target.value)}
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>

        {/* Chart */}
        <div className="w-full h-64 sm:h-80 lg:h-96 mt-7">
          <Bar data={data} options={options} />
        </div>
      </div>

      {/* Right Section (Popular Destinations) */}
      <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
        <PopularDestination />
      </div>
      
    </div>
  );
};

export default TicketSalesGard;