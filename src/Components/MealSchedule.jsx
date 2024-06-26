import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import chevron from "../assets/chevron.png";
import bookmark from "../assets/bookmark.png";
import back from '../assets/back.png';

const initialMealPlan = {
  Week1: {
    Day1: ["Vege-Salad Breakfast", "Vege-Salad Lunch", "Vege-Salad Dinner"],
    Day2: ["Vege-Salad Breakfast", "Vege-Salad Lunch", "Vege-Salad Dinner"],
    Day3: ["Vege-Salad Breakfast", "Vege-Salad Lunch", "Vege-Salad Dinner"],
  },
  Week2: {
    Day1: ["Vege-Salad Breakfast", "Vege-Salad Lunch", "Vege-Salad Dinner"],
    Day2: ["Vege-Salad Breakfast", "Vege-Salad Lunch", "Vege-Salad Dinner"],
    Day3: ["Vege-Salad Breakfast", "Vege-Salad Lunch", "Vege-Salad Dinner"],
  },
};

const MealSchedule = () => {
  const [mealPlan, setMealPlan] = useState(initialMealPlan);
  const [activeWeek, setActiveWeek] = useState('Week1');
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center mb-10 mt-6 p-6">
      <img
        src={back}
        alt="Back icon"
        style={{ cursor: 'pointer', position: 'absolute', top: 70, left: 10, width: 20, height: 20 }}
        onClick={() => navigate(-1)}
      />
    <div className='flex flex-col items-start'>
    <h1 className="text-2xl font-bold text-start">Meal schedule</h1>
      <textarea
        className="w-[334px] border p-2 mt-2 rounded"
        placeholder="Add a description here"
      />
    </div>
     
      <div className="flex items-center gap-3 w-[360px] mt-4">
        <button
          className={`px-4 py-2 rounded-full ${activeWeek === 'Week1' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveWeek('Week1')}
        >
          Week 1
        </button>
        <button
          className={`px-4 py-2 rounded-full ${activeWeek === 'Week2' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveWeek('Week2')}
        >
          Week 2
        </button>
      </div>

      <div className="flex flex-col mt-4 pl-12 pr-6">
        {Object.keys(mealPlan[activeWeek]).map(day => (
          <div key={day} className="flex flex-col items-start gap-4 mb-4">
            <h3 className="text-md font-medium">{day}</h3>
            {mealPlan[activeWeek][day].map((meal, index) => {
              const [mealName, mealType] = meal.split(' ');
              return (
                <div
                  key={index}
                  className="flex justify-between items-center border-gray-100 border-b-2 p-2  w-[390px]"
                >
                  <div className="flex flex-col justify-center items-start">
                    <p>{mealName}</p>
                    <p className="bg-[#F4F4F4] text-blue-500 p-1 rounded">{mealType}</p>
                  </div>
                  <img
                    src={chevron}
                    alt="chevron right"
                    className="h-4 w-4"
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div>
        <Link to={`/MealNutrients`}>
          <button
            className="font-manrope text-md font-medium mt-10 leading-normal
            flex w-[358px] h-[40px] p-4
           justify-center items-center gap-2 flex-shrink-0 rounded-[8px] border text-white bg-[#4268FB]"
          >
           Proceed
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MealSchedule;
