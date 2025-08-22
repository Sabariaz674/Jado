import React from "react";
import { destinations } from '../../../data';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Destination = () => {
  return (
    <section className="px-6 md:px-20 py-12 pt-0">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700">
          Discover <span className="text-[#1e3a8a]">Popular Destinations</span>
        </h2>
      </div>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={false}
        autoplay={{ delay: 3000 }}
        loop
      >
        {destinations.map((place, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img
                src={place.image}
                alt={place.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {place.title}, <span className="text-indigo-600">{place.location}</span>
                  </h3>
                  <p className="text-gray-700 font-semibold">{place.price}</p>
                </div>
                <p className="text-sm text-gray-500 mt-1">{place.subtitle}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Destination;
