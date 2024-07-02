
import React from "react";
import { meals } from "../Data"; // Ensure you have a Meal component to render individual meals

const MealList = ({ categories, meals, onEdit, onDelete }) => {
  return (
    <div>
      <h2>{categories}</h2>
      <ul>
        {meals.map((meal) => (
          <Meal key={meal.id} meal={meal} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </ul>
    </div>
  );
};

export default MealList;
