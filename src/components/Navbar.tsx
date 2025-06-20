import { useState } from "react";
import { X } from "lucide-react";

import {
  FaFacebook,
  FaLinkedin,
  FaLock,
  FaInstagram,
  FaTiktok,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type NavbarProps = {
  onLoginClick?: () => void;
};

function Navbar({ onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      navigate("/login");
    }
  };
  const navLinks = [
    {
      label: "Listings",
      id: "listings",
      dropdown: [
        {
          label: "Debt Deals",
          action: () => navigate("/listings/debt-deals/form"),
        },
        {
          label: "Venture Capital",
          action: () => navigate("/listings/venture-capital/form"),
        },
        {
          label: "Private Equity",
          action: () => navigate("/listings/private-equity/form"),
        },
        {
          label: "Business for Sale",
          action: () => navigate("/listings/business-for-sale/form"),
        },
        {
          label: "Real Estate",
          action: () => navigate("/listings/real-estate/form"),
        },
      ],
    },
    { label: "Who We Are", id: "about/values" },
    { label: "What We Do", id: "service" },
    { label: "Research", id: "research" },
    { label: "Contact Us", id: "contact" },
  ];

  return (
    <>
      {/* Top Info Bar */}
      <div className="hidden md:flex justify-between items-center bg-white text-gray-800 text-sm px-6 lg:px-12 py-2 font-inter">
        <div className="flex gap-6 items-center">
          <span className="flex items-center gap-1">
            <MdLocationOn className="text-[#1d6ceb]" /> Addis Ababa, Ethiopia
          </span>
          <span className="flex items-center gap-1">
            <MdPhone className="text-[#1d6ceb]" /> +251 911508734
          </span>
          <span className="flex items-center gap-1">
            <MdEmail className="text-[#1d6ceb]" /> g.fikre2@gmail.com
          </span>
          <span className="flex items-center gap-1">
            🕒 Mon–Sat: 8:30 AM – 11:30 PM
          </span>
        </div>
        <div className="flex gap-4 items-center text-[#1d6ceb]">
          <a href="#">
            <FaFacebook size={16} />
          </a>
          <a href="#">
            <FaLinkedin size={16} />
          </a>
          <a href="#">
            <FaInstagram size={16} />
          </a>
          <a href="#">
            <FaTiktok size={16} />
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="bg-soft-gold shadow-md sticky top-0 z-50 py-4 px-5 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 z-10 cursor-pointer"
          >
            <img
              src="Captial logo.PNG"
              alt="Logo"
              className="h-12 md:h-14 object-contain"
            />
            <span className="text-dark font-poppins italic text-[14px] md:text-[20px] font-semibold tracking-wide">
              Investment Banking
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-gray-800 font-inter text-sm lg:text-[16px]">
            {navLinks.map(({ label, id, dropdown }) =>
              dropdown ? (
                <div
                  key={id}
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button className="flex items-center gap-1 font-medium">
                    {label} <IoIosArrowDown className="text-sm" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-full mt-2 left-0 w-56 bg-soft-gold shadow-lg rounded-md z-50 border">
                      {dropdown.map(({ label, action }) => (
                        <button
                          key={label}
                          onClick={() => {
                            action();
                            setDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={id}
                  href={`#${id}`}
                  className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[2px] after:bg-gray-800 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {label}
                </a>
              )
            )}
          </nav>

          {/* Desktop Login */}
          <button
            onClick={handleLoginClick}
            className="hidden md:flex bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition gap-2 items-center text-sm"
          >
            <FaLock size={14} /> Login
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-20 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-800" />
            ) : (
              <div className="flex flex-col gap-1.5">
                <span className="block w-6 h-0.5 bg-gray-800 rounded" />
                <span className="block w-4 h-0.5 bg-gray-800 rounded ml-auto" />
                <span className="block w-6 h-0.5 bg-gray-800 rounded" />
              </div>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      <div
        className={`fixed md:hidden inset-0 bg-black bg-opacity-40 z-40 transition-all duration-300 ${
          menuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
        style={{ transitionTimingFunction: "ease-in-out" }}
      >
        <div className="bg-soft-gold w-full h-full pt-20 px-6 overflow-y-auto transition-transform duration-300">
          <nav className="flex flex-col space-y-4 font-inter">
            {navLinks.map(({ label, id, dropdown }) =>
              dropdown ? (
                <div key={id} className="border-b border-gray-200 pb-2">
                  <button
                    className="flex items-center justify-between w-full text-lg font-medium py-2"
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  >
                    {label}
                    <IoIosArrowDown
                      className={`transition-transform duration-200 ${
                        mobileDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileDropdownOpen && (
                    <div className="ml-3 space-y-2 mt-2">
                      {dropdown.map(({ label, action }) => (
                        <button
                          key={label}
                          onClick={() => {
                            action();
                            setMenuOpen(false);
                          }}
                          className="block text-left text-base text-gray-700 py-1.5 flex items-center"
                        >
                          <IoIosArrowForward className="mr-2 text-sm" />
                          {label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium py-2 border-b border-gray-200"
                >
                  {label}
                </a>
              )
            )}

            {/* Social Icons */}
            <div className="flex justify-center gap-4 mt-6 text-[#1d6ceb]">
              <a href="#">
                <FaFacebook size={18} />
              </a>
              <a href="#">
                <FaLinkedin size={18} />
              </a>
              <a href="#">
                <FaInstagram size={18} />
              </a>
              <a href="#">
                <FaTiktok size={18} />
              </a>
            </div>

            {/* Login Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLoginClick();
                }}
                className="bg-blue-600 text-white text-base px-6 py-2 rounded-md hover:bg-blue-700 transition font-medium flex items-center gap-2"
              >
                <FaLock size={16} /> Login
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
