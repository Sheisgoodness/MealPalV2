import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AgeAndBMI = ({ onBmiCalculated }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [bmiStatus, setBmiStatus] = useState("");

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = parseFloat(height);
      const weightInKg = parseFloat(weight);

      if (heightInMeters <= 0 || weightInKg <= 0) {
        toast.error("Height and weight must be greater than zero");
        return;
      }

      const bmiValue = (weightInKg / (heightInMeters ** 2)).toFixed(2);
      setBMI(bmiValue);
      localStorage.setItem("bmi", bmiValue);
      determineBmiStatus(parseFloat(bmiValue));
      onBmiCalculated(); 
    } else {
      toast.error("Please enter height and weight");
    }
  };

  const determineBmiStatus = (bmi) => {
    if (bmi < 18.5) {
      setBmiStatus("Underweight");
    } else if (bmi >= 18.5 && bmi < 24.9) {
      setBmiStatus("Normal weight");
    } else if (bmi >= 25 && bmi < 29.9) {
      setBmiStatus("Overweight");
    } else if (bmi >= 30) {
      setBmiStatus("Obese");
    }
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    localStorage.setItem("age", e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
    localStorage.setItem("gender", e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col min-h-screen lg:items-center justify-center px-5">
        <h2 className="text-2xl font-extrabold mb-4">Let's calculate your BMI?</h2>
        <div className="flex flex-col w-full max-w-screen-md">
          <label htmlFor="age" className="flex flex-col gap-2 mb-4 w-full">
            Age
            <input
              type="number"
              id="age"
              placeholder="0 years"
              value={age}
              onChange={handleAgeChange}
              className="border rounded p-3 w-full"
            />
          </label>
          <label htmlFor="gender" className="flex flex-col gap-2 mb-8 w-full">
            Gender
            <select
              id="gender"
              value={gender}
              onChange={handleGenderChange}
              className="border rounded p-3 w-full"
            >
              <option value="" disabled>Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>
        </div>
        <div className="flex space-x-4 w-full max-w-screen-md">
          <label htmlFor="height" className="flex flex-col gap-2 w-full">
            Height (meters)
            <input
              type="number"
              id="height"
              placeholder="0 meters"
              value={height}
              onChange={handleHeightChange}
              className="border rounded p-3 mb-4 w-full"
            />
          </label>
          <label htmlFor="weight" className="flex flex-col gap-2 w-full">
            Weight (kg)
            <input
              type="number"
              id="weight"
              placeholder="0 kg"
              value={weight}
              onChange={handleWeightChange}
              className="border rounded p-3 mb-4 w-full"
            />
          </label>
        </div>
        <button
          onClick={calculateBMI}
          className="px-4 py-2 w-full max-w-screen-md mt-4 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-900"
        >
          Calculate BMI
        </button>
        <div className={`mt-4 w-full max-w-screen-md border text-center bg-blue-50 rounded-lg overflow-hidden ${bmi ? "bg-blue-200" : ""}`}>
          {bmi ? (
            <p className="p-3">
              Your BMI: <strong>{bmi}</strong> - <strong>{bmiStatus}</strong>
            </p>
          ) : (
            <p className="p-3">
              Your BMI: <strong>0.0</strong>
            </p>
          )}
        </div>
        <p className="mt-4 text-sm text-left text-gray-400">
          This helps us calculate your body mass that may lead to health problems.
        </p>
      </div>
    </>
  );
};

export default AgeAndBMI;