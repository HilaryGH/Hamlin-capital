import { Link } from "react-router-dom";

const AdvisoryPage: React.FC = () => {
  return (
    <>
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Advisory Services
          </h1>
          <p className="mb-4 text-lg">
            Hamlin Capital offers expert financial and strategic advisory
            services designed to help our clients make informed decisions,
            maximize value, and achieve long-term growth.
          </p>

          <ul className="list-disc pl-6 space-y-4 text-gray-700">
            <li>
              <strong>Asset & Wealth Management:</strong> We provide
              personalized investment strategies to preserve and grow wealth
              across generations. Our solutions are tailored to client risk
              profiles, financial goals, and market opportunities.
            </li>
            <li>
              <strong>Capital Restructuring:</strong> Our advisors help clients
              evaluate and restructure their capital mix to reduce costs,
              enhance operational efficiency, and support future investment or
              growth strategies.
            </li>
            <li>
              <strong>Strategic Guidance:</strong> We support businesses through
              mergers, acquisitions, divestitures, and expansion planning, with
              insights that balance opportunity with risk mitigation.
            </li>
            <li>
              <strong>Financial Planning & Analysis:</strong> From budgeting to
              forecasting, we help clients develop robust financial plans that
              align with long-term objectives.
            </li>
            <li>
              <strong>Business Valuation:</strong> Our professionals conduct
              detailed valuation services to support transactions, investments,
              or internal decision-making.
            </li>
          </ul>

          <p className="mt-6 text-lg">
            Whether you're an institutional investor or a growing enterprise,
            Hamlin Capital is your partner in navigating complexity and
            unlocking value.
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

export default AdvisoryPage;
