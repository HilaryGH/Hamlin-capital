function Contact() {
  return (
    <section className="py-16 px-6 bg-gray-50 text-dark">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Info */}
        <div>
          <h2 className="text-3xl font-bold text-[#1d6ceb] mb-4">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            We'd love to hear from you. Reach out to discuss fundraising,
            investment strategies, or to schedule a consultation.
          </p>
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              <strong>Address:</strong> Bole, Addis Ababa, Ethiopia
            </p>
            <p>
              <strong>Phone:</strong> +251 912 345 678
            </p>
            <p>
              <strong>Email:</strong> contact@hamlincapital.com
            </p>
            <p>
              <strong>Hours:</strong> Mon – Fri, 9:00 AM – 6:00 PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-6 rounded-xl shadow-md space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d6ceb]"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d6ceb]"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1d6ceb]"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-[#1d6ceb] text-white px-6 py-2 rounded-full hover:bg-[#4c8ef0] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;
