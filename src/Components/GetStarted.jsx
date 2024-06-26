import React from "react";
import image1 from "../assets/StarterImages/Image-1.png";
import image2 from "../assets/StarterImages/Image-2.png";
import image3 from "../assets/StarterImages/Image-3.png";
import image4 from "../assets/StarterImages/Image-1.png";
import image5 from "../assets/StarterImages/Image-2.png";
import image6 from "../assets/StarterImages/Image-3.png";
import image7 from "../assets/StarterImages/Image-7.png";
import image8 from "../assets/StarterImages/Image-8.png";
import image9 from "../assets/StarterImages/Image-9.png";
import image10 from "../assets/StarterImages/Image-10.png";
import image11 from "../assets/StarterImages/Image-11.png";
import image12 from "../assets/StarterImages/Image-12.png";
import { Link } from "react-router-dom";

const GetStarted = ({ onNext }) => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col">
      <div className="flex-[5] grid grid-cols-3 grid-rows-4 gap-2 p-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
            }}
          ></div>
        ))}
      </div>
      <div
        className="flex-[1] flex flex-col justify-center items-center bg-gray-900"
        style={{ backgroundColor: "charcoal" }}
      >
        <h1 className="text-4xl font-bold mb-4 text-white">MealPal</h1>
        <p className="text-gray-200 text-[0.875rem] mb-6 font-medium text-center px-2">
          Discover Amazing Meal Plans to put you in the pink of health
        </p>
        <button
          onClick={onNext}
          className="w-80 bg-[#4268fb] hover:bg-[#4268fb] text-white font-semibold py-4 px-4 rounded-md"
        >
          Get Started
        </button>
        <p className="text-gray-300 mt-4">
          Already have an account?{" "}
          <span>
            <Link to="/signin" className="text-[#4268fb] hover:text-[#4268fb]">
              Sign in
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default GetStarted;
