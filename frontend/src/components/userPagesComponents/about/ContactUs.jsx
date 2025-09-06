import React from 'react';
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
    const navigate = useNavigate();

    return (
        <section className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-6 text-center">
                {/* Horizontal Line with Text */}
                <div className="flex items-center mb-8">
                    <span className="mx-4 text-[#1e3a8a] font-bold text-lg sm:text-xl md:text-2xl">Contact Us</span>
                    <div className="flex-grow border-t border-[#1e3a8a]"></div>
                </div>

                {/* Text Content Layout: 3 lines on each side */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-8">
                    {/* Left Side Text */}
                    <div className="flex-1">
                        <p className="text-lg text-gray-600 mb-6">
                            We are a leading flight booking platform, dedicated to providing you with the best flight deals and unforgettable travel experiences.
                        </p>
                        <p className="text-lg text-gray-600 mb-6">
                            With a wide range of destinations, we ensure that your journey is smooth and hassle-free, from booking to landing.
                        </p>
                        <p className="text-lg text-gray-600 mb-6">
                            Our mission is to make air travel accessible, affordable, and easy for everyone. Whether you're booking a business trip or planning your dream vacation, we offer personalized services and flexible options to suit your needs.
                        </p>
                    </div>

                    {/* Right Side Text */}
                    <div className="flex-1">
                        <p className="text-lg text-gray-600 mb-6">
                            We partner with the most trusted airlines and provide real-time updates to ensure you get the best service.
                        </p>
                        <p className="text-lg text-gray-600 mb-6">
                            At our company, your satisfaction is our top priority. We strive to offer the most seamless experience, backed by exceptional customer service and reliable support.
                        </p>
                        <p className="text-lg text-gray-600 mb-6">
                            Your journey with us is more than just a flight—it's an experience that we promise will be comfortable and memorable.
                        </p>
                    </div>
                </div>

                {/* Button */}
                <button
                    className="bg-[#1e3a8a] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#1e3a8a] transition mt-6"
                    onClick={() => navigate("/contact")}
                >
                    Contact Us
                </button>
            </div>
        </section>
    );
};

export default ContactUs;
