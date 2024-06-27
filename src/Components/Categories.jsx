import React from "react";

// const CategoryFilter = ({ categories, selectedCategories, toggleCategory }) => {
const SelectCategory = () => {
    
  const mealType = ["Quick Meal", "Breakfast", "Lunch", "Dinner"];
  const categories = ["African Cuisine", "Chinese Cuisine", "Mexican Cuisine"];
  // return (
  // // <div className="category-filter">
  // //   <h3 className="font-semibold mb-2">Categories</h3>
  // //   <div className="flex flex-wrap gap-2">
  // //     {categories.map((category) => (
  // //       <label key={category} className="flex items-center space-x-2">
  // //         <input
  // //           type="checkbox"
  // //           checked={selectedCategories.includes(category)}
  // //           onChange={() => toggleCategory(category)}
  // //           className="form-checkbox"
  // //         />
  // //         <span>{category}</span>
  // //       </label>
  //     // ))} 

  //   
      
  return (
         <>
      <h1 className="text-center text-xl my-3 font-medium">Select Meal Type</h1>
      <div className="border-b-[#EAEAEA] border-b py-3">
        {mealType.map((item) => (
          <div className="flex items-center gap-3 p-3" key={item}>
            <input type="checkbox" />
            <span className="text-[#101010] text-md font-medium">{item}</span>
          </div>
        ))}
      </div>
      <h1 className="text-center text-xl my-3 font-medium">Select Category</h1>
      <div className="py-3">
        {categories.map((item) => (
          <div className="flex items-center gap-3 p-3" key={item}>
            <input type="checkbox" />
            <span className="text-[#101010] text-md font-medium">{item}</span>
          </div>
        ))}
      </div>
       <button className="bg-[#4268FB] ml-3 px-6 py-2 cursor-pointer text-white font-normal rounded-md hover:bg-[#4248fb]-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
        Done
      </button>
    </>
  );
};
      

export default SelectCategory;
{/* export default CategoryFilter; */}
