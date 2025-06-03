import React from "react";
import {
  LineChart,
  BarChart,
  AreaChart,
  Banknote,
  PieChart,
  Activity,
  Globe,
  Building,
  Calculator,
  TrendingUp,
} from "lucide-react";

interface ReportCardProps {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  variant?: "primary" | "secondary" | "accent";
}

interface MethodologyStep {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ResearchPage: React.FC = () => {
  const methodologySteps: MethodologyStep[] = [
    {
      title: "Industry Analysis",
      description:
        "Comprehensive sector evaluation identifying key themes, trends, and value drivers",
      icon: <Globe className="w-6 h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Company Evaluation",
      description:
        "Deep dives into company fundamentals and competitive positioning",
      icon: <Building className="w-6 h-6" />,
      color: "bg-emerald-500",
    },
    {
      title: "Quantitative Review",
      description:
        "Rigorous financial analysis using multiple valuation methodologies",
      icon: <Calculator className="w-6 h-6" />,
      color: "bg-purple-500",
    },
    {
      title: "Actionable Insights",
      description:
        "Clear, data-driven investment recommendations with risk assessment",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section (unchanged) */}
      <section className="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Fundamental Research Methodology
          </h1>
          <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto">
            Uncovering investment opportunities through rigorous, bottom-up
            analysis and disciplined valuation frameworks.
          </p>
        </div>
      </section>

      {/* Redesigned Methodology Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-medium uppercase text-sm tracking-wider">
            Our Process
          </span>
          <h2 className="text-3xl font-bold text-gray-800 mt-3 mb-4">
            Systematic Research Approach
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A proven four-step methodology for identifying sustainable
            investment opportunities
          </p>
        </div>

        {/* Steps Visualization */}
        <div className="relative">
          {/* Progress line (desktop only) */}
          <div className="hidden lg:block absolute left-16 right-16 top-12 h-1 bg-gray-200 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            {methodologySteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Step number and icon */}
                <div
                  className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center text-white mb-4 relative`}
                >
                  <span className="text-xl font-bold">{index + 1}</span>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div
                      className={`w-8 h-8 ${step.color} rounded-md flex items-center justify-center text-white rotate-45`}
                    >
                      {step.icon}
                    </div>
                  </div>
                </div>

                {/* Step content */}
                <div className="bg-white p-6 rounded-lg shadow-md w-full text-center">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reports Section (unchanged) */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Our Research Publications
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ReportCard
              title="Market Pulse Reports"
              description="Daily and weekly analyses of global, regional, and Ethiopian market-moving events."
              link="#"
              icon={<Activity className="w-6 h-6 text-blue-600" />}
              variant="primary"
            />
            <ReportCard
              title="Sector Deep Dives"
              description="Annual comprehensive reports on each industry represented on the ESX."
              link="#"
              icon={<BarChart className="w-6 h-6 text-emerald-600" />}
              variant="secondary"
            />
            <ReportCard
              title="Corporate Performance"
              description="Timely analysis of company results and significant corporate actions."
              link="#"
              icon={<AreaChart className="w-6 h-6 text-purple-600" />}
              variant="accent"
            />
            <ReportCard
              title="Macroeconomic Outlook"
              description="In-depth analysis of inflation, monetary policy, GDP trends."
              link="#"
              icon={<PieChart className="w-6 h-6 text-blue-600" />}
              variant="primary"
            />
            <ReportCard
              title="Investment Strategies"
              description="Data-driven market recommendations and portfolio guidance."
              link="#"
              icon={<LineChart className="w-6 h-6 text-emerald-600" />}
              variant="secondary"
            />
            <ReportCard
              title="Fixed Income Analysis"
              description="Comprehensive coverage of bond markets and interest rate environment."
              link="#"
              icon={<Banknote className="w-6 h-6 text-purple-600" />}
              variant="accent"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// ReportCard component remains unchanged
const ReportCard: React.FC<ReportCardProps> = ({
  title,
  description,
  link,
  icon,
  variant = "primary",
}) => {
  const variantStyles = {
    primary: {
      border: "border-blue-500",
      title: "text-blue-700",
      link: "text-blue-600 hover:text-blue-800",
    },
    secondary: {
      border: "border-emerald-500",
      title: "text-emerald-700",
      link: "text-emerald-600 hover:text-emerald-800",
    },
    accent: {
      border: "border-purple-500",
      title: "text-purple-700",
      link: "text-purple-600 hover:text-purple-800",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={`bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 transform hover:-translate-y-1 border-l-4 ${styles.border}`}
    >
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <div>{icon}</div>
          <h3 className={`text-lg font-semibold ${styles.title}`}>{title}</h3>
        </div>
        <p className="text-gray-600 mb-4 flex-grow">{description}</p>
        <a
          href={link}
          className={`${styles.link} font-medium inline-flex items-center mt-auto`}
        >
          Explore Report
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ResearchPage;
