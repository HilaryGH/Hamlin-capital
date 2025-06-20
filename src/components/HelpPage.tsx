import { Link } from "react-router-dom";

const HelpPage = () => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6 text-gray-800">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">
        Help & User Guide
      </h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          🔐 Account Registration
        </h2>
        <p>
          To get started, go to the{" "}
          <Link to="/register" className="text-blue-600 underline">
            Registration Page
          </Link>{" "}
          and choose your user type:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>Investor:</strong> For individuals or institutions looking
            to invest.
          </li>
          <li>
            <strong>Startup:</strong> For startups or companies seeking funding
            and visibility.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          📋 Dashboard Access
        </h2>
        <p>
          Once registered and logged in, you will be redirected to your personal
          dashboard:
        </p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>Investor Dashboard:</strong> Review your investment
            submission and status.
          </li>
          <li>
            <strong>Startup Dashboard:</strong> Track your startup's
            registration, status, and details.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          📨 Submissions
        </h2>
        <p>Each user type can submit forms tailored to their needs:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1">
          <li>
            <strong>Startups:</strong> Provide company details, business model,
            and funding needs.
          </li>
          <li>
            <strong>Investors:</strong> Indicate your investment interests and
            vehicles.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          📝 Job Applications
        </h2>
        <p>
          Users can apply for jobs through the Career section. All submitted
          jobs are visible on the “Applied Jobs” page.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-gray-700">
          📬 Contact & Support
        </h2>
        <p>
          If you have questions or need help, use the contact form on the site
          or email our support team at:
        </p>
        <p className="mt-1 font-medium text-blue-700">
          support@hamlincapital.com
        </p>
      </section>

      <section className="mt-12 border-t pt-6 text-sm text-gray-500"></section>
    </div>
  );
};

export default HelpPage;
