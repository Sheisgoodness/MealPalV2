import { useState, useRef, useContext, useReducer, useEffect } from "react";
import addImage from "../../assets/images/addImage.png";
import { AuthContext } from "../../Contexts/AuthContext";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import {
  PostsReducer,
  postActions,
  postsStates,
} from "../../Contexts/PostReducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import PostCard from "./PostCard";
import TagButton from "./TagButton";
import { toast } from "react-toastify";

const PostMain = () => {
  const { currentUser, userData } = useContext(AuthContext);
  const text = useRef("");
  const scrollRef = useRef("");
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const collectionRef = collection(db, "posts");
  const [state, dispatch] = useReducer(PostsReducer, postsStates);
  const { SUBMIT_POST, HANDLE_ERROR } = postActions;
  const [progressBar, setProgressBar] = useState(0);

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();
    if (text.current.value !== "") {
      try {
        const name =
          currentUser?.displayName || userData?.name || "Unknown User";
        const email =
          currentUser?.email || userData?.email || "unknown@example.com";
        const userId = currentUser?.uid || userData?.uid;

        if (!userId) {
          throw new Error("User ID is undefined");
        }

        const postDocRef = doc(collection(db, "posts"));
        const documentId = postDocRef.id;

        await setDoc(postDocRef, {
          documentId: documentId,
          uid: currentUser.uid,
          logo: currentUser?.photoURL,
          name: name,
          email: email,
          text: text.current.value,
          image: image,
          timestamp: serverTimestamp(),
        });
        text.current.value = "";
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        // alert(err.message);
        toast.error(err.message);
        console.log(err.message);
      }
    } else {
      dispatch({ type: HANDLE_ERROR });
    }
  };

  const storage = getStorage();

  const metadata = {
    contentType: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/svg+xml",
    ],
  };

  const submitImage = async () => {
    const fileType = metadata.contentType.includes(file["type"]);
    if (!file) return;
    if (fileType) {
      try {
        const storageRef = ref(storage, `images/${file.name}`);
        const uploadTask = uploadBytesResumable(
          storageRef,
          file,
          metadata.contentType
        );
        await uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
            setProgressBar(progress);
          },
          (error) => {
            // alert(error);
            toast.error(error);
          },
          async () => {
            await getDownloadURL(uploadTask.snapshot.ref).then(
              (downloadURL) => {
                setImage(downloadURL);
              }
            );
          }
        );
      } catch (err) {
        dispatch({ type: HANDLE_ERROR });
        // alert(err.message);
        toast.err(err.message);
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collectionRef, orderBy("timestamp", "asc"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postsData = querySnapshot.docs.map((doc) => doc.data());
        dispatch({ type: SUBMIT_POST, posts: postsData });
        scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
        setImage(null);
        setFile(null);
        setProgressBar(0);
      });
      return () => unsubscribe();
    };
    fetchData();
  }, [SUBMIT_POST]);

  return (
    <div className="flex flex-col items-center">

      <div className="flex flex-col py-4 w-full">
        {state?.posts?.length == 0 ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-[#777777] text-2xl">No Post Found</p>
          </div>
        ) : (
          <div>
            {state?.posts?.length > 0 &&
              state?.posts?.map((post, index) => {
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
      </div>
      <div ref={scrollRef}></div>
    </div>
  );
};

export default PostMain;
