import React, { useState } from 'react';

// Jadoo se mutalliq FAQ data
import { jadooFaqData } from '../../../data';

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  // Data ko do columns mein split karein
  const halfwayIndex = Math.ceil(jadooFaqData.length / 2);
  const leftColumnData = jadooFaqData.slice(0, halfwayIndex);
  const rightColumnData = jadooFaqData.slice(halfwayIndex);

  const Accordion = ({ title, content, index }) => {
    const isOpen = index === openIndex;

    const toggleAccordion = () => {
      setOpenIndex(isOpen ? null : index);
    };

    return (
      <div className="border-b border-gray-200">
        <button
          className="flex justify-between items-center w-full py-4 text-left font-medium text-gray-800 hover:text-blue-500 transition-colors duration-200"
          onClick={toggleAccordion}
          aria-expanded={isOpen}
        >
          <span>{title}</span>
          <svg
            className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div
          className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
            isOpen ? 'max-h-40' : 'max-h-0'
          }`}
        >
          <p className="py-2 text-gray-600">{content}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-8">Booking flights with Jadoo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {/* Left Column */}
          <div>
            {leftColumnData.map((faq, index) => (
              <Accordion
                key={index}
                title={faq.title}
                content={faq.content}
                index={index}
                // ✅ openIndex aur setOpenIndex props ko yahan pass karein
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}
          </div>
          {/* Right Column */}
          <div>
            {rightColumnData.map((faq, index) => (
              <Accordion
                key={index + leftColumnData.length}
                title={faq.title}
                content={faq.content}
                index={index + leftColumnData.length}
                // ✅ openIndex aur setOpenIndex props ko yahan bhi pass karein
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;