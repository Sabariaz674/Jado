import React from "react";
import { useLocation } from "react-router-dom";
import placesData from "../../../data";  

const PlacesSearches = () => {
  const location = useLocation();
  const country = location.state?.country;

  if (!country) {
    return (
      <p className="text-center text-gray-500 py-20">
        No country selected
      </p>
    );
  }

  const countryKey = Object.keys(placesData).find(
    (key) => key.toLowerCase() === country.toLowerCase()
  );

  const place = countryKey ? placesData[countryKey] : null;

  if (!place) {
    return (
      <p className="text-center text-gray-500 py-20">
        No places found for "{country}"
      </p>
    );
  }

  return (
    <section className="px-6 md:px-20 py-12">
      <h2 className="text-2xl font-semibold mb-8 text-gray-800">
        Famous Places in <span className="text-[#1e3a8a]">{countryKey}</span>
      </h2>

      <div className="flex flex-wrap justify-between gap-6">
        {place.images.map((img, index) => (
          <div
            key={index}
            className="flex-1 max-w-[30%] bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              src={img.src}
              alt={`${countryKey}-${img.title}`}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-center text-gray-700 font-medium">{img.title}</h3>
              <p className="text-center text-gray-600 text-sm mt-1">{img.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PlacesSearches;
