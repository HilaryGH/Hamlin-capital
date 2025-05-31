import { useEffect, useState } from "react";

// Slides
const slides = [
  {
    image: "https://images.pexels.com/photos/3182763/pexels-photo-3182763.jpeg",
    heading: "Connecting Capital to Opportunity",
    subtext: "Empowering growth through strategic investment solutions.",
  },
  {
    image: "https://images.pexels.com/photos/3182787/pexels-photo-3182787.jpeg",
    heading: "Fueling Innovation Through Smart Finance",
    subtext: "We bridge ideas and investors to build Ethiopia's future.",
  },
  {
    image: "https://images.pexels.com/photos/3184419/pexels-photo-3184419.jpeg",
    heading: "Partnering for Purposeful Progress",
    subtext: "Expert guidance for fundraising, M&A, and asset growth.",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[100dvh] max-h-[1000px] w-full overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt="hero"
              className="h-full w-full object-top sm:object-cover"
            />

            {/* Dark overlay or gradient for better readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />
          </div>
        ))}

        {/* Decorative vertical line (optional on small screens) */}
        <div className="absolute top-1/4 left-[6%] hidden sm:block h-1/2 w-[5px] bg-[#C5FA4D] z-20" />

        {/* Text Content */}
        <div className="relative z-30 flex items-center justify-start h-full px-6 sm:px-16">
          <div className="max-w-3xl text-left ml-0 sm:ml-[5%]">
            <h1 className="text-3xl sm:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              {slides[currentIndex].heading}
            </h1>
            <p className="text-base sm:text-lg text-white mb-6 drop-shadow">
              {slides[currentIndex].subtext}
            </p>
            <button className="bg-btn text-white px-6 py-3 rounded-full hover:bg-[#15803D] transition">
              Discover Our Services
            </button>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className="w-full bg-[#1d6ceb] py-6">
        <div className="max-w-6xl mx-auto px-4 text-white">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-lg text-center">
            <div className="flex flex-col items-center">
              <span className="text-2xl">📈</span>
              <p>
                <strong>Fundraising</strong>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">🤝</span>
              <p>
                <strong>Mergers & Acquisitions</strong>
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl">💼</span>
              <p>
                <strong>Advisory Services</strong>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
