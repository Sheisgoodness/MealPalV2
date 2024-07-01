// import React from "react";
import { useParams } from "react-router-dom";
import { meals } from "/src/Data/index.js";


const MealDetail = () => {
  const { mealId } = useParams();
  const meal = meals.find((meal) => meal.id.toString() === mealId);

 if (!meal) {
   return <div>Meal not found</div>;
 }


  
  return (
    <div>
      <h1>{meal.name}</h1>
      {meal.image && <img src={meal.image} alt={meal.name} />}
      <p>Category: {meal.category}</p>
      {meal.nutritionalValue && (
        <>
          <h2>Nutritional Value</h2>
          <p>{meal.nutritionalValue}</p>
        </>
      )}
      
        {/* {
           {meal.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))} */}


        {meal.ingredients && (
          <>
            <h2>Ingredients</h2>
            <p>{meal.ingredients}</p>
          </> ) }
        
      
      {meal.videoTutorial && (
        <>
          <h2>Video Tutorial</h2>
          <a
            href={meal.videoTutorial}
            target="_blank"
            rel="noopener noreferrer"
          >
            Watch Tutorial
          </a>
        </>
      )}
    </div>
  );
};



//     <div>
//       <h1>{meal.name}</h1>
//       <img src={meal.image} alt={meal.name} />
//       <p>Categories: {meal.category.join(", ")}</p>
//       <p>Meal Types: {meal.mealTypes}</p>
//       <p>cuisines: {meal.cuisines}</p>
//     </div>
//   );
// };

export default MealDetail;
