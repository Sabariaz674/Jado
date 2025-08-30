import React from 'react';
import { deals } from '../../../data';  // Assuming deals data is coming from here
import Card from '../../common/cards/CountryCard';  // Import the reusable Card component

const CountryFlight = () => {
  return (
    <section className="px-6 md:px-20 py-12 pt-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          Find your next adventure with these Countries <span className="text-[#1e3a8a]">Flights</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal, index) => (
          <Card
            key={index}
            image={deal.image}
            title={deal.title}
            description={deal.subtitle}
            price={deal.price}
            location={deal.location}
          />
        ))}
      </div>
    </section>
  );
};

export default CountryFlight;
