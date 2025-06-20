import { Link } from "react-router-dom";

const MergersAcquisitionsPage: React.FC = () => {
  return (
    <>
      <section className="py-16 px-6 bg-white text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Mergers & Acquisitions (M&A)
          </h1>
          <p className="mb-4 text-lg">
            At Hamlin Capital, we guide clients through complex merger and
            acquisition processes with confidence, discretion, and
            expertise—ensuring every transaction aligns with strategic growth
            goals.
          </p>

          <ul className="list-disc pl-6 space-y-4 text-gray-700">
            <li>
              <strong>Buy-side & Sell-side Advisory:</strong> From identifying
              opportunities to closing the deal, we provide end-to-end support
              in both acquisitions and divestitures.
            </li>
            <li>
              <strong>Valuation & Due Diligence:</strong> We perform rigorous
              financial analysis and risk assessment to ensure accurate
              valuations and informed decision-making.
            </li>
            <li>
              <strong>Deal Structuring:</strong> We craft transaction structures
              that maximize value while mitigating tax and legal exposures.
            </li>
            <li>
              <strong>Negotiation Support:</strong> Our experienced advisors
              lead or support negotiations to secure favorable terms for our
              clients.
            </li>
            <li>
              <strong>Post-Merger Integration:</strong> We help ensure a smooth
              transition by aligning systems, cultures, and objectives for
              sustainable success.
            </li>
          </ul>

          <p className="mt-6 text-lg">
            Whether you are pursuing strategic growth, entering new markets, or
            restructuring your portfolio, Hamlin Capital provides the insight
            and execution to make M&A a strategic advantage.
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

export default MergersAcquisitionsPage;
