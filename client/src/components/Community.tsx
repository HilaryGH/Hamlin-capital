import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
];

const Community = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-soft-gold rounded-lg shadow-sm p-4 border border-gray-100 max-w-md flex flex-col items-center">
      <div className="relative w-full max-w-md h-48 mx-auto overflow-hidden rounded-md">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index}`}
            className={`absolute inset-0 w-full h-48 object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <div className="text-center mt-4">
        <h3 className="text-lg font-semibold">Ethiopian Diaspora Network</h3>
        <button
          onClick={() => navigate("/diaspora")}
          className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-green-700 mt-3 transition-colors"
        >
          <span>Join Now</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default Community;
