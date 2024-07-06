import React, { useState } from "react";
import IconButton from "../assets/mexican cuisine images/IconButton.png";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <div className="flex w-full px-4 py-5 items-center gap-4 border-b border-solid border-[#F4F4F4]">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search for a meal"
        className=" flex h-9 px-4 py-2 font-manrope text-sm font-medium leading-[150%] items-center gap-[10px] flex-[1_0_0] focus:outline-none  bg-[#F4F4F4] rounded-lg"
      />

      <img
        src={IconButton}
        alt="Search Icon"
        className="flex w-9 h-9 p-1 justify-center items-center gap-[10px] flex-shrink-0 bg-[#F4F4F4] rounded-lg"
      />
    </div>
  );
};

export default SearchBar;
