import React from "react";
import { Link, useLocation, useNavigate } from  "react-router-dom";

const SuccessPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const message = location.state?.message || "Your form has been sent successfully";

    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <p className="mb-4">Your form has been sent successfully !</p>

          {/* <button 
      onClick={() => navigate("/")} 
      className="mt-4 py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Okay
          </button> */}

          <Link
          to="/"
          className="py=2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"> 
          Okay
          </Link>

          </div>
    </div>
  );
};
  
  export default SuccessPage;