function Contact() {
  return (
    <>
      <section className="bg-white text-gray-900 py-12" id="contact">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1d6ceb]">
              Get in Touch
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Whether you're seeking funding, strategic partnerships, or expert
              advice, we're here to help you connect capital to opportunity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Contact Information
              </h3>
              <p className="text-sm sm:text-base text-gray-700">
                <strong>Address:</strong> Addis Ababa, Ethiopia
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                <strong>Phone:</strong> +251 912 345 678
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                <strong>Email:</strong> info@hamlincapital.com
              </p>

              <div className="mt-6">
                <h4 className="text-sm font-semibold text-gray-800 mb-2">
                  Follow Us
                </h4>
                <div className="flex gap-4 text-2xl text-[#1d6ceb]">
                  <a href="#" className="hover:text-gray-700">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="#" className="hover:text-gray-700">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form (Optional) */}
            <div>
              <form className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">
                  Send Us a Message
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    placeholder="Your message..."
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-[#ADF802] hover:bg-[#c0f932] text-gray-900 font-semibold px-4 py-2 rounded transition"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;
