const Footer = () => {
  return (
    <>
      {/* Mountain-Shaped Top Edge */}
      {/* Smooth Wave Top Edge */}
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
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-3 gap-8">
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
              Phone: +251 911508734
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
