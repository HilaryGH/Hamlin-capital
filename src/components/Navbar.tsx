import { useState } from "react";
import { X } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <header className="bg-soft-gold shadow sticky top-0 z-101 transition duration-300 min-h-[80px]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 lg:px-12 py-3">
          {/* Left: Logo & Name */}
          <div className="flex items-center gap-3 w-1/3 z-10">
            <img
              src="Hamlin-capital logo.png"
              alt="HamlinCapital logo"
              className="h-[60px] w-auto object-contain"
            />
            <span className="text-dark text-2xl sm:text-3xl font-bold">
              Hamlin-Capital
            </span>
          </div>

          {/* Center: Nav Links (Desktop) */}
          <nav className="hidden md:flex gap-12 text-dark text-lg font-semibold">
            {["Home", "Services", "Success Stories", "Contact Us"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="relative pb-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[3px] after:bg-[#1F2937] after:transition-all after:duration-300 hover:after:w-full"
                >
                  {item}
                </a>
              )
            )}
          </nav>

          {/* Right: WhatsApp (Desktop) */}
          <div className="hidden md:flex flex-col items-end text-dark">
            <span className="text-sm font-medium leading-none">Call us</span>
            <a
              href="https://wa.me/251911508734"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-green-600"
            >
              <FaWhatsapp className="text-green-600 w-8 h-8 animate-bounce" />
              <span className="text-base font-semibold">+251 911508734</span>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
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
            className="fixed inset-0 bg-soft-gold bg-opacity-30 backdrop-blur-sm z-30 transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          />

          {/* Slide-down Mobile Menu */}
          <nav className="md:hidden fixed top-[80px] left-0 right-0 bottom-0 z-40 golden-bg flex flex-col items-start px-6 py-8 space-y-4 animate-fade-in-down">
            {["Home", "Services", "Success Stories", "Contact Us"].map(
              (text, index) => (
                <a
                  key={text}
                  href={`#${text.toLowerCase()}`}
                  className={`text-lg text-dark border-b border-bg-[#1F2937] pb-2 w-full opacity-0 translate-y-4 animate-slide-in animation-delay-${
                    index * 100
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {text}
                </a>
              )
            )}
          </nav>
        </>
      )}
    </>
  );
}

export default Navbar;
