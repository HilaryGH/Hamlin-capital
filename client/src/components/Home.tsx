import { Link } from "react-router-dom";
import MembershipPreview from "./MembershipPreview";
import CareersPreview from "./CareersPreview";
import Community from "./Community";
import HamlinServices from "./HamlinServices";
import About from "./About";
import Hero from "./Hero";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section 
        className="relative min-h-[500px] md:min-h-[600px] bg-cover bg-center bg-no-repeat py-12 px-4 sm:px-6 lg:px-16 overflow-hidden"
        style={{ backgroundImage: "url('Investment.jpg')" }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        
        {/* Blue gradient overlay on the right side */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-[#1d6ceb]/60"></div>
        
        {/* Subtle pattern overlay for professional look */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(29, 108, 235, 0.1) 10px, rgba(29, 108, 235, 0.1) 20px)`
          }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center">
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg">
              Connecting Capital to Opportunity
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-8 drop-shadow-md">
              Empowering growth through strategic investment solutions.
            </p>
            <div className="pt-3">
              <Link
                to="/service"
                className="bg-btn text-white text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-[#15803D] transition inline-block text-center font-semibold shadow-lg hover:shadow-xl"
              >
                Unlock Your Financial Potential
              </Link>
            </div>
          </div>
          
          {/* Right side decorative element with blue effect */}
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/2">
            <div className="h-full w-full bg-gradient-to-l from-[#1d6ceb]/40 via-[#1d6ceb]/20 to-transparent relative">
              {/* Geometric shapes for professional look */}
              <div className="absolute top-20 right-20 w-32 h-32 border-4 border-white/20 rounded-lg rotate-12"></div>
              <div className="absolute bottom-32 right-32 w-24 h-24 border-4 border-white/15 rounded-full"></div>
              <div className="absolute top-1/2 right-16 w-16 h-16 bg-white/10 rounded-lg rotate-45"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Previews Section */}
      <section className="bg-gray-50 py-10 px-4 sm:px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Community />
          <MembershipPreview />
          <CareersPreview />
        </div>
      </section>
      <section>
        <HamlinServices />
      </section>
      <section>
        <About />
      </section>
      <section>
        <Hero />
      </section>
    </>
  );
}
