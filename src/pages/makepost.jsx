import React, {useRef, useState, useReducer, useContext} from 'react'
import { toast } from "react-toastify";
import addImage from '../assets/images/add_photo_alternate.png'
import { AuthContext } from '../Contexts/AuthContext';
import { db } from '../firebase/firebase';
import { PostsReducer, postActions, postsStates } from '../Contexts/PostReducer';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import {
    doc,
    setDoc,
    collection,
    serverTimestamp,
  } from "firebase/firestore";
import { Link } from 'react-router-dom';
const Makepost = () => {
    const text = useRef("");
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [progressBar, setProgressBar] = useState(0);
    const { currentUser, userData } = useContext(AuthContext);
    const [dispatch] = useReducer(PostsReducer, postsStates);
    const handleUpload = (e) => {
        setFile(e.target.files[0]);
      };
      const { HANDLE_ERROR } = postActions;

      const metadata = {
        contentType: [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/svg+xml",
        ],
      };
      const storage = getStorage();
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
  return (
  <div className='w-[90vw] mx-auto mt-5'>

    <div className="flex flex-col py-4 w-full bg-[#F4F4F4] border rounded-xl border-[#CACACA] shadow-md">
        <div className="flex items-center pb-4 pl-4 w-full">
          <form className="w-full">
            <div className="flex justify-between items-center">
              <div className="w-full ml-4">
                <textarea
                  type="text"
                  name="text"
                  placeholder="Write something"
                  className="outline-none w-full bg-[#f4f4f4] rounded-md"
                  ref={text}
                  ></textarea>
              </div>
              <div className="mx-4">
                {image && (
                  <img
                  className="h-24 rounded-xl"
                  src={image}
                  alt="previewImage"
                  ></img>
                )}
              </div>
            </div>
          </form>
        </div>
        <span
          style={{ width: `${progressBar}%` }}
          className="bg-[#101010] py-1 rounded-md"
          ></span>
        <div className="flex justify-between pt-10 bottom-0">
          <div className="flex items-center">
            <label
              htmlFor="addImage"
              className="cursor-pointer flex items-center"
              >
              <div className=' ml-8 rounded-lg border border-[#CACACA] flex items-center justify-center'>
                <img className="object-cover py-1 px-2 object-center" src={addImage} alt="addImage"></img>
              </div>
              <input
                id="addImage"
                type="file"
                style={{ display: "none" }}
                onChange={handleUpload}
                ></input>
            </label>
            {file && (
              <button className="text" onClick={submitImage}>
                Upload
              </button>
            )}
          </div>
          <div className="pr-5">
            <Link to='/selectcategory'>
              <button
                className="py-2 px-5 bg-[#4248fb] text-white font-semibold rounded-md shadow-md hover:bg-[#4248fb]-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
                >
                Post
              </button>
            </Link>
          </div>
        </div>
    </div>
  </div>
  )
}

export default Makepost
