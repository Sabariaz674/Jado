import React from 'react';
import { deals } from '../../../data';
import Card from '../../common/cards/CountryCard';
import { useNavigate } from 'react-router-dom';

const CountryFlight = () => {
  const navigate = useNavigate();

  const handleCardClick = (country) => {

    navigate('/flight-search', { state: { country } });
  };

  return (
    <section className="px-6 md:px-20 py-12 pt-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          Explore famous places in your favorite <span className="text-[#1e3a8a]">Countries</span>
        </h2>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {deals.map((deal, index) => (
          <div key={index} onClick={() => handleCardClick(deal.title)} className="cursor-pointer">
            <Card
              image={deal.image}
              title={deal.title}
              description={deal.subtitle}
              price={deal.price}
              location={deal.location}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CountryFlight;
