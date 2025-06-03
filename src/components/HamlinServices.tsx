import React from "react";
import { Link } from "react-router-dom";
import {
  FaHandHoldingUsd,
  FaHandshake,
  FaChartLine,
  FaSearchDollar,
} from "react-icons/fa";

const HamlinServices: React.FC = () => {
  return (
    <section className="bg-gray-50 py-12 px-4 sm:px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-900 mb-4">
          Our Services
        </h2>
        <p className="text-center text-gray-600 mb-10 sm:mb-12 text-base sm:text-lg">
          Connecting Capital to Opportunity
        </p>

        {/* Service Cards */}
        {[
          {
            title: "Fundraising Solutions",
            description: [
              "Equity Fundraising: Customized strategies to fuel expansion and innovation.",
              "Debt Financing: Access to structured loans and corporate debt instruments.",
              "Investor Positioning: Attract and align with the right investors for your goals.",
            ],
            icon: <FaHandHoldingUsd />,
            link: "/service/fundraising",
          },
          {
            title: "Mergers & Acquisitions",
            description: [
              "Advisory: Buy-side and sell-side deal structuring and execution.",
              "Valuation & Due Diligence: Ensure fair market value and informed decisions.",
              "Deal Negotiation: Prioritizing your success in every negotiation.",
            ],
            icon: <FaHandshake />,
            link: "/service/ma",
          },
          {
            title: "Advisory Services",
            description: [
              "Asset & Wealth Management: Tailored investment plans for long-term growth.",
              "Capital Restructuring: Optimize capital for operational efficiency.",
              "Strategic Guidance: Business expansion and risk mitigation support.",
            ],
            icon: <FaChartLine />,
            link: "/service/advisory",
          },
          {
            title: "Research & Insights",
            description: [
              "Market Reports: Equity and debt market trends across regions.",
              "Industry Insights: Deep sector-specific intelligence.",
              "Macroeconomic Analysis: Understand key economic drivers.",
            ],
            icon: <FaSearchDollar />,
            link: "/service/research",
          },
        ].map((service, index) => (
          <Link to={service.link} key={index} className="block group">
            <div className="mb-8 sm:mb-10 bg-white shadow-md rounded-lg py-4 sm:p-6 border-l-4 border-lime-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 hover:shadow-lg hover:scale-[1.01] transition-all duration-200">
              <div className="sm:w-3/4">
                <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-3 group-hover:underline">
                  {service.title}
                </h3>
                <ul className="list-disc pl-5 text-sm sm:text-base text-gray-700 space-y-2">
                  {service.description.map((item, i) => (
                    <li key={i}>
                      <strong>{item.split(":")[0]}:</strong>{" "}
                      {item.split(":")[1]}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="text-lime-500 mx-auto text-6xl items-center sm:text-8xl">
                {service.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HamlinServices;
