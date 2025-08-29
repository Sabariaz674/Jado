import React from "react";
import about from "../../../assets/about.png";

const Hero = () => {
  return (
    <section className="relative w-full">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={about}
          alt="Airport traveler"
          className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] object-cover object-right"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] text-left">
          <div className="max-w-xl sm:max-w-md">
            <p className="mb-3 text-sm sm:text-lg font-semibold tracking-widest text-yellow-400">
              EXPLORE YOUR TRAVEL
            </p>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white">
              TRAVELLING AROUND{"\n"}THE WORLD
            </h1>

            <p className="mt-4 text-xs sm:text-sm md:text-base text-white">
              There are many variations of passages available but the majority
              have suffered alteration in some form by injected humour or
              randomised words.
            </p>

            {/* Buttons */}
           
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
