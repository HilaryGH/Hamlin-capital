function HamlinServices() {
  const services = [
    {
      title: "Equity Fundraising",
      description:
        "Tailored equity solutions to help companies raise capital while aligning with long-term strategic goals.",
    },
    {
      title: "Debt Financing",
      description:
        "Diverse and structured debt options designed to fuel business growth through flexible lending solutions.",
    },
    {
      title: "Investor Positioning",
      description:
        "Strategic alignment of clients with the right investors to maximize value and long-term impact.",
    },
    {
      title: "Deal Negotiation",
      description:
        "Expert guidance in negotiations to ensure clients receive optimal deal terms and risk protections.",
    },
    {
      title: "Mergers & Acquisitions",
      description:
        "Comprehensive advisory for structuring, evaluating, and executing successful M&A transactions.",
    },
    {
      title: "Advisory Services",
      description:
        "Personalized asset and wealth management strategies focused on integrity and client priorities.",
    },
  ];

  return (
    <section className="py-16 px-6 bg-white text-dark">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#1d6ceb] mb-4">Our Services</h2>
        <p className="text-gray-600 text-lg mb-10">
          Empowering your financial future through expert solutions.
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 text-left">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-[#1d6ceb] mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  {service.description}
                </p>
              </div>

              {/* Learn More button */}
              <button className="mt-auto inline-block text-sm font-medium text-[#1d6ceb] hover:underline">
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HamlinServices;
