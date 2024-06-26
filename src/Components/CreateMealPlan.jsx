import React, { useState, useEffect } from "react";
import Notification from "./Notification";
import { Link, useNavigate } from "react-router-dom";
import back from '../assets/back.png';

const CreateMealPlan = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [dietType, setDietType] = useState("");
  const [budget, setBudget] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await response.json();
        
        
        const userData = {
          dietType: "Vegetarian",
          budget: "Flexible",
          allergies: ["Groundnut", "Fish"],
          dislikes: ["Tofu", "Blue cheese"]
        };

        setDietType(userData.dietType);
        setBudget(userData.budget);
        setAllergies(userData.allergies);
        setDislikes(userData.dislikes);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDietTypeChange = (e) => setDietType(e.target.value);
  const handleBudgetChange = (e) => setBudget(e.target.value);
  const handleAllergiesChange = (e) => {
    const value = e.target.value;
    setAllergies((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };
  const handleDislikesChange = (e) => {
    const value = e.target.value;
    setDislikes((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };
  
  return (
    <div className="flex flex-col justify-center items-center mb-10 mt-6">
      <img
        src={back}
        alt="Back icon"
        style={{ cursor: 'pointer', position: 'absolute', top: 70, left: 10, width: 20, height: 20 }}
        onClick={() => navigate(-1)}
      />
      
      <div className="inline-flex w-[358px] h-[80px] flex-col items-start">
        <h1 className="font-manrope text-lg font-semibold leading-normal">
          Create meal plan
        </h1>
        <p className="font-manrope text-sm text-[#545454] mt-3 font-normal leading-normal">
          Personal dietary record
        </p>
      </div>
      
      <div className="flex flex-col w-[358px] items-start mb-6 gap-2">
        <p className="font-manrope text-sm font-bold leading-[21px]">
          Meal plan title
        </p>
        <div className="flex p-4 items-start content-start gap-4 self-stretch flex-wrap rounded-[4px] border">
          <textarea placeholder=" Add a title" className="font-manrope bg-white text-gray-600 text-sm w-[360px] h-[53px] leading-[150%]" 
          disabled={!isEditing}></textarea>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="font-manrope text-[13px] mb-2 font-bold leading-normal text-[#545454]">
          Your dietary record
        </p>

        <div className="inline-flex p-2 w-[358px] h-[80px] mb-2 flex-col items-start gap-2 rounded-lg border border-[#EAEAEA] bg-[#F4F4F4]">
          <p className="font-manrope text-sm font-bold leading-normal text-[#545454]">
            Diet Type:
          </p>
          <select value={dietType} onChange={handleDietTypeChange} className="font-manrope text-sm leading-normal text-[#545454]" disabled={!isEditing}>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Paleo">Paleo</option>
            <option value="Keto">Keto</option>
          </select>
        </div>

        <div className="inline-flex p-2 flex-col w-[358px] h-[80px] mb-2 items-start gap-2 rounded-lg border border-[#EAEAEA] bg-[#F4F4F4]">
          <p className="font-manrope text-sm font-bold leading-normal text-[#545454]">
            Budget:
          </p>
          <select value={budget} onChange={handleBudgetChange} className="font-manrope text-sm leading-normal text-[#545454]" disabled={!isEditing}>
            <option value="Flexible">Flexible</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="inline-flex p-2 flex-col w-[358px] h-[80px] mb-2 items-start gap-2 rounded-lg border bg-[#F4F4F4] border-[#EAEAEA]">
          <p className="font-manrope text-sm font-bold leading-normal text-[#545454]">
            Allergies:
          </p>
          <div className="flex w-[342px] items-start content-start gap-2 flex-wrap">
            {allergies.map((allergy) => (
              <div key={allergy} className="flex p-1 items-start gap-4 rounded-full bg-[#DADADA]">
                <p className="font-manrope text-sm font-medium leading-normal text-[#545454]">{allergy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="inline-flex p-2 flex-col w-[358px] h-[80px] mb-2 items-start gap-2 rounded-lg border bg-[#F4F4F4] border-[#EAEAEA]">
          <p className="font-manrope text-sm font-bold leading-normal text-[#545454]">
            Dislikes:
          </p>
          <div className="flex w-[342px] items-start content-start gap-2 flex-wrap">
            {dislikes.map((dislike) => (
              <div key={dislike} className="flex p-1 items-start gap-4 rounded-full bg-[#DADADA]">
                <p className="font-manrope text-sm font-medium leading-normal text-[#545454]">{dislike}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <button
          className="font-manrope text-md font-medium leading-normal text-[#545454]
         flex w-[358px] h-[40px] mt-6 mb-2 p-4 justify-center items-center gap-2 flex-shrink-0
          rounded-[8px] border border-[#4268FB]"
          onClick={handleEditClick}
        >
          Edit dietary record
        </button>
        <Link to={`/SelectPreference`}>
          <button
            className="font-manrope text-md font-medium leading-normal
          flex w-[358px] h-[40px] p-4
         justify-center items-center gap-2 flex-shrink-0 rounded-[8px] border bg-[#4268FB]"
          >
            Proceed
          </button>
        </Link>
      </div>

      {successMessage && <Notification message={successMessage} />}
    </div>
  );
};

export default CreateMealPlan;
