import { createContext, useState, useContext } from "react";

const BookmarkContext = createContext();

export const useBookmarks = () => useContext(BookmarkContext);

export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  const addBookmark = (meal) => {
    setBookmarks((prevBookmarks) => {
      if (!prevBookmarks.some((item) => item.name === meal.name)) {
        return [...prevBookmarks, meal];
      }
      return prevBookmarks;
    });
  };

  const removeBookmark = (meal) => {
    setBookmarks((prevBookmarks) =>
      prevBookmarks.filter((item) => item.name !== meal.name)
    );
  };

  return (
    <BookmarkContext.Provider
      value={{ bookmarks, addBookmark, removeBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
};
export default BookmarkContext;
