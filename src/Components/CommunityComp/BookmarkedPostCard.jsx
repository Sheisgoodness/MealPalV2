import React, { useContext, useEffect, useReducer, useState } from "react";
import avatar from "../../assets/images/6596121.png";
import like from "../../assets/images/love.png";
import comment from "../../assets/images/comment.png";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../../Contexts/PostReducer";
import {
  doc,
  setDoc,
  collection,
  query,
  onSnapshot,
  where,
  getDocs,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
import { auth, db, onAuthStateChanged } from "../../firebase/firebase";
import CommentSection from "./CommentSection";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const BookmarkedPostCard = ({ id, name, logo, email, text, image, timestamp, getBookmarks }) => {
  const { currentUser, userData } = useContext(AuthContext);
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const likesRef = doc(collection(db, "posts", id, "likes"));
  const likesCollection = collection(db, "posts", id, "likes");
  const { ADD_LIKE, HANDLE_ERROR } = postActions;
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  function toggleShowOption() {
    setShowOptions(prevShowOptions => !prevShowOptions);
    console.log(currentUser)
  }
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen((prevOpen) => !prevOpen); // Toggle the open state
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const q = query(likesCollection, where("id", "==", currentUser?.uid));
    const querySnapshot = await getDocs(q);
    const likesDocId = await querySnapshot?.docs[0]?.id;
    try {
      if (likesDocId !== undefined) {
        const deleteId = doc(db, "posts", id, "likes", likesDocId);
        await deleteDoc(deleteId);
      } else {
        await setDoc(likesRef, {
          id: currentUser?.uid,
        });
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getLikes = async () => {
      try {
        const q = collection(db, "posts", id, "likes");
        await onSnapshot(q, (doc) => {
          dispatch({
            type: ADD_LIKE,
            likes: doc.docs.map((item) => item.data()),
          });
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    };
    const getComments = async () => {
      try {
        const commentsQuery = collection(db, "posts", id, "comments");
        await onSnapshot(commentsQuery, (doc) => {
          setComments(doc.docs.map((item) => item.data()));
        });
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        alert(err.message);
        console.log(err.message);
      }
    };
    getLikes();
    getComments();
  }, [ADD_LIKE, HANDLE_ERROR, id]);

  // const bookmarkPost = () => {

  //   onAuthStateChanged(auth, u => {
  //     console.log("u", u.uid);
  //     console.log("Post", id);
  //     const bookmark = collection(db, "bookmarks");
  //     addDoc(bookmark, {
  //       post: id,
  //       user: u.uid
  //     });
  //   });

  // }

  const copyLink = () => {
    navigator.clipboard.writeText(`${location.origin}/communitypage/${id}`);
    toast.success("Link copied");
    toggleShowOption();
  }

  const commentCount = comments.length;

  const handleNavigateToProfile = () => {
    console.log("Navigating to user profile page");
    navigate("/profile");
  };

  const deleteBookmark = () => {
    onAuthStateChanged(auth, async (u) => {

      const bookmarks = collection(db, "bookmarks");
      const document = query(bookmarks, where("post", "==", id), where("user", "==", u.uid));
      const result = await getDocs(document);

      for(let docRef of result.docs) {
        await deleteDoc(docRef.ref);
      }
      
      toggleShowOption();
      getBookmarks();
      toast.success("Bookmark removed successfully");
    });
  }

  return (
    <div className="relative">
      <div className="my-6 border border-[#F1F1F1] rounded-md p-3 shadow-neutral-300">
        <div className="flex gap-2 items-center" onClick={handleNavigateToProfile}>
          <img className="object-cover rounded-full object-center w-[50px] h-[50px]" src={logo || avatar} alt="user photo" />
          <div>
            <h4 className="font-medium truncate max-w-[180px] text-md text-[#101010]">{name}</h4>
            <p className="text-[#504F4F] text-[14px]">{timestamp}</p>
          </div>
        </div>
        <p className="text-[#272727] font-normal text-[16px] leading-6 my-3">{text}</p>
        {image &&
          <div className="w-full rounded-lg">
            <img className="w-full h-[150px] object-cover object-center rounded-lg" src={image} alt="food" />
          </div>
        }
        <div className="flex items-center justify-between mt-7 mb-3">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <span onClick={handleLike} className="material-symbols-outlined text-[25px] hover:cursor-pointer font-thin">favorite</span>
              <span>{state?.likes?.length}</span>
            </div>
            <div className="flex items-center gap-2">
              <span onClick={handleOpen} className="material-symbols-outlined text-[25px] hover:cursor-pointer font-thin">chat</span>
              <span>{commentCount}</span>
            </div>
          </div>
          {/* <span className="material-symbols-outlined text-[25px] hover:cursor-pointer font-thin" onClick={bookmarkPost}>bookmark</span> */}
        </div>
        {open && <CommentSection postId={id}></CommentSection>}
      </div>
      <div onClick={toggleShowOption} className="absolute top-4 right-4 ">
        <span className="material-symbols-outlined text-[#D9D9D9] text-3xl cursor-pointer">more_horiz</span>
      </div>
      {
        showOptions && (
          <div className="absolute top-12 right-4 text-[#242424] flex flex-col gap-3 bg-[#F4F4F4] px-4 py-3 rounded-lg">
            <div className="items-center flex gap-2" onClick={copyLink}>
              <span className="material-symbols-outlined">content_copy</span>
              <span className="">Copy Link</span>
            </div>
            {currentUser.displayName === name ? (
              <>
                <div className="items-center flex gap-2 hover:cursor-pointer">
                  <span className="material-symbols-outlined">border_color</span>
                  <span>Edit</span>
                </div>
                <div className="items-center flex gap-2 hover:cursor-pointer">
                  <span className="material-symbols-outlined">delete</span>
                  <span>Delete Post</span>
                </div>
              </>
            ) : (
              <Link to="/report">
                <div className="items-center flex gap-2 hover:cursor-pointer">
                  <span className="material-symbols-outlined">flag</span>
                  <span>Report</span>
                </div>
              </Link>
            )}
            <div className="items-center flex gap-2 hover:cursor-pointer" onClick={deleteBookmark}>
              <span className="material-symbols-outlined">delete</span>
              <span>Delete</span>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default BookmarkedPostCard;
