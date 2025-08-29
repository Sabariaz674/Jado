import React from 'react';
import FlightSummary from '../../components/userPagesComponents/flightSearch/FlightSummary';
import BaggageInfoImage from '../../assets/BaggageInfoImage.png';
import PassengerForm from '../../components/userPagesComponents/passengerLnfo/PassengerForm';


const PassengerInfo = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-10 flex flex-col lg:flex-row items-start justify-center gap-8">
      <>
        <PassengerForm />
        <div className="w-full lg:w-96 flex flex-col gap-8">
          <FlightSummary />
          <div className=" rounded-xl p-6 flex justify-center items-center">
            <img src={BaggageInfoImage} alt="Baggage Information" className="w-full h-auto rounded-lg" />
          </div>
        </div>
      </>
    </div>
  );
};

export default PassengerInfo;