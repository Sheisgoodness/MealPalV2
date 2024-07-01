import { useState } from "react";
import { useNavigate } from "react-router-dom";
import iconButton from "/src/assets/IconButton.png";
// import Categories from "/src/Components/Categories"
import PropTypes from "prop-types";
import SelectCategory from "/src/Components/Categories";
import  Bookmark   from "/src/assets/bookmark.png";
import { useBookmarks } from "/src/Contexts/BookmarkContext";
import BookmarkIcon from "/src/Components/BookmarkIcon"


const SearchBar = ({ query, setQuery }) => {
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  // const toggleFilterPanel = () => {

  // };

  const toggleFilterPanel = () => {};

  return (
    <div className="flex items-center mb-10">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a meal "
        className="search-bar bg-[#F4F4F4]"
      />
      <img
        src={iconButton}
        alt="Search Icon"
        className=" flex justify-end item-end ml-2 w-9 h-9 cursor-pointer bg-[#F4F4F4]"
        onClick={() => {}}
      />
    </div>
  );
};


SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
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
    if (bookmarks.some((item) => item.name === meal.name)) {
      removeBookmark(meal);
    } else {
      addBookmark(meal);
    }
  };


  const meals = [
    {
      name: "Grilled Salmon with Lemon-Dill Sauce",
      image:
        "https://cdn.pixabay.com/photo/2021/06/21/15/03/salmon-6353898_960_720.jpg",
      categories: ["Popular", "Vegan Only"],
      mealTypes: " morning",
    },
    {
      name: "Lentil and Vegetable Curry",
      image:
        "https://cdn.pixabay.com/photo/2021/06/21/15/03/salmon-6353898_960_720.jpg",
      categories: ["Popular", "Vegan Only"],
      mealTypes: " lunch",
    },
    {
      name: "Mushroom Risotto",
      image:
        "https://cdn.pixabay.com/photo/2021/01/06/13/01/pearl-barley-5894346_960_720.jpg",
      categories: ["Popular", "Vegan", "Non-Vegan"],
      mealTypes: "dinner",
    },
    {
      name: "Grilled Lemon Herb Chicken Bowl",
      image:
        "https://cdn.pixabay.com/photo/2024/02/24/23/22/ai-generated-8594918_960_720.jpg",
      categories: ["Popular", "Vegan", "Non-Vegan"],
      mealTypes: "dinner",
    },
    {
      
      name: "Mexican Ground Beef Tacos",
      image:
        "/src/assets/mexican cuisine images/Mexican Ground Beef Tacos 1.png",
      categories: ["Popular", "Omnivore", "Flexitarian"],
      mealTypes: "morning",
      cuisines: "Mexican",
    },
    {
      name: "Pozole Rojo",
      image: "/src/assets/mexican cuisine images/Pozole Rojo 1.png",
      categories: ["Popular", "Classic"],
      mealTypes: "lunch",
      cuisines: "Mexican",
    },
    {
      name: " Mexican Rice",
      image: "/src/assets/mexican cuisine images/Mexican-Rice-768x994 1.png",
      categories: ["Popular", "Classic"],
      mealTypes: "dinner",
      cuisines: "Mexican",
    },
    {
      name: "  West African Peanut (Groundnut) Soup",
      image:
        "/src/assets/African cuisine images/istockphoto-1432610370-612x612 1.png",
      categories: ["Popular", "LowCarbs"],
      mealTypes: "morning",
      cuisines: "African",
    },
    {
      name: "Catfish Pepper Soup",
      image: "/src/assets/African cuisine images/Catfish Pepper Soup 1.png",
      categories: ["Popular", "Classic", "keto"],
      mealTypes: "lunch",
      cuisines: "African",
    },
    {
      name: "Cameroonian Sese Plantains",
      image: "/src/assets/African cuisine images/image 5.png",
      categories: ["Popular", "Classic", "keto"],
      mealTypes: "dinner",
      cuisines: "African",
    },
    {
      name: "   Moroccan Harira Soup",
      image: "/src/assets/African cuisine images/Moroccan Harira Soup 1.png",
      categories: ["Popular", "Classic", "keto"],
      mealTypes: "morning",
      cuisines: "African",
    },
    {
      name: "Chicken Cabbage Stew",
      image: "/src/assets/African cuisine images/image 5.png",
      categories: ["Popular", "Classic"],
      mealTypes: "lunch",
      cuisines: "African",
    },
    {
      name: "  Scallion Chicken",
      image: "/src/assets/Chinese cuisine images/Scallion Chicken 1.png",
      categories: ["Popular", "Omnivore", "Classic"],
      mealTypes: "dinner",
      cuisines: "Chinese",
    },
    {
      name: "   Chinese Green Beans",
      image: "/src/assets/Chinese cuisine images/g 1.png",
      categories: ["Popular", "Keto", "LowCarbs"],
      mealTypes: "morning",
      cuisines: "Chinese",
    },
    {
      name: "   Chinese Chicken Mancurian",
      image: "/src/assets/Chinese cuisine images/image 2.png",
      categories: ["Popular", "Classic", "Omnivore"],
      mealTypes: "lunch",
      cuisines: "Chinese",
    },
    {
      name: "   Crispy Tofu With Peanut Sauce",
      image: "/src/assets/Chinese cuisine images/image 3.png",
      categories: ["Popular", "Keto", "LowCarbs"],
      mealTypes: "dinner",
      cuisines: "Chinese",
    },

    {
      name: "   Dan Dan Noodles With Shrimps",
      image: "/src/assets/Chinese cuisine images/image 4.png",
      categories: ["Popular", "Keto", "Classic"],
      mealTypes: "morning",
      cuisines: "Chinese",
    },
    {
      name: "   Stacked Beef Enchiladas",
      image: "/src/assets/mexican cuisine images/Stacked Beef Enchiladas 1.png",
      categories: ["Popular", "Classic"],
      mealTypes: "lunch",
      cuisines: "Mexican",
    },
    {
      name: "   Hummus and Falafel",
      image: "/src/assets/recipe4.png",
      categories: ["Popular", "Vegan Only", "Non-Vegan"],
      mealTypes: "dinner",
    },

    // Add more meals as needed
  ];

  const filteredMeals = meals.filter((meal) => {
    

    // Filter by search query
    if (query && !meal.name.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }

    // Filter by dietary options
    if (filters.categories.length > 0) {
      let match = false;
      filters.categories.forEach((option) => {
        if (meal.categories.includes(option)) {
          match = true;
        }
      });
      if (!match) return false;
    }

    // Filter by meal types
    if (
      filters.mealTypes.length > 0 &&
      !filters.mealTypes.includes(meal.mealTypes[2])
    ) {
      return false;
    }

    // Filter by cuisines
    if (
      filters.cuisines.length > 0 &&
      !filters.cuisines.includes(meal.cuisines[3])
    ) {
      return false;
    }

    return true;
  });

  const handleMealClick = (meals) => {
    navigate(`/Recommended/${meals}`);
  };

  return (
    <>
      <h1 className="text-3xl text-black font-Manrope font-bold mt-4 mb-4">
        Recommended Meal Plans
      </h1>

      <SearchBar
        query={query}
        setQuery={setQuery}
        // toggleFilterPanel={toggleFilterPanel}
      />

      {showFilterPanel && (
        <div className="filter-panel bg-white p-4 rounded-md shadow-md mb-4">
        </div>
 )}
 

      
      <div>
        <ul className="flex flex-col gap-2 font-semibold">
          {filteredMeals.map((meal, index) => (
            <li
              key={index}
              className="flex flex-row items-center justify-between"
              onClick={() => handleMealClick(meal.id)}
            >
              <div className="flex gap-2">
                <img
                  src={meal.image}
                  className="w-[80px] h-[80px] object-contain"
                  alt=""
                  loading="lazy"
                />
                <p className="text-lg flex items-start text-black-600 font-Manrope font-semibold">
                  {meal.name}
                </p>
                <div className="flex self-start p-1 gap-6 text-[10px] font-semibold">
                  {meal.categories.map((categories, idx) => (
                    <span
                      key={idx}
                      className={`bg-${
                        categories.includes("Popular")
                          ? "[#F0F6FF]"
                          : "[#FFF0F0]"
                      } p-1 rounded-md`}
                    >
                      {categories}
                    </span>
                  ))}
                </div>
              </div>
              {/* <img
                src={Bookmark ? Bookmark : Bookmark}
                alt="Bookmark Icon"
                className="bookmarkIcon w-6 h-6 cursor-pointer bg-[#F4F4F4] "
                onClick={() => toggleBookmark(meal)}
              /> */}

              <BookmarkIcon
                filled={bookmarks.some((item) => item.name === meal.name)}
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
