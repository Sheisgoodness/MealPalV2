import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MealListing from "../Components/MealListing";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";



function Preview() {
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [similarRecipes, setSimilarRecipes] = useState(null);
  const navigate = useNavigate();


  let { id } = useParams();
  const apiKey = process.env.REACT_APP_API_KEY;

  console.log(id);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const getReceipeDetail = fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );
        const getSimilarReceipes = fetch(
          `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}&number=3`
        );
        const [recipeDetailsResponse, similarRecipesResponse] =
          await Promise.all([getReceipeDetail, getSimilarReceipes]);

        const recipeDetailData = await recipeDetailsResponse.json();
        const similarRecipesData = await similarRecipesResponse.json();

        setRecipeDetail(recipeDetailData);
        setSimilarRecipes(similarRecipesData);

        console.log(recipeDetailData, similarRecipesData);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipeDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-3 px-4 py-12">
      <button className="text-base" onClick={() => navigate(-1)}>
        <IoIosArrowBack />
      </button>

      <div className="w-full flex flex-col items-center gap-2 ">
        <img
          src={recipeDetail.image}
          alt={recipeDetail.title}
          className="w-[100%] h-32 object-cover rounded-lg"
        />

        <h2 className="flex items-center justify-start text-[#101010] text-base font-semibold">
          {recipeDetail.title}
        </h2>

        <div className=" flex items-center justify-start gap-2 font-semibold text-sm ">
          <span className="bg-[#F0F6FF] rounded-md px-2 py-1">Popular</span>
          <span className="bg-[#FFF0F0] rounded-md px-2 py-1">
            2 weeks plan
          </span>
        </div>

        <p
          className="text-sm line-clamp-4 text-justify md:text-base"
          dangerouslySetInnerHTML={{ __html: recipeDetail?.summary }}
        ></p>

        <div className="flex flex-wrap gap-2 text-sm font-semibold">
          {recipeDetail?.extendedIngredients.map((ingredient, index) => (
            <div
              key={`${ingredient?.id}-${index}`}
              className="flex flex-wrap gap-1 bg-[#dde0e7] border-[#d1dae7] rounded-md px-2 py-1"
            >
              <p>{ingredient.name}</p>
              <p>
                {ingredient.amount} {ingredient.unit}
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr />

      <div>
        <MealListing meals={similarRecipes} />
      </div>

      <div className="flex align-center justify-center gap-2 ">
        <Link to= '/savedmeal'>
        <button
          type="btn"
          className="px-2 py-1 bg-[#4268FB] text-white rounded-md text-sm"
        >
          Add to bookmark
        </button>
        </Link>

        <button
          type="btn"
          className="px-10 py-2 bg-[#777777] text-white rounded-md text-sm"
        >
          Share
        </button>
      </div>
    </div>
  );
}
export default Preview;

/* 

https://api.spoonacular.com/recipes/${id}/similar?apiKey=${apiKey}&number=3

interface Recipe {
    id: number;
    imageType: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    title: string;
}


*/

/* 

https://api.spoonacular.com/recipes/{id}/information?apiKey=f29fa4d13d854421a167ec7b23670eaf



    interface RecipeResponse {
    vegetarian: boolean;
    vegan: boolean;
    glutenFree: boolean;
    dairyFree: boolean;
    veryHealthy: boolean;
    cheap: boolean;
    veryPopular: boolean;
    sustainable: boolean;
    lowFodmap: boolean;
    weightWatcherSmartPoints: number;
    gaps: string;
    preparationMinutes: number;
    cookingMinutes: number;
    aggregateLikes: number;
    healthScore: number;
    creditsText: string;
    sourceName: string;
    pricePerServing: number;
    extendedIngredients: {
        id: number;
        aisle: string;
        image: string;
        consistency: string;
        name: string;
        nameClean: string;
        original: string;
        originalName: string;
        amount: number;
        unit: string;
        meta: string[];
        measures: {
            us: {
                amount: number;
                unitShort: string;
                unitLong: string;
            };
            metric: {
                amount: number;
                unitShort: string;
                unitLong: string;
            };
        };
    }[];
    id: number;
    title: string;
    readyInMinutes: number;
    servings: number;
    sourceUrl: string;
    image: string;
    imageType: string;
    taste: {
        sweetness: number;
        saltiness: number;
        sourness: number;
        bitterness: number;
        savoriness: number;
        fattiness: number;
        spiciness: number;
    };
    summary: string;
    cuisines: string[];
    dishTypes: string[];
    diets: string[];
    occasions: string[];
    winePairing: {
        pairedWines: string[];
        pairingText: string;
        productMatches: any[];
    };
    instructions: string;
    analyzedInstructions: {
        name: string;
        steps: {
            number: number;
            step: string;
            ingredients: {
                id: number;
                name: string;
                localizedName: string;
                image: string;
            }[];
            equipment: {
                id: number;
                name: string;
                localizedName: string;
                image: string;
            }[];
        }[];
    }[];
    originalId: number | null;
    spoonacularScore: number;
    spoonacularSourceUrl: string;
}
*/
