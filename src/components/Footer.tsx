const Footer = () => {
  return (
    <>
      {/* Mountain-Shaped Top Edge */}
      <div className="w-full overflow-hidden -mb-1 relative z-10">
        <svg
          className="w-full h-24"
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="mountainGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#f7e199" />
              <stop offset="100%" stopColor="#e9cf6f" />
            </linearGradient>
          </defs>
          <path
            d="M0,160 L120,80 L240,160 L360,80 L480,160 L600,80 L720,160 L840,80 L960,160 L1080,80 L1200,160 L1320,80 L1440,160 L1440,320 L0,320 Z"
            fill="url(#mountainGradient)"
            stroke="#e5c76a"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Footer Body */}
      <footer className="bg-soft-gold text-gray-900 relative z-0">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li>
                <a href="/" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="hover:underline">
                  Services
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Contact</h4>
            <p className="text-sm">
              Addis Ababa, Ethiopia
              <br />
              Phone: +251 912 345 678
              <br />
              Email: info@hamlincapital.com
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex gap-3 text-xl">
              <a href="#" className="hover:text-[#1d6ceb]">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="hover:text-[#1d6ceb]">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-300 text-center py-4 text-sm text-gray-700">
          © {new Date().getFullYear()} Hamlin Capital. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
