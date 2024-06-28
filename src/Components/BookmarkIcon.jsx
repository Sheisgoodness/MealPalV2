import { useState } from "react";

const BookmarkIcon = ({ filled, onClick }) => {
  const [isClicked, setIsClicked] = useState(filled);

  const handleClick = () => {
    setIsClicked(!isClicked);
    onClick();
  };

  return (
    <div
      className={`w-6 h-6 rounded-md flex items-center justify-center cursor-pointer ${
        isClicked ? "bg-blue-500" : "bg-[#F4F4F4]"
      }`}
      onClick={handleClick}
    >
      {isClicked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="blue"
          viewBox="0 0 24 24"
          stroke="white"
          className="w-5 h-5  "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="blue"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 5v14l7-7 7 7V5a2 2 0 00-2-2H7a2 2 0 00-2 2z"
          />
        </svg>
      )}
    </div>
  );
};

export default BookmarkIcon;
