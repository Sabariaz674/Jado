import React from 'react';

const Card = ({ image, title, description, link }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
      <img
        src={image}
        alt={title}
        className="w-full h-52 object-cover"
      />
      <div className="p-4">
        <h3 className="text-base font-semibold text-[#3B82F6] mb-1">
          {title}
        </h3>
        <p className="text-sm text-gray-600">{description}</p>
        {link && (
          <a href={link} className="text-sm text-blue-600 mt-2 inline-block">
            Read More
          </a>
        )}
      </div>
    </div>
  );
};

export default Card;
