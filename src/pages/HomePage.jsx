import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import homepage from "../assets/homepage.png";
import fetchMeals from "../loadData";
import SearchBar from "../Components/SearchBar";
import recommend from "../assets/recommend.png";
import { meals as initialMeals } from "../Data"; // Ensure this points to the correct data source

function HomePage() {
  const [meals, setMeals] = useState(initialMeals); // Initialize with initialMeals
  const [filteredMeals, setFilteredMeals] = useState([]); // Initialize as empty array
  const [offset, setOffset] = useState(0);

  const handleLoadMore = () => {
    setOffset((prevOffset) => prevOffset + 1);
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredMeals([]);
      return;
    }

    const filtered = meals.filter(
      (meal) =>
        meal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeals(filtered);
  };

  return (
    <div className="p-6 lg:ml-28 lg:mr-28">
      <SearchBar onSearch={handleSearch} />
      <div
        className={`w-full h-44 lg:h-96 flex items-end mt-5
         p-4 rounded shrink-0 bg-no-repeat overflow-hidden`}
        style={{
          background: `url(${homepage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <h2 className="text-[#101010] text-base font-bold p-4">
        Recommended Meal Plans
      </h2>

      <div className="w-full flex flex-col items-center gap-2">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((singleMeal, index) => (
            <div
              className="flex items-center gap-2 overflow-hidden w-full"
              key={`${singleMeal.id}-${index}`}
            >
              <div className="w-[100px] h-[120px] overflow-hidden shrink-0">
                <img
                  src={singleMeal.image}
                  className="w-[100px] h-[130px] object-contain rounded-lg"
                  alt={singleMeal.name}
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col gap-1 items-start flex-shrink flex-1">
                <Link
                  to={`/preview/${singleMeal.id}`}
                  className="hover:text-slate-500"
                >
                  <p
                    className="font-semibold text-[13px] line-clamp-1
                   md:text-[15px] lg:text-[20px]"
                  >
                    {singleMeal.name}
                  </p>
                </Link>
                <div
                  className="flex gap-3 items-center justify-start
                 text-[12px] md:text-[15px] text-nowrap flex-wrap"
                >
                  <div className="flex items-center gap-[11px]">
                    <span className="bg-[#F0F6FF] rounded-md px-2 py-1">
                      {singleMeal.category}
                    </span>
                  </div>
                  <div className="flex p-1 justify-center items-center gap-1 rounded-md bg-[#CDFFCB]">
                    <img
                      src={recommend}
                      alt="recommend Icon"
                      className="h-4 w-4"
                    />
                    <span>Recommended</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="m-3 text-red-600">
            No meals found. Please enter a search term to find meals.
          </p>
        )}
      </div>

      <button
        onClick={handleLoadMore}
        style={{ display: filteredMeals.length === 0 ? "none" : "block" }}
        className="border border-green-700 text-black
         bg-white px-4 py-1 w-[80%] md:w-[50%] lg:w-[40%]
          rounded-md my-6"
      >
        Load More
      </button>
      <div className="inline-flex py-4 gap-4 justify-center content-center">
        <Link to={`/CreateMealPlan`}>
          <button
            type="btn"
            className="px-2 py-1 border  
              hover:bg-[#CDFFCB] hover:text-black
               bg-green-700 text-white rounded-3xl 
               text-sm h-10 w-40"
          >
            Create Meal Plan
          </button>
        </Link>
        <Link to={`/mealhistory`}>
          <button
            type="btn"
            className="px-2 py-1 border border-green-700
             text-black hover:bg-green-200
              hover:text-black  rounded-3xl text-sm h-10 w-40"
          >
            Meal History
          </button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
