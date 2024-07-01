// import React from "react";
import { useParams } from "react-router-dom";
import { meals } from "../Data";


const MealDetail = () => {
  const { id } = useParams();
  const meal = meals.find((meal) => meal.id.toString() === id);

 if (!meal) {
   return <div>Meal not found</div>;
 }


  
  return (
    <div>
      <h1>{meal.name}</h1>
      {meal.image && <img src={meal.image} alt={meal.name} />}
      <p>Category: {meal.category.join}</p>
      {meal.nutritionalValue && (
        <>
          <h2>Nutritional Value</h2>
          <p>{meal.nutritionalValue}</p>
        </>
      )}

      {meal.ingredients && (
        <>
          <h2>Ingredients</h2>
          <ul>
            {meal.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </>
      )}

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





export default MealDetail;
