import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import chevron from "../assets/chevron.png";
import back from '../assets/back.png';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { meals } from './MealData';

const initialMealPlan = {
  Week1: {
    Day1: [],
    Day2: [],
    Day3: [],
  },
  Week2: {
    Day1: [],
    Day2: [],
    Day3: [],
  },
};

const MealSchedule = ({ onNext }) => {
  const [mealPlan, setMealPlan] = useState(initialMealPlan);
  const [activeWeek, setActiveWeek] = useState('Week1');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const db = getFirestore();
        const dislikesDoc = await getDoc(doc(db, 'userPreferences', 'dislikes'));
        const preferencesDoc = await getDoc(doc(db, 'userPreferences', 'selectPreferences'));
        const allergiesDoc = await getDoc(doc(db, 'userPreferences', 'allergies'));

        const dislikes = dislikesDoc.data()?.options || [];
        const selectPreferences = preferencesDoc.data()?.preferences || [];
        const allergies = allergiesDoc.data()?.options || [];

        return { dislikes, selectPreferences, allergies };
      } catch (error) {
        console.error('Error fetching user preferences:', error);
        return { dislikes: [], selectPreferences: [], allergies: [] };
      }
    };

     //   const fetchMealData = async () => {
  //     try {
  //       const { dislikes, selectPreferences, allergies } = await fetchUserPreferences();

  //       const week1Day1 = await fetchMeals(0, selectPreferences, dislikes, allergies);
  //       const week1Day2 = await fetchMeals(3, selectPreferences, dislikes, allergies);
  //       const week1Day3 = await fetchMeals(6, selectPreferences, dislikes, allergies);

  //       const week2Day1 = await fetchMeals(1, selectPreferences, dislikes, allergies);
  //       const week2Day2 = await fetchMeals(4, selectPreferences, dislikes, allergies);
  //       const week2Day3 = await fetchMeals(7, selectPreferences, dislikes, allergies);

  //       setMealPlan({
  //         Week1: {
  //           Day1: week1Day1,
  //           Day2: week1Day2,
  //           Day3: week1Day3,
  //         },
  //         Week2: {
  //           Day1: week2Day1,
  //           Day2: week2Day2,
  //           Day3: week2Day3,
  //         },
  //       });
  //     } catch (error) {
  //       console.error('Error fetching meal data:', error);
  //     }
  //   };

  //   fetchMealData();
  // }, []);

    const fetchMealData = async () => {
      try {
        const { dislikes, selectPreferences, allergies } = await fetchUserPreferences();

        const filteredMeals = meals.filter(meal => {
          return (
            !dislikes.some(dislike => meal.ingredients.includes(dislike)) &&
            !allergies.some(allergy => meal.ingredients.includes(allergy)) &&
            (selectPreferences.length === 0 || selectPreferences.includes(meal.type))
          );
        });

        const week1Day1 = filteredMeals.slice(0, 3);
        const week1Day2 = filteredMeals.slice(3, 6);
        const week1Day3 = filteredMeals.slice(6, 9);

        const week2Day1 = filteredMeals.slice(9, 12);
        const week2Day2 = filteredMeals.slice(12, 15);
        const week2Day3 = filteredMeals.slice(15, 18);

        setMealPlan({
          Week1: {
            Day1: week1Day1,
            Day2: week1Day2,
            Day3: week1Day3,
          },
          Week2: {
            Day1: week2Day1,
            Day2: week2Day2,
            Day3: week2Day3,
          },
        });
      } catch (error) {
        console.error('Error fetching meal data:', error);
      }
    };

    fetchMealData();
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleChevronClick = (meal) => {
    onNext(); 
    navigate('/MealNutrients', { state: { meal } });
  };

  return (
    <div className="flex flex-col justify-center items-center mb-10 mt-6 p-6">
      <img
        src={back}
        alt="Back icon"
        style={{ cursor: 'pointer', position: 'absolute', top: 70, left: 10, width: 20, height: 20 }}
        onClick={handleBackClick} 
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
          className={`px-4 py-2 hover:w-[88px] hover:bg-gray-200 hover:text-black rounded-full ${activeWeek === 'Week1' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveWeek('Week1')}
        >
          Week 1
        </button>
        <button
          className={`px-4 py-2 hover:w-[98px] hover:bg-gray-200 hover:text-black rounded-full ${activeWeek === 'Week2' ? 'bg-black text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveWeek('Week2')}
        >
          Week 2
        </button>
      </div>

      <div className="flex flex-col mt-4 pl-12 pr-6">
        {Object.keys(mealPlan[activeWeek]).map(day => (
          <div key={day} className="flex flex-col items-start gap-4 mb-4">
            <h3 className="text-md font-medium">{day}</h3>
            {mealPlan[activeWeek][day]?.length > 0 ? (
              mealPlan[activeWeek][day].map((meal, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center border-gray-100 border-b-2 p-2 w-[390px]"
                >
                  <div className="flex flex-col justify-center items-start">
                    <p>{meal.title}</p>
                    <p className="bg-[#F4F4F4] text-green-500 p-1 rounded">{meal.type}</p>
                  </div>
                  <button
                    onClick={() => handleChevronClick(meal)}
                    className="cursor-pointer"
                  >
                    <img
                      src={chevron}
                      alt="chevron right"
                      className="h-4 w-4"
                    />
                  </button>
                </div>
              ))
            ) : (
              <p className="m-3 text-red-600 w-[360px]">
                No meals found. API call has been exceeded for the day. Try again in 24 hours.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MealSchedule;
