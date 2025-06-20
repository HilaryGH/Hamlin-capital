import { Link } from "react-router-dom";

const Research: React.FC = () => {
  return (
    <>
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Research & Insights
          </h1>
          <p className="mb-4 text-lg">
            At Hamlin Capital, we empower investment and policy decisions
            through rigorous research, real-time market intelligence, and
            actionable insights tailored to our clients’ needs.
          </p>

          <ul className="list-disc pl-6 space-y-4 text-gray-700">
            <li>
              <strong>Market Reports:</strong> Comprehensive equity and debt
              market coverage—local, regional, and international—delivered
              through daily, weekly, and quarterly reports.
            </li>
            <li>
              <strong>Industry Intelligence:</strong> Annual in-depth analyses
              of sectors represented on the Ethiopian Securities Exchange (ESX)
              and beyond.
            </li>
            <li>
              <strong>Macroeconomic & Policy Research:</strong> Clear
              interpretations of fiscal, monetary, and regulatory trends shaping
              capital markets in Ethiopia and East Africa.
            </li>
            <li>
              <strong>Investor Briefs:</strong> Timely insights into
              market-moving developments and what they mean for investors.
            </li>
            <li>
              <strong>Custom Research:</strong> Bespoke data analysis,
              forecasting, and strategy support to guide complex investment or
              expansion decisions.
            </li>
          </ul>

          <p className="mt-6 text-lg">
            Our research team supports not only internal investment strategies
            but also enables clients to act confidently in fast-changing
            markets.
          </p>
        </div>
      </section>

      <Link
        to="/service"
        className="text-blue-700 hover:underline mt-8 block text-center"
      >
        ← Back to All Services
      </Link>
    </>
  );
};

export default Research;
