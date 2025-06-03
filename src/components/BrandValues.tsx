import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const BrandValues = () => {
  const content = [
    {
      title: "🌱 Our Impact",
      description:
        "Empowering lives, restoring dignity, and creating paths to prosperity.",
    },
    {
      title: "👁️ Our Vision",
      description:
        "To be the leading global investment banking partner by 2030, recognized for innovative solutions and exceptional service.",
    },
    {
      title: "🎯 Our Mission",
      description:
        "Delivering comprehensive financial services with integrity and professionalism.",
    },
    {
      title: "🧭 Our Identity",
      description:
        "We drive transformation by offering access to financial tools that empower and uplift.",
    },
    {
      title: "💬 Tagline",
      description: "Your Partner Who Listens and Cares.",
    },
    {
      title: "🤝 Our Motto",
      description: "Connecting Capital to Opportunity",
    },
  ];

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <>
      <section
        className="relative bg-cover bg-center min-h-[500px] flex items-center justify-center px-6 py-12"
        style={{ backgroundImage: "url('building.jpg')" }}
      >
        {/* Overlay for text contrast */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Text Content */}
        <div className="relative z-10 text-center text-white hero-text">
          <h1
            className="text-4xl md:text-5xl font-bold fade-in-up delay-1
          "
            data-aos="slide-up"
            data-aos-duration="800"
          >
            who we are
          </h1>
          <p
            className="text-lg md:text-xl  max-w-2xl mt-4 fade-in-up delay-2"
            data-aos="slide-up"
            data-aos-duration="800"
          >
            Hamlin Capital is an investment bank based in Addis Ababa, Ethiopia,
            dedicated to connecting capital to opportunities. We specialize in
            capital solutions that empower clients to achieve their strategic
            objectives.
          </p>
        </div>
      </section>

      {/* Brand Values Grid */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
            Our Brand Values
          </h2>
          <div className="grid bg-soft-gold grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-700 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandValues;
