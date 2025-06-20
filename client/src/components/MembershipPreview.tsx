import React, { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const images = ["/images/m1.jpg", "/images/m2.jpg", "/images/m3.jpg"]; // your actual image paths

const MembershipPreview: React.FC = () => {
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
      {/* Image Slider with Fade Transition */}
      <div className="relative w-full max-w-md h-48 overflow-hidden rounded-md mb-4">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-48 object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="flex items-center gap-2 mb-3">
        <FaCrown className="text-yellow-400 text-xl" />
        <h3 className="text-lg font-semibold text-center">Membership Plans</h3>
      </div>

      <button
        onClick={() => navigate("/membership")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        View Options
      </button>
    </div>
  );
};

export default MembershipPreview;
