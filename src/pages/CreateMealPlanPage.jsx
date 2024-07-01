import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import CreateMealPlan from "../Components/CreateMealPlan";
import SelectPreference from "../Components/SelectPreference";
import MealSchedule from "../Components/MealSchedule";
import MealNutrients from "../Components/MealNutrients";
import FeedBackForm from "../Components/FeedBackForm"
import ThankYou from "../Components/ThankYou"
import back from '../assets/back.png';


const CreateMealPlanPage = () => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState("CreateMealPlan");

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <img
        src={back}
        alt="Back icon"
        style={{ cursor: 'pointer', position: 'absolute', top: 70, left: 10, width: 20, height: 20 }}
        onClick={handleBackClick}
      />
      {currentPage === "CreateMealPlan" && <CreateMealPlan onNext={() => handlePageChange("SelectPreference")} />}
      {currentPage === "SelectPreference" && <SelectPreference onNext={() => handlePageChange("MealSchedule")} />}
      {currentPage === "MealSchedule" && <MealSchedule onNext={() => handlePageChange("MealNutrients")} />}
      {currentPage === "MealNutrients" && <MealNutrients onNext={() => handlePageChange("FeedBackForm")} />}
      {currentPage === "FeedBackForm" && <FeedBackForm onNext={() => handlePageChange("ThankYou")}/>}
      {currentPage === "ThankYou" && <ThankYou/>}
    </div>
  );
}

export default CreateMealPlanPage;
