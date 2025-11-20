import { FaChartLine, FaUniversity, FaPiggyBank } from "react-icons/fa";
import { BsGlobeAmericas } from "react-icons/bs";

function Hero() {
  return (
    <section className="bg-white">
      {/* Hero Image */}
      <div className="w-full h-80 md:h-96 overflow-hidden">
        <img
          src="final coin.jpg"
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Investment Icons Section */}
      <div className=" px-6 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 text-center">
            {/* Icon 1: Growth Chart */}
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#1d6ceb] shadow hover:shadow-md transition">
                <FaChartLine className="text-blue-500 text-2xl" />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2">Growth</p>
            </div>

            {/* Icon 2: Banking */}
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#1d6ceb] shadow hover:shadow-md transition">
                <FaUniversity className="text-blue-500 text-2xl" />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Investment Banking
              </p>
            </div>

            {/* Icon 4: Wealth */}
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#1d6ceb] shadow hover:shadow-md transition">
                <FaPiggyBank className="text-blue-500 text-2xl" />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Wealth Planning
              </p>
            </div>

            {/* Icon 5: Global */}
            <div className="flex flex-col items-center">
              <div className="h-16 w-16 flex items-center justify-center rounded-full bg-[#1d6ceb] shadow hover:shadow-md transition">
                <BsGlobeAmericas className="text-blue-500 text-2xl" />
              </div>
              <p className="text-sm font-medium text-gray-700 mt-2">
                Global Access
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
