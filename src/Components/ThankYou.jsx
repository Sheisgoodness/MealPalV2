import React from 'react';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate('/home');
  };

  return (
    <div className='p-6 space-y-6 w-[390px]'>
      <h2 className="text-[#101010] font-manrope text-lg font-semibold">
        Thank You!
      </h2>
      <p className="text-[#171717] font-manrope text-[14px] font-medium leading-[140%]">
        Thank you for your feedback. We appreciate your input and will use it to improve our services.
      </p>
      <button
        type="button"
        onClick={handleClose}
        className="w-full h-[40px] flex justify-center items-center rounded-lg bg-[#4268FB] text-white"
      >
        Close
      </button>
    </div>
  );
};

export default ThankYou;