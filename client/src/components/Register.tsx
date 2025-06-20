import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md sm:max-w-xl p-6 rounded-xl shadow-md text-center">
        <h1 className="text-lg sm:text-3xl font-bold text-blue-900 mb-3">
          Hamlin Capital Registration
        </h1>
        <h2 className="text-base sm:text-xl font-semibold text-gray-700 mb-1">
          Welcome to Your Investment Journey
        </h2>
        <p className="text-sm sm:text-base text-gray-500 mb-6">
          Let us get to know you better. Choose the path that best fits your
          role.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/register/investor")}
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Register as Investor
          </button>

          <button
            onClick={() => navigate("/register/startup")}
            className="px-5 py-2 bg-lime-400 text-gray-900 font-semibold rounded-lg shadow hover:bg-lime-500 transition duration-200"
          >
            Register as Startup
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
