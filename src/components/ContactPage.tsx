import { useState } from "react";
import axios from "axios";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message. Try again.");
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center min-h-[400px] flex items-center justify-center px-6 py-12"
        style={{ backgroundImage: "url('phone.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white hero-text">
          <h1
            className="text-4xl md:text-5xl font-bold fade-in-up delay-1"
            data-aos="slide-up"
            data-aos-duration="800"
          >
            Contact Us
          </h1>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-white text-gray-900 py-16" id="contact">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Contact Info + Socials */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-2">
                Our Office
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                <strong>Address:</strong> Addis Ababa, Ethiopia
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                <strong>Phone:</strong> +251 911508734
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                <strong>Email:</strong> info@hamlincapital.com
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-blue-800 mb-2">
                Follow Us
              </h4>
              <div className="flex gap-4 text-2xl text-[#1d6ceb]">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaXTwitter />
                </a>
                <a
                  href="https://www.whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-2xl font-semibold text-blue-800">
              For Enquiries
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="mt-1 w-full border-b border-gray-300 focus:border-[#1d6ceb] outline-none py-2 bg-transparent"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="mt-1 w-full border-b border-gray-300 focus:border-[#1d6ceb] outline-none py-2 bg-transparent"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message..."
                  className="mt-1 w-full border-b border-gray-300 focus:border-[#1d6ceb] outline-none py-2 bg-transparent resize-none"
                  rows={4}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-btn hover:bg-[#c0f932] text-white font-semibold px-6 py-2 rounded transition"
              >
                Submit
              </button>
              {status && <p className="text-sm mt-2">{status}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <div
        style={{
          width: "100%",
          height: "450px",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.9081049472766!2d38.757760499999996!3d8.9806034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b855c3a2d7eaf%3A0xf78295a678e20c53!2sWolelay%20Management%20Consultancy!5e0!3m2!1sen!2set!4v1748893396165!5m2!1sen!2set"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Wolelay Management Consultancy"
        ></iframe>
      </div>
    </>
  );
}

export default ContactPage;
