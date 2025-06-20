const UserGuide = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-6 text-center text-primary">
        User Guides
      </h2>
      <p className="mb-8 text-gray-600 text-center">
        Learn how to navigate, use, and get the most out of our platform.
        Whether you're new or returning, these guides help you every step of the
        way.
      </p>

      <div className="space-y-6">
        <GuideItem
          number="1"
          title="Getting Started"
          description="Begin by exploring our Home page to get an overview of our services. Create an account if needed, or reach out to us via the Contact page to get started."
          links={[
            { label: "Home page", href: "/" },
            { label: "Contact page", href: "/contact" },
          ]}
        />
        <GuideItem
          number="2"
          title="Navigating the Website"
          description="Use the main menu to access About Us, Services, Careers, and more. On smaller screens, click the ☰ icon to view the full menu."
        />
        <GuideItem
          number="3"
          title="Understanding Our Services"
          description="Visit the Services page to explore what we offer. Each section includes a description and how to request it."
          links={[{ label: "Services", href: "/services" }]}
        />
        <GuideItem
          number="4"
          title="Frequently Asked Questions (FAQ)"
          description="Find quick answers about pricing, support, and more on our FAQ page."
          links={[{ label: "FAQ", href: "/faq" }]}
        />
        <GuideItem
          number="5"
          title="Contacting Support"
          description="Need help? Contact us through the Contact page or email us at info@hamlincapital.com. We're available Monday to Friday, 9:00 AM – 5:00 PM."
          links={[
            { label: "Contact", href: "/contact" },
            {
              label: "info@hamlincapital.com",
              href: "mailto:info@hamlincapital.com",
            },
          ]}
        />
      </div>
    </section>
  );
};

const GuideItem = ({
  number,
  title,
  description,
  links = [],
}: {
  number: string;
  title: string;
  description: string;
  links?: { label: string; href: string }[];
}) => (
  <div>
    <h3 className="text-xl font-semibold mb-2">{`${number}. ${title}`}</h3>
    <p className="text-gray-700">
      {description
        .split(/(\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b)/)
        .map((part, index) => {
          const link = links.find((l) => part.includes(l.label));
          if (link) {
            return (
              <a
                key={index}
                href={link.href}
                className="text-blue-600 underline"
              >
                {link.label}
              </a>
            );
          }
          return <span key={index}>{part}</span>;
        })}
    </p>
  </div>
);

export default UserGuide;
