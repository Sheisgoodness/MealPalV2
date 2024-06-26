import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Frameone from "../assets/Frameone.png";
import reset from "../assets/reset.png";
import servingIcon from "../assets/servingIcon.png";
import bookmark from "../assets/bookmark.png";
import back from "../assets/back.png";


const Ingredients = () => {
    const navigate = useNavigate();
    const handleNutrientsClick = () => {
      navigate('/MealNutrients');
    };

return(
<div className="flex flex-col justify-center items-center mb-10 mt-6">
<img
        src={back}
        alt="Back"
        style={{ cursor: 'pointer', position: 'absolute', top: 70, left: 10, width: 20, height: 20 }}
        onClick={() => navigate(-1)}
      />

    <div className="flex flex-col gap-3 w-[358px] h-[159px]">
    <h1 className="font-manrope text-lg font-semibold leading-normal">
          Cabbage Stir Fry
        </h1>
        <img
          src={Frameone}
          alt="food image"
          className="rounded rounded-t-md"
        />
      </div>
      <div className="flex mt-4 gap-6">
        <div className="inline-flex p-2 items-center gap-2 w-[137px] h-[32px]
             rounded-md border border-gray-300 bg-gray-50">
          <img
            src={reset}
            alt="reset icon"
            className="w-4 h-4"
          />
          <p className="text-[#171717] font-manrope text-xs font-semibold leading-[1.2]">
            1 HOUR , 10 MINS
          </p>
        </div>
        <div className="inline-flex p-2 items-center gap-2 w-[137px] h-[32px]
             rounded-md border border-gray-300 bg-gray-50">
          <img
            src={servingIcon}
            alt="reset icon"
            className="w-4 h-4"
          />
          <p className="text-[#171717] font-manrope text-xs font-semibold leading-[1.2]">
            1 SERVING
          </p>
        </div>
      </div>
      <div className="flex w-[390px] items-center mt-6 h-[62px] border-b-2 p-4 border-b-gray-100 gap-6">
        <div className="flex p-1 md:p-2 justify-center items-center w-[71px] h-[26px] gap-2 rounded-xl 
              bg-[#F4F4F4] cursor-pointer"
              onClick={handleNutrientsClick}>
          <p className=" text-center font-manrope text-xs font-semibold leading-[1.5]">
            Nutrients
          </p>
        </div>
        <div className="flex p-1 md:p-2 justify-center items-center w-[110px] h-[26px] gap-2 rounded-xl 
             bg-[#F0F6FF] border border-[#4268FB]">
                
                <p className="text-center text-[#4268FB] font-manrope text-xs font-semibold leading-[1.5]">
            Ingredients
          </p>
              
        </div>
        <div className="flex p-1 md:p-2 justify-center items-center w-[130px] h-[26px] gap-2 rounded-xl 
             bg-[#F4F4F4]">
          <p className="text-center font-manrope text-xs font-semibold leading-[1.5]">
            How to prepare it
          </p>
        </div>
      </div>
      <div className="p-2 mt-6">
        <h1 className="text-gray-900 text-start font-manrope text-base font-bold leading-[1.4] uppercase">
            Ingredients
            </h1>
            <div className="mt-6">
                <p className="text-gray-900 font-manrope pb-4 text-sm font-semibold leading-[1.4]">
                    Marinade
                    </p>
                    <ol className="list-disc space-y-2 pl-4">
                        <li>1 tablespoon canola or olive oil</li>
                        <li>1 tablespoon chopped fresh dill weed</li>
                        <li>1 teaspoon grated lemon peel</li>
                        <li>3 tablespoons lemon juice</li>
                        <li>2 tablespoons Honey</li>
                        <li>1/2 teaspoon garlic-pepper blend</li>
                        <li>1 lb Salmon fillets, cut into 4 pieces of 4oz each</li>
                    </ol>
            </div>
      </div>
      <Link to={`/FeedbackForm`}>
        <button
          className="font-manrope text-md font-medium mt-10 leading-normal
          flex w-[358px] h-[40px] p-4
         justify-center items-center gap-2 flex-shrink-0 rounded-[8px] border text-white bg-[#4268FB]"
        >
           <img src={bookmark} alt="bookmark icon" />
           Added to bookmark
        </button>
      </Link>
    </div>
);
};

export default Ingredients;