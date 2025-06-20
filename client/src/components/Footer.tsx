import { useEffect, useState } from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [isMediumUp, setIsMediumUp] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleMediaQueryChange = () => {
      setIsMediumUp(mediaQuery.matches);
      if (mediaQuery.matches) {
        setShowLinks(true); // Always show links on medium and up
      } else {
        setShowLinks(false); // Hide links by default on small screens
      }
    };

    handleMediaQueryChange(); // Initial check
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <>
      {/* Wave Top Edge */}
      <div className="w-full overflow-hidden -mb-1 relative z-10">
        <svg
          className="w-full h-20"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fill="#C5FA4D"
            d="M0,224L48,213.3C96,203,192,181,288,160C384,139,480,117,576,106.7C672,96,768,96,864,106.7C960,117,1056,139,1152,149.3C1248,160,1344,160,1392,160L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* Footer Body */}
      <footer className="bg-soft-gold text-gray-900 relative z-0">
        <div className="max-w-6xl mx-auto px-4 py-10">
          {/* Logo & Social Icons */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
            <div className="flex items-center mb-4 lg:mb-0">
              <img
                src="Captial_logo.png"
                alt="Hamlin Capital Logo"
                className="h-12 mr-3"
              />
              <span className="text-xl font-bold">Hamlin Capital</span>
            </div>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:bg-[#1877F2] group"
                aria-label="Facebook"
              >
                <FaFacebookF className="text-[#1877F2] group-hover:text-white transition-colors text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:bg-[#0A66C2] group"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn className="text-[#0A66C2] group-hover:text-white transition-colors text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:bg-gradient-to-r hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] group"
                aria-label="Instagram"
              >
                <FaInstagram className="text-[#E1306C] group-hover:text-white transition-colors text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:bg-black group"
                aria-label="Twitter/X"
              >
                <FaXTwitter className="text-gray-800 group-hover:text-white transition-colors text-lg" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:bg-black group"
                aria-label="TikTok"
              >
                <FaTiktok className="text-gray-800 group-hover:text-white transition-colors text-lg" />
              </a>
            </div>
          </div>

          {/* Discover More Button for Small Screens */}
          {!isMediumUp && (
            <div className="text-center mb-6">
              <button
                onClick={() => setShowLinks((prev) => !prev)}
                className="bg-[#C5FA4D] text-gray-900 px-4 py-2 rounded font-semibold shadow hover:shadow-md transition"
              >
                {showLinks ? "Hide" : "Discover More"}
              </button>
            </div>
          )}

          {/* Conditional Link Sections */}
          {showLinks && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link to="/" className="text-dark hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/about/values"
                      className="text-dark hover:underline"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/service" className="text-dark hover:underline">
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-dark hover:underline">
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="/faq" className="hover:underline">
                      FAQ
                    </a>
                  </li>
                  <li>
                    <Link to="/help" className="text-dark hover:underline">
                      User Guide
                    </Link>
                  </li>
                  <li>
                    <a href="/blog" className="hover:underline">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="/research" className="hover:underline">
                      Research
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold mb-4">Contact</h4>
                <address className="not-italic text-sm space-y-2">
                  <p>Addis Ababa, Ethiopia</p>
                  <p>Phone: +251 911508734</p>
                  <p>Email: info@hamlincapital.com</p>
                  <p>Mon-Fri: 9:00 AM - 5:00 PM</p>
                </address>
              </div>
            </div>
          )}

          {/* Copyright */}
          <div className="border-t border-gray-300 mt-8 pt-6 text-center text-sm text-gray-700">
            © {new Date().getFullYear()} Hamlin Capital. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
