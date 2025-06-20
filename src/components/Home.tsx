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
      <section className="bg-white text-dark py-12 px-4 sm:px-6 lg:px-16">
        <div className="flex flex-col-reverse sm:flex-row-reverse items-center gap-10">
          {/* Right Image */}
          <div className="w-full sm:w-1/2">
            <img
              src="Revenue-bro.svg"
              alt="hero visual"
              className="w-full h-72 sm:h-80 md:h-96 object-contain"
            />
          </div>

          {/* Left Text Content */}
          <div className="w-full sm:w-1/2 flex flex-col justify-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 ">
              Connecting Capital to Opportunity
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 ">
              Empowering growth through strategic investment solutions.
            </p>
            <div className=" pt-3">
              <Link
                to="/service"
                className="bg-btn text-white text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-[#15803D] transition inline-block text-center"
              >
                Unlock Your Financial Potential
              </Link>
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
