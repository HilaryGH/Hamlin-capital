import { Link } from "react-router-dom";
import { TrendingUp, FileText } from "lucide-react";

const ServicesPage: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          Dive into Our Research
        </h2>
        <p className="text-gray-700 mb-10">
          Discover deep insights and detailed analysis on markets, sectors, and
          investment strategies.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Research & Analysis Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-[0_8px_24px_#c5fa4d66] transition duration-300">
            <div className="flex items-center justify-center mb-4 text-blue-500">
              <TrendingUp className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900">
              Research & Analysis
            </h3>
            <p className="text-gray-600 mb-4">
              Fundamental research on sectors, companies, and economic trends to
              guide investments.
            </p>
            <Link
              to="/research"
              className="text-blue-900 hover:text-blue-700 font-medium inline-flex items-center"
            >
              Learn More
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* Research Publications Card */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-[0_8px_24px_#c5fa4d66] transition duration-300">
            <div className="flex items-center justify-center mb-4 text-blue-500">
              <FileText className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-blue-900">
              Research Publications
            </h3>
            <p className="text-gray-600 mb-4">
              Access our curated reports including market pulses, sector
              reviews, and investment strategies.
            </p>
            <Link
              to="/research"
              className="text-blue-900 hover:text-blue-700 font-medium inline-flex items-center"
            >
              View Reports
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
