import React from "react";
import { useNavigate } from "react-router";
import { Frown, Home } from "lucide-react";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      {/* Animated 404 graphic */}
      <div className="relative mb-8">
        <div className="text-[120px] md:text-[180px] font-bold text-gray-200 relative">
          404
          <div className="absolute inset-0 flex items-center justify-center">
            <Frown className="w-24 h-24 md:w-32 md:h-32 text-gray-300" />
          </div>
        </div>
      </div>

      {/* Error message */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-lg text-gray-600 max-w-md mb-8">
        The page you're looking for doesn't exist or has been moved. Let's get
        you back to familiar territory.
      </p>

      {/* Action button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-green-700 hover:to-green-600"
      >
        <Home className="w-5 h-5" />
        <span className="font-semibold">Return to Homepage</span>
      </button>

      {/* Additional help */}
      <p className="mt-8 text-gray-500 text-sm">
        Need help?{" "}
        <button
          onClick={() => navigate("/contact")}
          className="text-green-600 hover:underline"
        >
          Contact our support team
        </button>
      </p>
    </div>
  );
};

export default ErrorPage;