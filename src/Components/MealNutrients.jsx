import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { meals } from './MealData';
import back from '../assets/back.png';

const MealNutrients = () => {
  const [meal, setMeal] = useState(null);
  const [activeTab, setActiveTab] = useState('nutrients');
  const navigate = useNavigate();
  const location = useLocation();
  const mealId = location.state?.meal?.id;

  useEffect(() => {
    if (!mealId) {
      console.error('Meal ID not found');
      return;
    }

    const selectedMeal = meals.find(item => item.id === mealId);
    if (selectedMeal) {
      setMeal(selectedMeal);
    } else {
      console.error('Meal not found');
    }
  }, [mealId]);

  const parseNutritionalValues = (nutritionalValue) => {
    return nutritionalValue.split(', ').map(item => {
      const splitIndex = item.search(/\d/);
      const key = item.substring(0, splitIndex).trim();
      const value = item.substring(splitIndex).trim();
      return { key, value };
    });
  };

  const renderContent = () => {
    if (!meal) {
      return <div>Loading...</div>;
    }

    switch (activeTab) {
      case 'nutrients':
        const nutrients = parseNutritionalValues(meal.nutritionalValue);
        return (
          <div className="w-[358px] h-[auto] flex flex-col mt-6 flex-shrink-0 rounded-lg border space-y-4 p-3 border-gray-300 bg-gray-100">
            <h2 className="text-md font-medium mb-2">Nutritional Value</h2>
            {nutrients.length ? (
              <div className="text-sm flex flex-col">
                {nutrients.map((nutrient, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="font-medium">{nutrient.key}</span>
                    <span className="ml-auto">{nutrient.value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p>No nutritional data available.</p>
            )}
          </div>
        );
      case 'ingredients':
        return (
          <div className="w-[358px] h-[auto] mt-6 flex-shrink-0 rounded-lg border space-y-4 p-3 border-gray-300 bg-gray-100">
            <h2 className="text-md font-medium mb-2">Ingredients</h2>
            {meal.ingredients ? (
              meal.ingredients.split(', ').map((ingredient, index) => (
                <p key={index} className="text-sm">{ingredient}</p>
              ))
            ) : (
              <p>No ingredients data available.</p>
            )}
          </div>
        );
      case 'video':
        return (
          <div className="w-[358px] h-[auto] mt-6 flex-shrink-0 rounded-lg border space-y-4 p-3 border-gray-300 bg-gray-100">
            <h2 className="text-md font-medium mb-2">Video Tutorial</h2>
            {meal.videoTutorial ? (
              <a href={meal.videoTutorial} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">{meal.videoTutorial}</a>
            ) : (
              <p>No video tutorial available.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDoneClick = () => {
    // Define what should happen when the "Done" button is clicked
    console.log('Done button clicked');
  };

  return (
    <div className="flex flex-col p-6 justify-center items-center">
      <img
        src={back}
        alt="Back icon"
        style={{ cursor: 'pointer', position: 'absolute', top: 20, left: 10, width: 20, height: 20 }}
        onClick={handleBackClick}
      />
      {meal && (
        <div className="flex flex-col gap-3 w-[358px] h-[159px]">
          <h1 className="font-manrope text-lg font-semibold leading-normal">
            {meal.title}
          </h1>
          <img
            src={meal.image}
            className="w-[auto] h-[159px] border object-contain rounded-md"
            alt={meal.title}
          />
        </div>
      )}
      <div className="flex mt-4 gap-6">
        {meal && (
          <>
            <div className="inline-flex p-2 items-center gap-2 w-[137px] h-[32px] rounded-md border border-gray-300 bg-gray-50">
              <p className="text-[#171717] font-manrope text-xs font-semibold leading-[1.2]">
                {meal.preparationTime} MINS
              </p>
            </div>
            <div className="inline-flex p-2 items-center gap-2 w-[137px] h-[32px] rounded-md border border-gray-300 bg-gray-50">
              <p className="text-[#171717] font-manrope text-xs font-semibold leading-[1.2]">
                {meal.servings} SERVINGS
              </p>
            </div>
          </>
        )}
      </div>
      <div className="flex w-[390px] items-center mt-6 h-[62px] border-b-2 p-4 border-b-gray-100 gap-6">
        <div
          className={`flex p-1 md:p-2 justify-center items-center w-[71px] h-[26px] gap-2 rounded-xl border ${activeTab === 'nutrients' ? 'border-green-500 bg-[#F0F6FF]' : 'bg-[#F4F4F4]'}`}
          onClick={() => setActiveTab('nutrients')}
        >
          <p className={`text-center font-manrope text-sm font-semibold leading-[1.5] ${activeTab === 'nutrients' ? 'text-green-500' : ''}`}>
            Nutrients
          </p>
        </div>
        <div
          className={`flex p-1 md:p-2 justify-center items-center w-[110px] h-[26px] gap-2 rounded-xl ${activeTab === 'ingredients' ? 'border-green-500 bg-[#F0F6FF]' : 'bg-[#F4F4F4]'}`}
          onClick={() => setActiveTab('ingredients')}
        >
          <p className={`text-center font-manrope text-sm font-semibold leading-[1.5] ${activeTab === 'ingredients' ? 'text-green-500' : ''}`}>
            Ingredients
          </p>
        </div>
        <div
          className={`flex p-1 md:p-2 justify-center items-center w-[130px] h-[26px] gap-2 rounded-xl ${activeTab === 'video' ? 'border-green-500 bg-[#F0F6FF]' : 'bg-[#F4F4F4]'}`}
          onClick={() => setActiveTab('video')}
        >
          <p className={`text-center font-manrope text-xs font-semibold leading-[1.5] ${activeTab === 'video' ? 'text-green-500' : ''}`}>
            How to prepare
          </p>
        </div>
      </div>

      {renderContent()}

      <Link to={`/Savedmeal`}>
        <button
          className="font-manrope text-md font-medium mt-10 leading-normal
          flex w-[358px] h-[40px] p-4
          justify-center items-center gap-2 flex-shrink-0 rounded-[8px]
          text-white border bg-green-700 hover:bg-green-300 hover:w-[358px]"
        >
          Added to bookmark
        </button>
      </Link>

      <Link to={"/FeedBackForm"}>
      <button
        className="font-manrope text-md font-medium mt-3 leading-normal
        flex w-[358px] h-[40px] p-4
        justify-center items-center gap-2 flex-shrink-0 rounded-[8px] border
        text-white bg-green-700 hover:bg-green-300 hover:w-[358px]"
      >
        Done
      </button>
      </Link>
     
    </div>
  );
}

export default MealNutrients;
