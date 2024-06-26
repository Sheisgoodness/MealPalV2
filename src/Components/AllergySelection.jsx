import React, { useState, useEffect } from "react";

const AllergySelection = ({ onAllergySelected }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const allergyOptions = [
    { name: "Eggs", description: "Any meal containing eggs" },
    { name: "Seafood", description: "Shrimps, Snails, Crabs" },
    { name: "Nuts", description: "Cashew, Almonds, Hazelnuts, Walnuts" },
    { name: "Lactose", description: "Milk, Butter, Cheese, Ice-cream, Yogurt" },
    { name: "Gluten", description: "Foods such as wheat, barley, oats" },
    { name: "Soy", description: "Soy milk, Soy protein, Soybeans" },
    { name: "Seasame", description: "Bread , Hamburger, Granola" },
    { name: "Sulfite", description: "Apple cider, Alcoholic/non-alcoholic beer, Hot dogs" },
     { name: "Mustard", description: "Pasta, Mashed potatoes, Mussels" },
    { name: "None" },
  ];

  const handleOptionSelect = (optionName) => {
    const newSelectedOptions = selectedOptions.includes(optionName)
      ? selectedOptions.filter((item) => item !== optionName)
      : [...selectedOptions, optionName];
    
    setSelectedOptions(newSelectedOptions);
    onAllergySelected(newSelectedOptions.length > 0); 
  };

  useEffect(() => {
  }, [selectedOptions]);

  return (
    <div className="min-h-screen w-screen px-4 flex flex-col justify-center items-center">
      <h2 className="mb-4 mt-10 text-2xl font-bold text-left w-full lg:text-center">
        Do you have any existing allergies?
      </h2>
      <div className="flex flex-col gap-4 mb-10 w-full max-w-md">
        {allergyOptions.map((option) => (
          <div
            key={option.name}
            className={`flex items-start border border-gray-100 rounded-md lg:border-2 ${
              selectedOptions.includes(option.name) ? "bg-blue-200" : ""
            }`}
          >
            <label className="flex items-center w-full gap-2">
              <button
                onClick={() => handleOptionSelect(option.name)}
                className="py-3 px-4 w-full text-left"
              >
                <span className="font-bold">{option.name}</span>
                {option.description && (
                  <p className="text-sm">{option.description}</p>
                )}
              </button>
              <input
                type="checkbox"
                onChange={() => handleOptionSelect(option.name)}
                checked={selectedOptions.includes(option.name)}
                className="custom-checkbox mr-3"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllergySelection;