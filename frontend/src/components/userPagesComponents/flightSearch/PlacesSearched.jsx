import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { moresearch } from '../../../data'; // Import the correct data
import Card from '../../common/cards/HotelCard'; // Import the Card component

const PlacesSearched = () => {
  return (
    <section className="px-6 md:px-20 py-12 pt-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          People in <span className="text-[#3B82F6]">China</span> also searched for
        </h2>
        <Link to="/searchchinaPlaces" className="text-sm text-blue-600 font-medium flex items-center gap-1">
          View All <span className="text-lg">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {moresearch.map((place, index) => (
          <Card
            key={index}
            image={place.image}
            title={place.title}
            description={place.description}
            link={place.link} // assuming moresearch data contains a 'link' property
          />
        ))}
      </div>
    </section>
  );
};

export default PlacesSearched;
