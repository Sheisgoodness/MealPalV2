import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const AgeAndBMI = () => {
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState("");
  const [bmiStatus, setBMIStatus] = useState("");
  const [gender, setGender] = useState("");
  const [ageColor, setAgeColor] = useState("text-gray-500"); 

  const calculateBMI = () => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / heightInMeters ** 2).toFixed(2);
      setBMI(bmiValue);
      localStorage.setItem("bmi", bmiValue);
      determineBMIStatus(bmiValue);
    } else {
      toast.error("Please enter height and weight");
    }
  };

  const determineBMIStatus = (bmiValue) => {
    if (bmiValue < 18.5) {
      setBMIStatus("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      setBMIStatus("Normal weight");
    } else if (bmiValue >= 25 && bmiValue < 30) {
      setBMIStatus("Overweight");
    } else {
      setBMIStatus("Obesity");
    }
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleHeightChange = (e) => {
    setHeight(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleAgeColorChange = () => {
    setAgeColor("text-blue-500"); 
  };

  const clearForm = () => {
    setAge("");
    setHeight("");
    setWeight("");
    setBMI("");
    setBMIStatus("");
    setGender("");
    setAgeColor("text-gray-500"); 
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col min-h-screen lg:items-center justify-center px-5" style={{ backgroundColor: '#ffffff', color: '#101010' }}>
        <h2 className="text-2xl font-extrabold mb-6 mt-16" style={{ color: '#101010' }}>Interested in Knowing your BMI?</h2>
        
        {/* Age section */}
        <div className="flex mb-6 max-w-md">
          <span className="mr-2">Age</span>
          <input
            type="text"
            id="age"
            onChange={handleAgeChange}
            value={age}
            className={`border p-2 w-16 h-8 lg:w-32 border-solid border-2 border-gray-800 shadow-custom focus:outline-none shadow-lg ml-6 ${ageColor}`}
            style={{ backgroundColor: '#ffffff', color: '#101010' }}
            onClick={handleAgeColorChange} 
          />
          <span className="ml-8 text-sm">ages: 2-120</span>
        </div>
        {/* End of Age section */}

        {/* Gender section */}
        <div className="flex mb-6 max-w-md items-center">
          <span className="mr-8">Gender</span>
          <label className="custom-radio">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === 'male'}
              onChange={handleGenderChange}
            />
            <span className="radio-indicator"></span>
            <span className="ml-2">Male</span>
          </label>
          <label className="custom-radio ml-6">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === 'female'}
              onChange={handleGenderChange}
            />
            <span className="radio-indicator"></span>
            <span className="ml-3">Female</span>
          </label>
        </div>
        {/* End of Gender section */}
        
           {/* Height section */}
        <div className="flex mb-10 max-w-screen-md">
          <label htmlFor="height" className="mr-4">Height</label>
          <input
            type="text"
            id="height"
            placeholder="meters"
            value={height}
            onChange={handleHeightChange}
            className="border p-3 w-70 lg:w-80 border-solid border-2 border-gray-800 shadow-custom focus:outline-none shadow-xl placeholder-bottom-right"
            style={{ backgroundColor: '#ffffff', color: '#101010' }}
          />
        </div>
        {/* End of Height section */}
        
        {/* Weight section */}
        <div className="flex max-w-screen-md">
          <label htmlFor="weight" className="mr-4">Weight</label>
          <input
            type="text"
            id="weight"
            placeholder="kilograms"
            value={weight}
            onChange={handleWeightChange}
            className="border p-3 w-70 lg:w-80 border-solid border-2 border-gray-800 shadow-custom focus:outline-none shadow-xl placeholder-bottom-right"
            style={{ backgroundColor: '#ffffff', color: '#101010' }}
          />
        </div>
        {/* End of Weight section */}
        
        <div className="flex mt-6 justify-center max-w-md mb-3">
          <button
            onClick={calculateBMI}
            className="px-3 py-2 w-1/3 md:w-36 text-white rounded-md font-semibold hover:bg-neonblue"
            style={{ backgroundColor: '#4268FB' }}
          >
            Calculate
          </button>
          <button
            onClick={clearForm}
            className="ml-4 px-3 py-2 w-1/3 md:w-36 rounded-md font-semibold hover:bg-grey-400"
            style={{ backgroundColor: '#777777', color: '#ffffff' }}
          >
            Clear
          </button>
        </div>
        {bmi && (
          <div className="mt-6 text-xl font-medium max-w-md">
            <p>BMI: <strong>{bmi}</strong></p>
            <p>Status: <strong>{bmiStatus}</strong></p>
          </div>
        )}
        <p className="text-xs text-gray-600 mb-8 max-w-md mt-6">
          This helps us calculate your body mass that may lead to health problems.
        </p>
      </div>
    </>
  );
};

export default AgeAndBMI;
