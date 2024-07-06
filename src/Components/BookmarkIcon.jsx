import React from "react";
import PropTypes from "prop-types";
import bookmarkIcon from "../assets/mexican cuisine images/bookmark.png";

const BookmarkIcon = ({ filled, onClick }) => {
  return (
    <div onClick={onClick} className="cursor-pointer">
      <img
        src={bookmarkIcon}
        alt="Bookmark Icon"
        width={24}
        height={24}
        className={`inline-block ${
          filled ? "bg-blue-500" : "bg-[#F4F4F4]"
        } fill-current`}
      />
    </div>
  );
};

BookmarkIcon.propTypes = {
  filled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default BookmarkIcon;
