import React, { useState } from 'react';
import worldMap from '../../assets/flightmap2.png'; // Import your image here

const  PopularDestinations = () => {
    const [timePeriod, setTimePeriod] = useState('week'); // Default to "This Week"

    const handleTimePeriodChange = (value) => {
        setTimePeriod(value);
    };

    return (
        <div className="max-w-full mx-auto p-4 sm:p-6 lg:p-8">
            {/* Header section with top-right aligned button */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4 sm:mb-0">Popular Destination</h2>
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

            {/* Image section */}
            <div className="relative w-full h-auto rounded-lg mb-6 flex items-center justify-center">
                <img
                    src={worldMap}
                    alt="World Map"
                    className="w-full h-auto rounded-lg"
                />
            </div>

            {/* Destination list with responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Sharja</span>
                        <span className="font-semibold text-gray-900">24%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#1e3a8a] h-2.5 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                </div>

                {/* Canada */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Canada</span>
                        <span className="font-semibold text-gray-900">18%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#1e3a8a] h-2.5 rounded-full" style={{ width: '18%' }}></div>
                    </div>
                </div>

                {/* United Kingdom */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Uk</span>
                        <span className="font-semibold text-gray-900">16%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#1e3a8a] h-2.5 rounded-full" style={{ width: '16%' }}></div>
                    </div>
                </div>

                {/* India */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Dubai</span>
                        <span className="font-semibold text-gray-900">12%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#1e3a8a] h-2.5 rounded-full" style={{ width: '12%' }}></div>
                    </div>
                </div>

                {/* France */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Abu Dabi</span>
                        <span className="font-semibold text-gray-900">9%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '9%' }}></div>
                    </div>
                </div>

                {/* Australia */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-700">Birmingham</span>
                        <span className="font-semibold text-gray-900">7%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: '7%' }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularDestinations;