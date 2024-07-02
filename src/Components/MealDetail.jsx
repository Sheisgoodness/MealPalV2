// import React from "react";
import { useParams } from "react-router-dom";
import { meals } from "../Data";


const MealDetail = () => {
  const { id } = useParams();
  const meal = meals.find((meal) => meal.id.toString() === id);

 if (!meal) {
   return (
     <div  className="text-center text-xl font-semibold mt-10">
       Meal not found
     </div>
   );
 }


  
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">{meal.name}</h1>
      {meal.image && (
        <img src={meal.image} alt={meal.name} className="  rounded-md" />
      )}
      {/* <p>CATEGORY: {meal.category.join}</p> */}

      {meal.nutritionalValue && (
        <>
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">
            NUTRITIONAL VALUE
          </h2>
          <ul>
            {meal.nutritionalValue.map((nutrition, index) => (
              <li className="flex justify-between" key={index}>
                <div>{nutrition[0]}</div>
                <div>{nutrition[1]}</div>
              </li>
            ))}
          </ul>
        </>
      )}

      {meal.ingredients && (
        <>
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">
            INGREDIENTS
          </h2>
          <ul className="">
            {meal.ingredients.map((ingredient, index) => (
              <li
                className="flex  justify-between space-y-2  "
                key={index}
              >
                <div className="w-[40%]">{ingredient[0]}</div>
                <div className="flex w-[60%]">
                  <p className="text-start w-full">{ingredient[1]}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {meal.videoTutorial && (
        <>
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">
            VIDEO TUTORIAL
          </h2>
          <a
            href={meal.videoTutorial}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700 underline mt-2 block"
          >
            Watch Tutorial
          </a>
        </>
      )}
    </div>
  );
};





export default MealDetail;
