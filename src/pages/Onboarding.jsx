import React, { useEffect, useState } from "react";
import GetStarted from "../Components/GetStarted.jsx";
import AgeAndBMI from "../Components/AgeAndBMI.jsx";
import Dislikes from "../Components/Dislikes.jsx";
import DietSelection from "../Components/DietSelection";
import AllergySelection from "../Components/AllergySelection";
import Navbar from "../Components/Header.jsx";
import Button from "../Components/button.jsx";

const Onboarding = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPage, setShowPage] = useState(false);
  const totalPages = 5;

  useEffect(() => {
    setShowPage(true);
  }, [currentPage]);

  const changeScreen = () => {
    setShowPage(false);
    setTimeout(() => {
      setCurrentPage(currentPage + 1);
    }, 700);
  };

  const backButton = () => {
    console.log("you skipped");
    setShowPage(false);
    setTimeout(() => {
      setCurrentPage(currentPage - 1);
    }, 600);
  };

  const buttonContainerStyles = `
    flex justify-center absolute bottom-4 left-0 right-0 w-full
    transition-opacity duration-700
  `;

  const buttonStyles = `
    w-full max-w-xs
  `;

  return (
    <>
      <div className="flex flex-col items-center justify-around min-h-screen">
        {currentPage > 1 && currentPage <= totalPages && (
          <Navbar
            className={`transition-opacity duration-700 ${
              showPage ? "opacity-100" : "opacity-0"
            }`}
            num_of_page={totalPages - 1}
            current_page={currentPage - 1}
            previous={backButton}
          />
        )}
        <div
          className={`transition-opacity duration-700 ${
            showPage ? "opacity-100" : "opacity-0"
          }`}
        >
          {currentPage === 1 && <GetStarted onNext={changeScreen} />}
          {currentPage === 2 && <AgeAndBMI />}
          {currentPage === 3 && <Dislikes />}
          {currentPage === 4 && <DietSelection />}
          {currentPage === 5 && <AllergySelection />}
        </div>

        {currentPage > 1 && (
          <div className={buttonContainerStyles}>
            <Button
              color={"blue"}
              btnClicked={currentPage < totalPages ? changeScreen : undefined}
              className={`transition-opacity duration-700 ${showPage ? "opacity-100" : "opacity-0"} ${buttonStyles}`}
              to={currentPage === totalPages ? "/signup" : undefined}
            >
              {currentPage === totalPages ? "Finish" : "Next"}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Onboarding;
