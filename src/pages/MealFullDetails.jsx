import React from "react";
import { IoLogoYoutube } from "react-icons/io5";
import { GiNoodles } from "react-icons/gi";
import { FaClockRotateLeft } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Mealdetails() {
  const [recipeDetail, setRecipeDetail] = useState(null);
  let { id } = useParams();
  const navigate = useNavigate();
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(id);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const getReceipeDetail = fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );

        const [recipeDetailsResponse] = await Promise.all([getReceipeDetail]);

        const recipeDetailData = await recipeDetailsResponse.json();
        setRecipeDetail(recipeDetailData);

        console.log(recipeDetailData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id, apiKey]);

  if (!recipeDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col gap-4 px-6 py-12">
      <button className="text-base" onClick={() => navigate(-1)}>
        <IoIosArrowBack />
      </button>

      <div className="w-full flex items-center">
        <img
          src={recipeDetail.image}
          alt={recipeDetail.title}
          className="w-[100%] h-32 object-cover rounded-lg"
        />
      </div>

      <div className="flex items-center justify-start gap-3 font-semibold text-sm text-left">
        <div className="flex gap-2 border-[#adade6] rounded-md bg-slate-100 px-3 py-2">
          <FaClockRotateLeft />
          <p> {recipeDetail.readyInMinutes} MINS</p>
        </div>

        <div className="flex gap-2 border-[#c9c9cc] rounded-md bg-slate-100 px-3 py-2">
          <GiNoodles />
          <p>{recipeDetail.servings} SERVING </p>
        </div>
      </div>

      <div className="flex flex-col gap-1 bg-[#ebe9e9] rounded-md text-left px-2 py-4">
        <h3 className="font-semibold">INGREDIENTS</h3>
        {recipeDetail?.extendedIngredients.map((ingredient, index) => (
          <div key={`${ingredient?.id}-${index}`} className="text-sm">
            <p>{ingredient.original}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#ebe9e9] p-2 rounded-md">
        <h3 className="text-lg font-semibold">INSTRUCTIONS</h3>
        <p
          className="text-sm text-justify "
          dangerouslySetInnerHTML={{ __html: recipeDetail?.instructions }}
        ></p>
      </div>

      {/* For rendering other details if needed */}

      <div className="">
        <h3 className="font-semibold text-[14px]">VIDEO TUTORIAL</h3>
        <a
          href="https://www.youtube.com"
          className="flex items-center gap-2 bg-[#ebe9e9] border-slate-400 px-2 py-3 rounded-md text-[12px] font-semibold"
        >
          <IoLogoYoutube />
          www.youtube.com/username/videoTutorial
        </a>
      </div>
    </div>
  );
}

export default Mealdetails;
