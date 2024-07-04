import { useState } from "react";
import { useParams } from "react-router-dom";
import { meals } from "../Data";
import iconButton from "/src/assets/IconButton.png";

const MealDetail = () => {
  const { id } = useParams();
  const meal = meals.find((meal) => meal.id.toString() === id);
  const [searchTerm, setSearchTerm] = useState("");
  const [imageFullScreen, setImageFullScreen] = useState(false);

  if (!meal) {
    return (
      <div className="text-center text-xl font-semibold mt-10">
        Meal not found
      </div>
    );
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredMeals = meals.filter((meal) =>
    meal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for a meal"
          className="p-2 border rounded-md w-full"
        />
        <img src={iconButton} alt="Filter" className="h-8 w-8 cursor-pointer" />
      </div>
      <div className="card bg-gray-100 p-4 rounded">
        <h1 className="text-3xl font-bold text-gray-900">{meal.name}</h1>
        <div className="relative mt-4">
          <img
            src={meal.image}
            alt={meal.name}
            className={`object-cover w-full rounded ${imageFullScreen ? 'fixed top-0 left-0 w-full h-full z-50' : 'h-64'}`}
            onClick={() => setImageFullScreen(!imageFullScreen)}
          />
          {imageFullScreen && (
            <button
              className="absolute top-4 right-4 bg-white p-2 rounded-full"
              onClick={() => setImageFullScreen(false)}
            >
              X
            </button>
          )}
        </div>
        <div className="flex justify-around mt-4 bg-gray-200 p-2 rounded">
          <div className="text-gray-700">🕒 cooking time(1Hr 10 min){meal.cookTime}</div>
          <div className="text-gray-700">🍽️ Meal serving(1){meal.serving}</div>
          <div className="text-gray-700">⭐Meal Rating {meal.rating}</div>
        </div>
      </div>

      {meal.nutritionalValue && (
        <div className="card bg-gray-100 p-4 rounded mt-4">
          <h2 className="text-2xl font-semibold text-gray-700">Nutritional Information</h2>
          <ul className="mt-2">
            {meal.nutritionalValue.map((nutrition, index) => (
              <li className="flex justify-between" key={index}>
                <div>{nutrition[0]}</div>
                <div>{nutrition[1]}</div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {meal.ingredients && (
        <div className="card bg-gray-100 p-4 rounded mt-4">
          <h2 className="text-2xl font-semibold text-gray-700">Ingredients</h2>
          <ul className="mt-2">
            {meal.ingredients.map((ingredient, index) => (
              <li className="flex justify-between space-y-2" key={index}>
                <div className="w-[40%]">{ingredient[0]}</div>
                <div className="flex w-[60%]">
                  <p className="text-start w-full">{ingredient[1]}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {meal.videoTutorial && (
        <div className="card bg-gray-100 p-4 rounded mt-4">
          <h2 className="text-2xl font-semibold text-gray-700">Video Tutorial</h2>
          <div className="flex justify-center mt-2">
            <img
              src={meal.videoThumbnail}
              alt="Video thumbnail"
              className="w-[150px] h-[120px] object-cover rounded"
            />
          </div>
          <a
            href={meal.videoTutorial}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline mt-2 block text-center"
          >
            Watch on YouTube
          </a>
        </div>
      )}

      {filteredMeals.length > 0 && (
        <div className="card bg-gray-100 p-4 rounded mt-4">
          <h2 className="text-2xl font-semibold text-gray-700">Search Results</h2>
          <ul className="mt-2">
            {filteredMeals.map((filteredMeal) => (
              <li
                key={filteredMeal.id}
                className="flex justify-between space-y-2"
              >
                <div className="w-[40%]">{filteredMeal.name}</div>
                <div className="flex w-[60%]">
                  <p className="text-start w-full">
                    {filteredMeal.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MealDetail;
