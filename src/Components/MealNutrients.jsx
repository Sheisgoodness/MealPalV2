import  { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import back from '../assets/back.png';

const MealNutrients = () => {
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [activeTab, setActiveTab] = useState('nutrients');
  const navigate = useNavigate();
  const location = useLocation();
  const { meal } = location.state;

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=${apiKey}`
        );
        const recipeDetailData = await response.json();
        setRecipeDetail(recipeDetailData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [apiKey, meal.id]);

  const renderContent = () => {
    if (!recipeDetail) {
      return <div>Loading...</div>;
    }

    switch (activeTab) {
      case 'nutrients':
        return (
          <div className="w-[358px] h-[206px] mt-6 flex-shrink-0 rounded-lg border space-y-4 p-3 border-gray-300 bg-gray-100">
            <h2 className="text-md font-medium mb-2">Nutrients</h2>
            {recipeDetail.nutrition.nutrients.map((nutrient, index) => (
              <p key={index} className="text-sm">{nutrient.title}: {nutrient.amount} {nutrient.unit}</p>
            ))}
          </div>
        );
      case 'ingredients':
        return (
          <div className="w-[358px] h-[206px] mt-6 flex-shrink-0 rounded-lg border space-y-4 p-3 border-gray-300 bg-gray-100">
            <h2 className="text-md font-medium mb-2">Ingredients</h2>
            {recipeDetail.extendedIngredients.map((ingredient, index) => (
              <p key={index} className="text-sm">{ingredient.original}</p>
            ))}
          </div>
        );
      case 'preparation':
        return (
          <div className="w-[358px] h-[206px] mt-6 flex-shrink-0 rounded-lg border space-y-4 p-3 border-gray-300 bg-gray-100">
            <h2 className="text-md font-medium mb-2">How to prepare it</h2>
            {recipeDetail.analyzedInstructions.length > 0 ? (
              recipeDetail.analyzedInstructions[0].steps.map((step, index) => (
                <p key={index} className="text-sm">{index + 1}. {step.step}</p>
              ))
            ) : (
              <p className="text-sm">No instructions available.</p>
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
      {recipeDetail && (
        <div className="flex flex-col gap-3 w-[358px] h-[159px]">
          <h1 className="font-manrope text-lg font-semibold leading-normal">
            {recipeDetail.title}
          </h1>
          <img
            src={recipeDetail.image}
            className="w-[60px] h-[60px] object-contain rounded-md"
            alt={recipeDetail.title}
          />
        </div>
      )}
      <div className="flex mt-4 gap-6">
        {recipeDetail && (
          <>
            <div className="inline-flex p-2 items-center gap-2 w-[137px] h-[32px] rounded-md border border-gray-300 bg-gray-50">
              <p className="text-[#171717] font-manrope text-xs font-semibold leading-[1.2]">
                {recipeDetail.readyInMinutes} MINS
              </p>
            </div>
            <div className="inline-flex p-2 items-center gap-2 w-[137px] h-[32px] rounded-md border border-gray-300 bg-gray-50">
              <p className="text-[#171717] font-manrope text-xs font-semibold leading-[1.2]">
                {recipeDetail.servings} SERVINGS
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
          className={`flex p-1 md:p-2 justify-center items-center w-[130px] h-[26px] gap-2 rounded-xl ${activeTab === 'preparation' ? 'border-green-500 bg-[#F0F6FF]' : 'bg-[#F4F4F4]'}`}
          onClick={() => setActiveTab('preparation')}
        >
          <p className={`text-center font-manrope text-xs font-semibold leading-[1.5] ${activeTab === 'preparation' ? 'text-green-500' : ''}`}>
            How to prepare it
          </p>
        </div>
      </div>

      {renderContent()}

      <Link to={`/Savedmeal`}>
        <button
          className="font-manrope text-md font-medium mt-10 leading-normal
          flex w-[358px] h-[40px] p-4
         justify-center items-center gap-2 flex-shrink-0 rounded-[8px]
          text-white border bg-green-700 hover:bg-green-300"
        >
          Added to bookmark
        </button>
      </Link>

      <button
        onClick={handleDoneClick}
        className="font-manrope text-md font-medium mt-10 leading-normal
        flex w-[358px] h-[40px] p-4
        justify-center items-center gap-2 flex-shrink-0 rounded-[8px] border text-white bg-green-700 hover:bg-green-300"
      >
        Done
      </button>
    </div>
  );
}

export default MealNutrients;
