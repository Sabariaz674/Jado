import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import signupAnimation from "../../assets/signup-animation.json";

const LeftAnimation = () => {
  return (
    <div className="w-full md:w-1/2 bg-[#1e3a8a] flex items-center justify-center p-4 h-[200px] md:h-auto">
      <Player
        autoplay
        loop
        src={signupAnimation}
        className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 lg:w-72 lg:h-72"
      />
    </div>
  );
};

export default LeftAnimation;
