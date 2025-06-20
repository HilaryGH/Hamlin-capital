import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

function About() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <>
      <section id="about">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 my-12 px-6 max-w-6xl mx-auto">
          {/* Image Section */}
          <div className="md:w-1/2">
            <img
              src="Home.jpg"
              alt="About Hamlin Capital"
              className="w-full h-auto rounded-xl shadow-md"
            />
          </div>

          {/* Text Section */}
          <div className="md:w-1/2 space-y-6 text-left">
            <h1
              className="text-2xl md:text-4xl font-bold text-blue-900 inline-block border-b-4 border-[#ADF802] pb-1"
              data-aos="slide-up"
              data-aos-duration="800"
            >
              About Us
            </h1>

            <p
              className=" text-sm md:text-lg text-dark"
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="800"
            >
              Hamlin Capital is an investment bank based in Addis Ababa,
              Ethiopia, dedicated to connecting capital to opportunities. We
              specialize in capital solutions that empower clients to achieve
              their strategic objectives.
            </p>

            <Link
              to="/about/values"
              className="bg-btn text-white px-6 py-2 rounded-full hover:bg-[#FACC15] transition inline-block"
              data-aos="fade-up"
              data-aos-delay="400"
              data-aos-duration="800"
            >
              About Us +
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
