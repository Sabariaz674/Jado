import React from 'react';
import FlightSummary from '../../components/userPagesComponents/flightSearch/FlightSummary';
import BaggageInfoImage from '../../assets/BaggageInfoImage.png';
import PassengerForm from '../../components/userPagesComponents/passengerLnfo/PassengerForm';
// Ab SelectSeat ko yahan import karne ki zaroorat nahi hai
// import SelectSeat from './SeatSelection';

const PassengerInfo = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-10 flex flex-col lg:flex-row items-start justify-center gap-8">
      {/* Ab conditional rendering ki zaroorat nahi hai */}
      <>
        {/* Passenger Form Section */}
        <PassengerForm />

        {/* Right Side Summary Section */}
        <div className="w-full lg:w-96 flex flex-col gap-8">
          <FlightSummary />

          {/* Select Seats Button ko yahan se hata do, ye PassengerForm mein chala gaya hai */}
          
          {/* Baggage Info */}
          <div className="bg-white rounded-xl shadow-lg p-6 flex justify-center items-center">
            <img src={BaggageInfoImage} alt="Baggage Information" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </>
    </div>
  );
};

export default PassengerInfo;