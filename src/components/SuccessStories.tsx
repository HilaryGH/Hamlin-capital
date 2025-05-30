function SuccessStories() {
  const stories = [
    {
      logo: "/assets/startup-logo.svg",
      name: "EthioTech Solutions",
      title: "Equity Fundraising – $5M Series A Round",
      story:
        "Hamlin Capital partnered with EthioTech, a promising fintech startup in Addis Ababa, to secure $5 million in Series A funding. Our team helped them position their business to international VCs and structure a fair valuation model. Today, EthioTech has scaled to serve over 200,000 users.",
      quote:
        "Hamlin Capital's expertise and professionalism gave us the confidence to pitch to global investors. Their strategic insight was key to our growth.",
      client: "Meron Getachew, CEO of EthioTech",
    },
    {
      logo: "/assets/factory-logo.svg",
      name: "BlueNile Manufacturing PLC",
      title: "Debt Financing – Growth Expansion",
      story:
        "When BlueNile Manufacturing needed to expand production capacity, we structured a $3.2 million debt facility tailored to their cash flow. The result? A 2X increase in output and entry into 3 new regional markets within 9 months.",
      quote:
        "Hamlin’s support went beyond financing — they understood our business and delivered a solution that really worked.",
      client: "Dawit Tadesse, CFO of BlueNile Manufacturing",
    },
    {
      logo: "/assets/logistics-logo.svg",
      name: "EastBridge Logistics",
      title: "M&A – Cross-Border Acquisition",
      story:
        "Our M&A advisory helped an Ethiopian conglomerate acquire EastBridge Logistics in Kenya. We led negotiations, due diligence, and post-acquisition strategy. This deal enabled seamless operations across Ethiopia, Kenya, and Uganda.",
      quote:
        "The Hamlin Capital team was meticulous and strategic. Their leadership made this complex cross-border deal a success.",
      client: "Liya Solomon, Group Strategy Director",
    },
  ];

  return (
    <section className="py-16 px-6 bg-gray-50 text-dark">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#1d6ceb]">
          Success Stories
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Proven results from partnerships built on strategy, trust, and
          innovation.
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-left">
          {stories.map((s, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow hover:shadow-md transition space-y-4"
            >
              <img src={s.logo} alt={s.name} className="h-12 w-auto mb-2" />
              <h3 className="text-xl font-semibold text-[#1d6ceb]">
                {s.title}
              </h3>
              <p className="text-sm text-gray-600">{s.story}</p>
              <blockquote className="text-sm italic text-gray-500 border-l-4 border-blue-300 pl-4">
                “{s.quote}”
                <br />
                <span className="block mt-2 font-medium text-[#1d6ceb]">
                  {s.client}
                </span>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuccessStories;
