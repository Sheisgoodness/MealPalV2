import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const navigate = useNavigate();

  useEffect(() => {
    emailjs.init('KYgb0SF17-2P5HPAC');
  }, []);

  const sendFeedback = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_kx1nuvi', 'template_53buy4a', e.target)
      .then((result) => {
        console.log(result.text);

        navigate('/ThankYou');
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className='p-6 space-y-6 w-[390px]'>
      <form id="Feedback-form" className="p-6 space-y-6 w-[390px]" onSubmit={sendFeedback}>
        <h2 className="text-[#101010] font-manrope text-lg font-semibold">
          Share your feedback
        </h2>
        <p className="text-[#171717] font-manrope text-[14px] font-medium leading-[140%]">
          How satisfied are you with the variety of meal options available on the app?
        </p>
        <p className="text-[#777] font-manrope text-sm font-medium leading-[140%]">
          Select from list
        </p>
        <div className="space-y-2 flex flex-col">
          {['Very satisfied', 'Somewhat satisfied', 'Neutral', 'Somewhat dissatisfied', 'Very dissatisfied'].map(option => (
            <label key={option} className="inline-flex items-center gap-2">
              <input type="radio" name="satisfaction" value={option} className="form-radio" />
              <span className="font-manrope text-sm font-normal">{option}</span>
            </label>
          ))}
        </div>
        <p className="text-[#101010] font-manrope text-[14px] font-normal leading-[140%]">
          Please share any additional comments or suggestions to help us improve your experience with MealPal.
        </p>
        <textarea
          name="comments"
          className="w-full h-[117px] p-2 border border-gray-300 rounded-lg"
          placeholder="Write your comment..."
        ></textarea>
        <button
          type="submit"
          className="w-full h-[40px] flex justify-center items-center rounded-lg bg-[#4268FB] text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;