
import React from 'react';
import { useNavigate } from 'react-router-dom';

function MealPlanPoints() {

    // Get the history object from React Router
    const navigate = useNavigate();

    function createMealPlan() {

        // to navigate to the meal plan page
        navigate('/CreateMealPlan');
    }

    
    // function mealHistory() {
    //     // to navigate to the meal history page
    //     navigate('/saved');
    // }

  
    return(
        <>
        
            <div className='flex flex-col justify-center items-center mt-2'>
                <div className="bg-[#F0F6FF]  text-black rounded-xl flex w-[359px] h-[180px] p-3
                 items-center content-center gap-x-4 gap-y-[11px] flex-shrink-0 flex-wrap mt-6">
                    <h1 className="font-manrope text-2xl font-semibold leading-[140%] ">0 Meal Plan</h1>
                    <p className="  font-manrope text-base font-normal leading-[140%] text-[#707070]">
                        Ready for a delicious meal? Earn 20 points per meal.</p>
                    <button onClick={createMealPlan} className="  bg-blue-600 p-1 text-white 
                     hover:bg-blue-200 hover:text-black w-3/6
                     mr-5 flex px-4  py-[7.5px] justify-center items-center rounded-3xl  text-sm font-manrope  ">
                        Create Meal Plan
                        </button>
                    
                </div>
            </div>
            
        </>
    )
}

export default MealPlanPoints;