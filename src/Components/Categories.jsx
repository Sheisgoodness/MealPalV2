import React from "react";

const CategoryFilter = ({ categories, selectedCategories, toggleCategory }) => {
  return (
    <div className="category-filter">
      <h3 className="font-semibold mb-2">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <label key={category} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => toggleCategory(category)}
              className="form-checkbox"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
