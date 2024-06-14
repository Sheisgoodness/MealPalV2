import React, { useState } from "react";

const AllergySelection = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const allergyOptions = [
    { name: "Eggs", description: "Any meal containing eggs" },
    { name: "Seafood", description: "Shrimps, Snails, Crabs" },
    { name: "Nuts", description: "Cashew, Almonds, Hazelnuts, Walnuts" },
    { name: "Lactose", description: "Milk, Butter, Cheese, Ice-cream, Yogurt" },
    { name: "Gluten", description: "Foods such as wheat, barley, oats" },
  ];

  const handleOptionSelect = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(item => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="min-h-screen w-screen px-4 flex flex-col justify-center lg:items-center">
      <h2 className="mb-4 mt-8 text-xl font-bold text-left lg:text-center">
        Do you have any existing allergies?
      </h2>
      <div className="flex flex-col gap-2 lg:gap-4 mb-6 max-w-md">
        {allergyOptions.map((option) => (
          <div
            key={option.name}
            className={`flex items-start border border-gray-100 rounded-md lg:border-2`}
            style={{ backgroundColor: selectedOptions.includes(option.name) ? "#BFDBFE" : "" }}
          >
            <label className="flex items-center w-full gap-2">
              <button
                onClick={() => handleOptionSelect(option.name)}
                className={`py-2 px-3 w-full text-left`}
                style={{ backgroundColor: selectedOptions.includes(option.name) ? "#BFDBFE" : "" }}
              >
                <div>
                  <span className="font-bold">{option.name}</span>
                  <p className="text-sm mt-1">{option.description}</p>
                </div>
              </button>
              <input
                type="checkbox"
                onChange={() => handleOptionSelect(option.name)}
                checked={selectedOptions.includes(option.name)}
                id={`checkbox-${option.name}`}
                className="custom-checkbox mr-2"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllergySelection;
