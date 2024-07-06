import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconButton from "../assets/mexican cuisine images/IconButton.png";
import PropTypes from "prop-types";
import SelectCategory from "../Components/Categories";
import { useBookmarks } from "../Contexts/BookmarkContext";
import BookmarkIcon from "../Components/BookmarkIcon";
import { meals } from "../Data";

const SearchBar = ({ query, setQuery, toggleFilterPanel }) => {
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="flex items-center mb-10">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a meal"
        className="search-bar bg-[#F4F4F4]"
      />
      <img
        src={iconButton}
        alt="Search Icon"
        className="flex justify-end items-end ml-2 w-9 h-9 cursor-pointer bg-[#F4F4F4]"
        onClick={toggleFilterPanel}
      />
    </div>
  );
};

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  toggleFilterPanel: PropTypes.func.isRequired,
};

const RecommendedMealPlans = () => {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    categories: [],
    mealTypes: [],
    cuisines: [],
  });

  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();
  const navigate = useNavigate();

  const toggleFilterPanel = () => {
    setShowFilterPanel(!showFilterPanel);
  };

  const toggleFilter = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
        ? prevFilters[filterType].filter((item) => item !== value)
        : [...prevFilters[filterType], value],
    }));
  };

  const toggleBookmark = (meal) => {
    if (bookmarks.some((item) => item.id === meal.id)) {
      removeBookmark(meal)
        .then(() => console.log("Bookmark removed successfully"))
        .catch((error) => console.error("Error removing bookmark:", error));
    } else {
      addBookmark(meal)
        .then(() => console.log("Bookmark added successfully"))
        .catch((error) => console.error("Error adding bookmark:", error));
    }
  };

  const filteredMeals = meals.filter((meal) => {
    if (query && !meal.name.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    if (filters.categories.length > 0) {
      let match = false;
      filters.categories.forEach((option) => {
        if (meal.categories.includes(option)) {
          match = true;
        }
      });
      if (!match) return false;
    }

    if (
      filters.mealTypes.length > 0 &&
      !filters.mealTypes.includes(meal.mealTypes[2])
    ) {
      return false;
    }

    if (
      filters.cuisines.length > 0 &&
      !filters.cuisines.includes(meal.cuisines[3])
    ) {
      return false;
    }

    return true;
  });

  const handleMealClick = (id) => {
    navigate(`/mealdetails/${id}`);
  };

  return (
    <>
      <h1 className="text-3xl text-black font-Manrope font-bold mt-4 mb-4">
        Recommended Meal Plans
      </h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        toggleFilterPanel={toggleFilterPanel}
      />

      {showFilterPanel && (
        <div className="filter-panel bg-white p-4 rounded-md shadow-md mb-4">
          <SelectCategory filters={filters} toggleFilter={toggleFilter} />
        </div>
      )}

      <div>
        <ul className="flex flex-col gap-2 font-semibold">
          {filteredMeals.map((meal, index) => (
            <li
              key={index}
              className="flex flex-row items-center justify-between"
            >
              <div
                className="flex gap-2 cursor-pointer items-center"
                onClick={() => handleMealClick(meal.id)}
              >
                <img
                  src={meal.image}
                  className="w-[80px] h-[80px] object-contain"
                  alt=""
                  loading="lazy"
                  onError={(e) => {
                    console.log("Image failed to load: ", e.target.src);
                    e.target.src = required(
                      "../assets/defaultMealImage.png"
                    ).default;
                  }}
                />
                <div>
                  <p className="text-lg flex items-start text-black-600 font-Manrope font-semibold">
                    {meal.name}
                  </p>
                  <div className="flex self-start p-1 gap-6 text-[10px] font-semibold">
                    <span
                      className={`bg-${
                        meal.category.includes("Popular")
                          ? "blue-200"
                          : "gray-200"
                      } p-1 rounded-md`}
                    >
                      {meal.category}
                    </span>
                  </div>
                </div>
              </div>

              <BookmarkIcon
                filled={bookmarks.some((item) => item.id === meal.id)}
                onClick={() => toggleBookmark(meal)}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default RecommendedMealPlans;
