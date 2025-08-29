import React from 'react';
import { motion } from 'framer-motion';
import Graph from '../../assets/Graph.png';
import SearchBox from "../../components/common/SearchBox";
import CountryFlight from '../../components/userPagesComponents/home/CountryFlight';
import Destinations from '../../components/userPagesComponents/home/Destination';
import { headingWords } from '../../data'
import FAQSection from '../../components/userPagesComponents/home/FAQSection';

const Home = () => {


  return (
    <>
      <div
        className="w-full overflow-hidden bg-no-repeat bg-cover bg-center pt-40 pb-12  flex flex-col items-center justify-start px-4 mb-8"
        style={{
          backgroundImage: `url(${Graph})`,
          backgroundColor: "#f4f4f4"
        }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-[#1e3a8a] from-indigo-500 to-purple-600 mb-8 flex flex-wrap justify-center gap-2 pb-4">
          <span>{headingWords[0]}</span>

          {headingWords.slice(1).map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.3,
                duration: 0.5,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: headingWords.length * 0.3,
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <SearchBox />


      </div>

      <CountryFlight />
      <Destinations />
      <FAQSection />

    </>
  );
};

export default Home;
