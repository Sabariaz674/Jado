import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Handle form submission logic
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-semibold mb-4">Let's Start a Conversation</h2>
        <p className="mb-8 text-gray-600">Ask how we can help you:</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="first-name" className="block text-sm font-semibold text-gray-700">First Name</label>
              <input
                type="text"
                id="first-name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="mt-2 p-3 border border-[#1e3a8a] rounded-md w-full"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="last-name" className="block text-sm font-semibold text-gray-700">Last Name</label>
              <input
                type="text"
                id="last-name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="mt-2 p-3 border border-[#1e3a8a] rounded-md w-full"
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-[#1e3a8a] rounded-md w-full"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-gray-700">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-[#1e3a8a] rounded-md w-full"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#1e3a8a] text-white font-semibold rounded-md hover:bg-[#1e3a8a] transition-colors duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
