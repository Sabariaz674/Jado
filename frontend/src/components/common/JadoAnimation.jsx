import React from 'react';

const JadoAnimation = () => {
  const word = 'Jadoo';

  return (
    <div className="absolute top-3 left-4 z-40 sm:left-8 md:left-12">
  <div className="flex space-x-1 text-1xl sm:text-4xl lg:text-4xl font-bold drop-shadow-lg text-[#1e3a8a] leading-tight">
    {word.split('').map((char, i) => (
      <span
        key={i}
        className="inline-block animate-bounce"
        style={{ animationDelay: `${i * 0.1}s` }}
      >
        {char}
      </span>
    ))}
  </div>
</div>
  );
};

export default JadoAnimation;
