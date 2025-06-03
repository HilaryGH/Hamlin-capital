import { Link } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";

function Contact() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-50 via-white to-purple-50 text-center px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-extrabold text-blue-900 mb-4 animate-fade-in">
          Let's Connect!
        </h2>
        <p className="text-lg md:text-xl text-dark mb-8 animate-fade-in delay-150">
          Have a project in mind or just want to say hello? We'd love to hear
          from you.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#1d6ceb] text-white font-semibold rounded-xl shadow-lg hover:bg-[#0c51b0] transition-all duration-300 text-lg"
        >
          <FaPaperPlane className="text-white text-xl" />
          Contact Us
        </Link>
      </div>
    </section>
  );
}

export default Contact;
