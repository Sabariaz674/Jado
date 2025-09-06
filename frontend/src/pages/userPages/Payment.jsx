import React from 'react';
import PaymentForm from '../../components/userPagesComponents/payment/PaymentForm';
import FlightSummary from '../../components/userPagesComponents/flightSearch/FlightSummary';

function Payment() {
  
  return (
    
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row gap-8 justify-center">
      {/* Left: Payment Form */}
      <div className="w-full lg:w-2/3">
        <PaymentForm />
      </div>

      
    </div>
  );
}

export default Payment;
