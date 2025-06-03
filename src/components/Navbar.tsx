import { useState } from "react";
import { X } from "lucide-react";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "Who We Are", id: "about/values" },
    { label: "What We Do", id: "service" },
    { label: "Research", id: "research" },
    { label: "Success Stories", id: "success" },
    { label: "Contact Us", id: "contact" },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:flex justify-between items-center bg-btn text-white text-sm px-10 py-2">
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1">
            <MdLocationOn /> Addis Ababa, Ethiopia
          </span>
          <span className="flex items-center gap-1">
            <MdPhone /> +251 911508734
          </span>
          <span className="flex items-center gap-1">
            <MdEmail /> g.fikre2@gmail.com
          </span>
          <span className="flex items-center gap-1">
            <span role="img" aria-label="clock">
              🕒
            </span>
            Mon–Sat: 8:30 AM – 11:30 PM
          </span>
        </div>
        <div className="flex gap-4 items-center">
          <a href="#" className="hover:text-blue-400">
            <FaFacebook size={18} />
          </a>
          <a href="#" className="hover:text-blue-400">
            <FaLinkedin size={18} />
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-soft-gold shadow sticky top-0 z-50 transition duration-300 min-h-[72px]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-8 py-2">
          {/* Logo */}
          <div className="flex gap-1  z-10 items-center">
            <img
              src="Captial_logo.png"
              alt="HamlinCapital logo"
              className="h-[50px] w-auto object-contain"
            />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex gap-16 text-dark text-lg font-semibold relative">
            {navLinks.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#1F2937] after:transition-all after:duration-300 hover:after:w-full"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right Button */}
          <div className="hidden md:flex">
            <a
              href="#contact"
              className="mt-4 bg-btn text-white px-2 py-2 rounded-md w-full text-center hover:bg-yellow-400 transition flex items-center justify-center gap-1"
              onClick={() => setMenuOpen(false)}
            >
              How Can We Help You <FaArrowRight />
            </a>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden z-10">
            {menuOpen ? (
              <X
                className="w-7 h-7 text-dark cursor-pointer"
                onClick={() => setMenuOpen(false)}
              />
            ) : (
              <div
                className="flex flex-col gap-[4px] cursor-pointer"
                onClick={() => setMenuOpen(true)}
              >
                <span className="block w-7 h-0.5 bg-[#1F2937] rounded"></span>
                <span className="block w-5 h-0.5 bg-[#1F2937] rounded"></span>
                <span className="block w-7 h-0.5 bg-[#1F2937] rounded"></span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-soft-gold bg-opacity-30 backdrop-blur-sm z-30 transition-opacity animate-slide-in animation-delay-${index * 100} duration-300"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-down Menu */}
          <nav className="md:hidden fixed top-[80px] left-0 right-0 bottom-0 z-40 golden-bg flex flex-col items-start px-6 py-8 space-y-6 animate-fade-in-down">
            {navLinks.map(({ label, id }) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-lg text-dark border-b border-gray-300 pb-2 w-full"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="mt-4 bg-btn text-white text-sm px-4 py-2 rounded-md w-full max-w-[300px] text-center hover:bg-yellow-400 transition flex items-center justify-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              How Can We Help You <FaArrowRight />
            </a>
          </nav>
        </>
      )}
    </>
  );
}

export default Navbar;
