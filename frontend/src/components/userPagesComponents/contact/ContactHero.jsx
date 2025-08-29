import React from 'react';
import heroImage from '../../../assets/contact.png'; // Replace with your image path

const ContactHero = () => {
  return (
    <section 
      className="relative bg-cover bg-center text-white py-60" 
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark overlay */}
      
    </section>
  );
};

export default ContactHero;
