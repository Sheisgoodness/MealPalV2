import { collection, getDocs, or, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase';
import PostCard from './PostCard';

const CommunitySearch = ({ toggleTab }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searcResult, setSearcResult] = useState([]);
  const [show, setShow] = useState(false);
  const [pageState, setPageState] = useState("idle");
  const loadSearch = async () => {
    if (searchTerm.length >= 1) {
      setShow(true);
      toggleTab("Search");
    } else {
      setShow(false);
      toggleTab("Update");
      return;
    }

    if (searchTerm.length >= 3) {
      setPageState("loading");
      const posts = collection(db, "posts");
      const nameQuery = query(posts, where("name", ">=", searchTerm), where("name", "<=", searchTerm + '\uf8ff'));
      const textQuery = query(posts, where("text", ">=", searchTerm), where("text", "<=", searchTerm + '\uf8ff'));

      const nameQuerySnapshot = await getDocs(nameQuery);
      const textQuerySnapshot = await getDocs(textQuery);
      const nameDocs = nameQuerySnapshot?.docs.map(d => d.data());
      const textDocs = textQuerySnapshot?.docs.map(d => d.data());
      setSearcResult(nameDocs.concat(textDocs));
    }
    setPageState("idle");
  }

  useEffect(() => {
    loadSearch();
  }, [searchTerm]);

  return (
    <div>
    <div className='w-full my-6'>
      <input className='border search-community border-[#919191] border-solid font-medium text-lg w-full px-3 py-2 rounded-lg' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value) }} type='text' placeholder='Search' />
    </div>

    <div className="flex flex-col items-center">

      <div className="flex flex-col py-4 w-full">
        {show && searcResult.length == 0 ? (
          <div className="flex justify-center items-center min-h-[10vh]">
            <p className="text-[#777777] text-2xl">{pageState == "loading" ? "Loading..." :  "No Search Result"}</p>
          </div>
        ) : (
          <div>
            {searcResult.length > 0 &&
              searcResult.map((post, index) => {
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
                  <PostCard
                    key={index}
                    logo={post?.logo}
                    id={post?.documentId}
                    uid={post?.uid}
                    name={post?.name}
                    email={post?.email}
                    image={post?.image}
                    text={post?.text}
                    timestamp={timestampString.trim()} // Display the formatted timestamp
                  ></PostCard>
                );
              })}
          </div>
        )}
        {/* {} */}
      </div>
      {/* <div ref={scrollRef}></div> */}
    </div>

    </div>
  )
}

export default CommunitySearch
