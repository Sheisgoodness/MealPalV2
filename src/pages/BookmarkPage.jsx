
// import React from "react";
import { useBookmarks } from "/src/Contexts/BookmarkContext";
import DeleteIcon from "/src/assets/images/delete.png";
import "/src/App.css";
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

import React, { useContext, useEffect, useState } from "react";
import { auth, db, onAuthStateChanged } from "../firebase/firebase";
import { AuthContext } from "../Contexts/AuthContext";
import PostCard from "../Components/CommunityComp/PostCard";
import BookmarkedPostCard from "../Components/CommunityComp/BookmarkedPostCard";


function BookmarkPage() {

    const { currentUser, userData } = useContext(AuthContext);

    const [bookmarkedPosts, setBookmarkedPost] = useState([]);

    const [bookmarkState, setBookmarkState] = useState("idle");

    const getBookmarks = async () => {


        onAuthStateChanged(auth, async (u) => {

            console.log("u", u.uid);

            setBookmarkState("loading");

            const bookmarks = collection(db, "bookmarks");

            const b = query(bookmarks, where("user", "==", u.uid));

            const result = await getDocs(b);
            
            const r = result.docs.map((doc) => doc.data().post);

            if(result.docs.length == 0) {
                setBookmarkedPost([]);
                setBookmarkState("idle");
                return;
            }

            const posts = collection(db, "posts");

            const p = query(posts, where("documentId", "in", r));

            const postDocs = await getDocs(p);

            const postResults = postDocs.docs.map((doc) => doc.data());

            setBookmarkedPost(postResults);
            setBookmarkState("idle");
        });




        // onSnapshot(bookmarks, (doc) => {

        //     const result = doc.docs.map(i => i.data());
        //     console.log(result);
        // })

        // const querySnapshot = await getDocs(bookmarks);
        // const bookmark = querySnapshot.docs.map((doc) => doc.data());
        // console.log(bookmark);
    }

    useEffect(() => {

        getBookmarks();

    }, []);

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col py-4 w-full">
        {bookmarkedPosts.length == 0 ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-[#777777] text-2xl">{bookmarkState == "loading" ? "Loading" : "No Bookmark Found"}</p>
          </div>
        ) : (
          <div>
            {bookmarkedPosts?.length > 0 &&
              bookmarkedPosts.map((post, index) => {
                const timestamp = new Date(post?.timestamp?.toDate());

                // Calculate the difference between now and the post timestamp
                const now = new Date();
                const diff = now - timestamp;

                // Convert milliseconds to seconds
                const seconds = Math.floor(diff / 1000);

                // Calculate years, months, days, hours, and minutes
                const years = Math.floor(seconds / (365 * 24 * 60 * 60));
                const months = Math.floor(
                  (seconds % (365 * 24 * 60 * 60)) / (30 * 24 * 60 * 60)
                );
                const days = Math.floor(
                  (seconds % (30 * 24 * 60 * 60)) / (24 * 60 * 60)
                );
                const hours = Math.floor(
                  (seconds % (24 * 60 * 60)) / (60 * 60)
                );
                const minutes = Math.floor((seconds % (60 * 60)) / 60);

                // Construct the timestamp string
                let timestampString = "";
                if (years > 0) {
                  timestampString += `${years}y `;
                }
                if (months > 0) {
                  timestampString += `${months}mo `;
                }
                if (days > 0) {
                  timestampString += `${days}d `;
                }
                if (hours > 0) {
                  timestampString += `${hours}h `;
                }
                if (minutes > 0) {
                  timestampString += `${minutes}m `;
                }

                return (
                  <BookmarkedPostCard
                    key={index}
                    logo={post?.logo}
                    id={post?.documentId}
                    uid={post?.uid}
                    name={post?.name}
                    email={post?.email}
                    image={post?.image}
                    text={post?.text}
                    timestamp={timestampString.trim()} // Display the formatted timestamp
                    getBookmarks={getBookmarks}
                  ></BookmarkedPostCard>
                );
              })}
          </div>
        )}
      </div>
        </div>
    )
}

export default BookmarkPage;
