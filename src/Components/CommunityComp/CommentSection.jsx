// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useReducer, useRef } from "react";
import avatar from "../../assets/images/6596121.png";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  setDoc,
  collection,
  doc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../../Contexts/PostReducer";
import Comment from "./Comment";
import { formatDistanceToNow } from "date-fns";

// eslint-disable-next-line react/prop-types
const CommentSection = ({ postId }) => {
  const comment = useRef(null);
  const { currentUser } = useContext(AuthContext);
  const commentRef = doc(collection(db, `posts/${postId}/comments`));
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { ADD_COMMENT, HANDLE_ERROR } = postActions;

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const commentValue = e.target.comment.value;
      if (commentValue.trim() !== "") {
        if (!currentUser) {
          throw new Error("User is not authenticated");
        }

        const commentData = {
          comment: commentValue,
          timestamp: serverTimestamp(),
          name: currentUser.displayName || "Anonymous",
          logo: currentUser.photoURL || avatar,
        };

        const commentRef = doc(collection(db, `posts/${postId}/comments`));
        await setDoc(commentRef, commentData);

        e.target.comment.value = "";
      } else {
        // Handle empty comment input
        console.log("Empty comment input");
      }
    } catch (err) {
      dispatch({ type: HANDLE_ERROR });
      alert(err.message);
      console.error(err.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const collectionOfComments = collection(db, `posts/${postId}/comments`);
        const q = query(collectionOfComments, orderBy("timestamp", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          const comments = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              timestamp: formatDistanceToNow(new Date(data.timestamp.seconds * 1000), { addSuffix: true }),
            };
            
          });
          dispatch({
            type: ADD_COMMENT,
            comments: comments,
          });
        });
        return () => unsubscribe();
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.error(err.message);
      }
    };
    getComments();
  }, [postId, ADD_COMMENT, HANDLE_ERROR]);

  return (
    <div className="flex flex-col bg-white w-full py-2 rounded-b-3xl">
      <div className="flex items-center">
        <div className="flex -space-x-1 overflow-hidden">
          <img
            className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
            src={currentUser?.photoURL || avatar}
            alt="User avatar"
          />
        </div>
        <div className="w-full pr-2">
          <form className="flex items-center w-full" onSubmit={addComment}>
            <input
              name="comment"
              type="text"
              placeholder="Write a comment..."
              className="w-full rounded-2xl outline-none border-collapse-0 p-2 bg-gray-100"
              ref={comment}
            ></input>
            <button type="submit" className="hover:w-fit h-fit px-4 py-2 bg-white text-[grey] hover:bg-[grey] hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>{" "}
            </button>
          </form>
        </div>
      </div>
      {state?.comments?.map((comment, index) => {
        return (
          <Comment
            key={index}
            logo={comment?.logo}
            name={comment?.name}
            comment={comment?.comment}
            timestamp={comment?.timestamp}
          ></Comment>
        );
      })}
    </div>
  );
};

export default CommentSection;
