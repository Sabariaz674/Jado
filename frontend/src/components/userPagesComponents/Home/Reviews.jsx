import React, { useState } from "react";
import { reviews } from "../../../data";

const Reviews = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleReadMore = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const getPreviewText = (fullText) => {
    const maxLength = 110;
    return fullText.length > maxLength ? fullText.slice(0, maxLength) + "..." : fullText;
  };

  return (
    <section className="px-4 sm:px-6 md:px-20 py-12 ">
      <h2 className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-12">
        What <span className="text-indigo-600">Jadoo</span> users are saying
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center lg:ml-70">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md p-6 w-full max-w-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-sm font-semibold">{review.name}</h3>
                  <p className="text-xs text-gray-500">
                    {review.location} | {review.date}
                  </p>
                </div>
              </div>

              {/* Rating stars */}
              <div className="text-yellow-500 mb-2 text-sm">
                {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
              </div>

              {/* Review text */}
              <p className="text-sm text-gray-700 leading-relaxed">
                {expandedIndex === index ? review.text : getPreviewText(review.text)}{" "}
                {review.text.length > 110 && (
                  <button
                    onClick={() => toggleReadMore(index)}
                    className="text-indigo-600 hover:underline text-xs ml-1"
                  >
                    {expandedIndex === index ? "show less" : "read more"}
                  </button>
                )}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
