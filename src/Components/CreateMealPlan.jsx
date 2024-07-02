import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, onAuthStateChanged } from "../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import back from "../assets/back.png";

const CreateMealPlan = ({ onNext }) => {
  const [dietType, setDietType] = useState("");
  const [budget, setBudget] = useState("");
  const [allergies, setAllergies] = useState([]);
  const [dislikes, setDislikes] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  
  const dislikeOptions = [
    "avocado", "beef", "beets", "tuna", "bell peppers", "tofu", "blue cheese",
    "shrimp", "lamb", "brussels sprouts", "cauliflower", "eggplant", "olives",
    "eggs", "goat cheese", "mushrooms",
  ];

  const allergyOptions = [
    "Eggs", "seafoods", "nuts", "gluten", "sesame", "sulfite", "mustard", "soy", "lactose",
  ];

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          
          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setDietType(userData.dietType || "");
            setBudget(userData.budget || "");
            setAllergies(userData.allergies || []);
            setDislikes(userData.dislikes || []);
          } else {
            console.log("User document not found");
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  
  const handleEditClick = async () => {
    if (isEditing) {
      try {
        await setDoc(doc(db, "users", currentUser.uid), {
          dietType,
          budget,
          allergies,
          dislikes,
        });
       
      } catch (error) {
        console.error("Failed to update user data", error);
      }
    }
    setIsEditing(!isEditing);
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

  const renderPersonalDietaryRecordTitle = () => {
    if (currentUser && currentUser.displayName) {
      return (
        <p className="font-manrope text-sm text-[#545454] mt-3 font-normal leading-normal">
          {`${currentUser.displayName}'s personal dietary record`}
        </p>
      );
    } else {
      return (
        <p className="font-manrope text-sm text-[#545454] mt-3 font-normal leading-normal">
          Personal dietary record
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mb-10 mt-6">

      <div className="inline-flex w-[358px] h-[80px] flex-col items-start">
        <h1 className="font-manrope text-lg font-semibold leading-normal">Create meal plan</h1>
        {renderPersonalDietaryRecordTitle()}
      </div>

      <div className="flex flex-col w-[358px] items-start mb-6 gap-2">
        <p className="font-manrope text-sm font-bold leading-[21px]">Meal plan title</p>
        <div className="flex items-start content-start self-stretch flex-wrap">
          <textarea
            placeholder=" Add a title"
            className="font-manrope p-3 bg-white text-gray-600 text-sm w-[360px] h-[90px] leading-[150%]"
            disabled={!isEditing}
          ></textarea>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="font-manrope text-[13px] mb-2 font-bold leading-normal 
        text-[#545454]">Your dietary record</p>

        <div className="inline-flex p-2 w-[358px] h-[80px] mb-2 flex-col items-start 
        gap-2 rounded-lg border border-[#EAEAEA] bg-[#F4F4F4]">
          <p className="font-manrope text-sm font-bold leading-normal text-[#545454]">Diet Type:</p>
          <select value={dietType} onChange={handleDietTypeChange} className="font-manrope text-sm leading-normal text-[#545454]" disabled={!isEditing}>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Paleo">Paleo</option>
            <option value="Keto">Keto</option>
          </select>
        </div>

        <div className="inline-flex p-2 flex-col w-[358px] h-[80px] mb-2 items-start
         gap-2 rounded-lg border border-[#EAEAEA] bg-[#F4F4F4]">
          <p className="font-manrope text-sm font-bold leading-normal text-[#545454]">Budget:</p>
          <select 
          value={budget} 
          onChange={handleBudgetChange} 
          className="font-manrope text-sm leading-normal text-[#545454]" disabled={!isEditing}>
            <option value="Flexible">Flexible</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="inline-flex p-2 flex-col w-[358px] h-[auto] mb-2 items-start 
        gap-2 rounded-lg border bg-[#F4F4F4] border-[#EAEAEA]">
          <p className="font-manrope text-sm font-bold leading-normal text-[#545454]">Allergies:</p>
          <div className="flex w-[342px] items-start content-start gap-2 flex-wrap">
            {allergies.map((allergy) => (
              <div key={allergy} className="flex p-1 items-start gap-4 rounded-full bg-[#DADADA]">
                <p className="font-manrope text-sm font-medium leading-normal text-[#545454]">{allergy}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 ">
            {allergyOptions.map((option) => (
              <label key={option} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  value={option}
                  checked={allergies.includes(option)}
                  onChange={handleAllergiesChange}
                  disabled={!isEditing}
                />
                <span className="font-manrope text-sm leading-normal text-[#545454]">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="inline-flex p-2 flex-col w-[358px] h-[auto]  items-start gap-2 
        rounded-lg border bg-[#F4F4F4] border-[#EAEAEA]">
          <p className="font-manrope text-sm font-bold leading-normal text-[#545454]">Dislikes:</p>
          <div className="flex w-[342px] items-start content-start gap-2 flex-wrap">
            {dislikes.map((dislike) => (
              <div key={dislike} className="flex p-1 items-start gap-4 rounded-full bg-[#DADADA]">
                <p className="font-manrope text-sm font-medium leading-normal text-[#545454]">{dislike}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {dislikeOptions.map((option) => (
              <label key={option} className="flex items-center flex-nowrap space-x-1">
                <input
                  type="checkbox"
                  value={option}
                  checked={dislikes.includes(option)}
                  onChange={handleDislikesChange}
                  disabled={!isEditing}
                />
                <span className="font-manrope text-sm text-nowrap leading-normal text-[#545454]">{option}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col">
        <button
          className="font-manrope text-md font-medium leading-normal
         flex w-[358px] h-[40px] mt-6 mb-2 p-4 justify-center items-center gap-2 flex-shrink-0
          rounded-[8px] border border-green-700 hover:bg-green-300"
          style={{ border: '2px solid green' }}
          onClick={handleEditClick}
        >
          {isEditing ? "Save dietary record" : "Edit dietary record"}
        </button>
        
          <button
            className="font-manrope text-md font-medium leading-normal
          flex w-[358px] h-[40px] p-4
         justify-center items-center gap-2 flex-shrink-0 rounded-[8px] text-white 
         border hover:bg-green-300 bg-green-700"
         onClick={onNext}
          >
            Proceed
          </button>
        
      </div>
    </div>
  );
};

export default CreateMealPlan;
