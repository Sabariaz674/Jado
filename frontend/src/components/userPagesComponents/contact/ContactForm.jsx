import React, { useState } from "react";
import { sendContactEmail } from "../../../api/email"; 

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await sendContactEmail(formData);
      if (res.success) {
        setStatus("✅ Message sent successfully!");
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setStatus("❌ Failed to send message. Try again later.");
      }
    } catch (err) {
      setStatus("⚠️ Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        
        {/* Contact Information */}
        <div className="text-left">
          <h2 className="text-3xl font-semibold mb-4 text-[#1e3a8a]">
            Get in Touch
          </h2>
          <p className="mb-6 text-gray-600">
            Have any questions about booking flights or want quick support? 
            Feel free to reach out to us.
          </p>
          
          <div className="space-y-4">
            <p className="text-lg">
              📧 <span className="font-semibold">Email:</span>{" "}
              <a 
                href="mailto:sabariaz593@gmail.com" 
                className="text-[#1e3a8a] hover:underline"
              >
                sabariaz593@gmail.com
              </a>
            </p>
            <p className="text-lg">
              📍 <span className="font-semibold">Address:</span> Lahore, Pakistan
            </p>

          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Let's Start a Conversation
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 border border-[#1e3a8a] rounded-md w-full"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="mt-2 p-3 border border-[#1e3a8a] rounded-md w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 p-3 border border-[#1e3a8a] rounded-md w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Message
              </label>
              <textarea
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
              disabled={loading}
              className="w-full py-3 bg-[#1e3a8a] text-white font-semibold rounded-md hover:bg-[#162d63] transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {status && (
            <p className="mt-4 text-sm font-medium text-gray-700">{status}</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
