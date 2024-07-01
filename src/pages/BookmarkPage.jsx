// import React from "react";
import { useBookmarks } from "/src/Contexts/BookmarkContext";
import DeleteIcon from "/src/assets/images/delete.png";
import "/src/App.css"

const BookmarkPage = () => {
  const { bookmarks, removeBookmark } = useBookmarks();

  return (
    <div>
      <h1 className="text-3xl text-black font-Manrope font-bold mt-4 mb-4">
        Bookmarked Meals
      </h1>
      {bookmarks.length === 0 ? (
        <p>No bookmarks yet.</p>
      ) : (
        <ul className="flex flex-col gap-2 font-semibold">
          {bookmarks.map((meal, index) => (
            <li
              key={index}
              className="flex flex-row items-center justify-between"
            >
              <div className="flex gap-2">
                <img
                  src={meal.image}
                  className="w-[80px] h-[80px] object-contain"
                  alt=""
                  loading="lazy"
                />
                <p className="text-lg flex items-start text-black-600 font-Manrope font-semibold">
                  {meal.name}
                </p>
              </div>
              <img
                src={DeleteIcon}
                alt="Delete Icon"
                className="deleteIcon w-6 h-6 cursor-pointer bg-[#F4F4F4]"
                onClick={() => removeBookmark(meal)}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarkPage;
