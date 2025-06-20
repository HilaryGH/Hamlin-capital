import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";

const images = ["/images/c1.jpg", "/images/c2.jpg", "/images/c3.jpg"]; // Update with real paths

const CareersPreview = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-soft-gold rounded-lg shadow-md p-4 border border-gray-100 max-w-md flex flex-col items-center">
      {/* Image Slider with Fade Effect */}
      <div className="relative w-full max-w-md h-48 overflow-hidden rounded-md mb-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Career Slide ${index}`}
            className={`absolute inset-0 w-full h-48 object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Heading */}
      <div className="flex items-center gap-2 mb-3">
        <FaBriefcase className="text-blue-500 text-xl" />
        <h3 className="text-lg font-semibold text-center">Our Openings</h3>
      </div>

      {/* Button */}
      <button
        onClick={() => navigate("/careers")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
      >
        <span>View Open Positions</span>
        <span>→</span>
      </button>
    </div>
  );
};

export default CareersPreview;
