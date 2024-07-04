import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div className='flex flex-col items-center justify-top mt-20 h-screen'>
      <div className='w-[390px] p-6 bg-white shadow-md rounded-lg'>
      <h2 className="text-[#101010] font-manrope text-lg font-semibold">
        Thank You!
      </h2>
      <p className="text-[#171717] font-manrope text-[14px] font-medium leading-[140%]">
        Thank you for your feedback. We appreciate your input and will use it to improve our services.
      </p>
      <button
        type="button"
        onClick={handleClose}
        className="w-[348px] h-[40px] flex justify-center mt-10 items-center rounded-lg
         bg-green-700 hover:bg-green-300 text-white hover:w[358px]"
      >
        Close
      </button>
      </div>
    </div>
  );
};

export default ThankYou;