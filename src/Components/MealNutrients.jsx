import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Frameone from "../assets/Frameone.png";
import reset from "../assets/reset.png";
import servingIcon from "../assets/servingIcon.png";
import bookmark from "../assets/bookmark.png";
import back from "../assets/back.png";

const MealNutrients = () => {
  const navigate = useNavigate();
  const handleIngredientsClick = () => {
    navigate('/Ingredients');
  };

  return (
    <div className="flex flex-col p-6 justify-center items-center">
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
            alt="serving icon"
            className="w-4 h-4"
          />
          <p className="text-[#171717] font-manrope text-xs font-semibold leading-[1.2]">
            1 SERVING
          </p>
        </div>
      </div>
      <div className="flex w-[390px] items-center mt-6 h-[62px] border-b-2 p-4 border-b-gray-100 gap-6">
        <div className="flex p-1 md:p-2 justify-center items-center w-[71px] h-[26px] gap-2 rounded-xl 
            border border-[#4268FB] bg-[#F0F6FF]">
          <p className="text-[#4268FB] text-center font-manrope text-xs font-semibold leading-[1.5]">
            Nutrients
          </p>
        </div>
        <div className="flex p-1 md:p-2 justify-center items-center w-[110px] h-[26px] gap-2 rounded-xl 
             bg-[#F4F4F4] cursor-pointer"
             onClick={handleIngredientsClick}>
          
            <p className="text-center font-manrope text-xs font-semibold leading-[1.5]">
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

      <div className="w-[358px] h-[206px] mt-6 flex-shrink-0 rounded-lg border space-y-4 p-3 border-gray-300 bg-gray-100">
        <div className="flex justify-between h-[22px]">
          <p className="text-gray-900 font-manrope text-base font-normal leading-[1.4]">
            Calories
          </p>
          <p className="text-gray-900 font-manrope font-semibold text-base leading-[1.4]">
            250g
          </p>
        </div>
        <div className="flex justify-between h-[22px]">
          <p className="text-gray-900 font-manrope text-base font-normal leading-[1.4]">
            Total Fat
          </p>
          <p className="text-gray-900 font-manrope font-semibold text-base leading-[1.4]">
            10g
          </p>
        </div>
        <div className="flex justify-between h-[22px]">
          <p className="text-gray-900 font-manrope text-base font-normal leading-[1.4]">
            Protein
          </p>
          <p className="text-gray-900 font-manrope font-semibold text-base leading-[1.4]">
            27g
          </p>
        </div>
        <div className="flex justify-between h-[22px]">
          <p className="text-gray-900 font-manrope text-base font-normal leading-[1.4]">
            Total Carbohydrates
          </p>
          <p className="text-gray-900 font-manrope font-semibold text-base leading-[1.4]">
            12g
          </p>
        </div>
        <div className="flex justify-between h-[22px]">
          <p className="text-gray-900 font-manrope text-base font-normal leading-[1.4]">
            Sugar
          </p>
          <p className="text-gray-900 font-manrope font-semibold text-base leading-[1.4]">
            11g
          </p>
        </div>
      </div>

      <Link to={`/Savedmeal`}>
        <button
          className="font-manrope text-md font-medium mt-10 leading-normal
          flex w-[358px] h-[40px] p-4
         justify-center items-center gap-2 flex-shrink-0 rounded-[8px] text-white border bg-[#4268FB]"
        >
          <img src={bookmark} alt="bookmark icon" />
          Added to bookmark
        </button>
      </Link>
    </div>
  );
};

export default MealNutrients;
