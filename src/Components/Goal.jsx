import React, { useState, useEffect } from "react";

const Goal = ({ onGoalSelected }) => {
  const goals = [
    { name: "Lose weight" },
    { name: "Maintain weight" },
    { name: "Eat healthy" },
    { name: "Add weight" },
    { name: "Gain muscle" },
  ];

  const [selectedGoal, setSelectedGoal] = useState("");

  const handleGoalSelect = (goalName) => {
    const newGoal = goalName === selectedGoal ? "" : goalName;
    setSelectedGoal(newGoal);
    onGoalSelected(newGoal); 
  };

  useEffect(() => {
    localStorage.setItem("selectedGoal", JSON.stringify(selectedGoal));
  }, [selectedGoal]);

  return (
    <div className="min-h-screen w-screen px-4 flex flex-col justify-center lg:items-center">
      <h2 className="mb-4 mt-10 text-2xl font-bold text-left lg:text-center">
        What is your goal?
      </h2>
      <div className="flex flex-col gap-4 lg:gap-8 mb-10 w-full max-w-md lg:max-w-sm mx-auto">
        {goals.map((goal) => (
          <label
            key={goal.name}
            className={`flex items-center border border-gray-100 rounded-md lg:border-2 p-3 lg:p-5 cursor-pointer`}
            style={{ backgroundColor: goal.name === selectedGoal ? "#BFDBFE" : "" }}
          >
            <input
              type="radio"
              onChange={() => handleGoalSelect(goal.name)}
              checked={goal.name === selectedGoal}
              id={`radio-${goal.name}`}
              className="custom-radio-btn mr-4"
            />
            <span className="font-bold">{goal.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Goal;