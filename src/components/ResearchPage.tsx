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
      icon: <Globe className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Company Evaluation",
      description:
        "Deep dives into company fundamentals and competitive positioning",
      icon: <Building className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-[#c5fa4d]",
    },
    {
      title: "Quantitative Review",
      description:
        "Rigorous financial analysis using multiple valuation methodologies",
      icon: <Calculator className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-blue-500",
    },
    {
      title: "Actionable Insights",
      description:
        "Clear, data-driven investment recommendations with risk assessment",
      icon: <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />,
      color: "bg-[#c5fa4d]",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-white text-dark py-8 px-4 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-6">
          {/* Image */}
          <div className="w-full md:w-1/2">
            <img
              src="Finance-amico.svg"
              alt="Research visual"
              className="w-full h-auto rounded-md object-cover"
            />
          </div>

          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-2xl md:text-3xl text-blue-900 font-bold mb-4 leading-snug">
              Fundamental Research Methodology
            </h1>
            <p className="text-base md:text-lg font-light">
              Uncovering investment opportunities through rigorous, bottom-up
              analysis and disciplined valuation frameworks.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
            Systematic Research Approach
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            A proven four-step methodology for identifying sustainable
            investment opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {methodologySteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
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
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md w-full">
                <h3 className="text-lg md:text-xl font-semibold text-blue-700 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reports Section */}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-12 text-center">
            Our Research Publications
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              icon={<BarChart className="w-6 h-6 text-blue-600" />}
              variant="secondary"
            />
            <ReportCard
              title="Corporate Performance"
              description="Timely analysis of company results and significant corporate actions."
              link="#"
              icon={<AreaChart className="w-6 h-6 text-blue-600" />}
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
              icon={<LineChart className="w-6 h-6 text-blue-600" />}
              variant="secondary"
            />
            <ReportCard
              title="Fixed Income Analysis"
              description="Comprehensive coverage of bond markets and interest rate environment."
              link="#"
              icon={<Banknote className="w-6 h-6 text-blue-600" />}
              variant="accent"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

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
      border: "border-blue-500",
      title: "text-blue-700",
      link: "text-blue-600 hover:text-blue-800",
    },
    accent: {
      border: "border-blue-500",
      title: "text-blue-700",
      link: "text-blue-600 hover:text-blue-800",
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
        <p className="text-gray-600 mb-4 flex-grow text-sm md:text-base">
          {description}
        </p>
        <a
          href={link}
          className={`${styles.link} font-medium inline-flex items-center mt-auto text-sm md:text-base`}
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
