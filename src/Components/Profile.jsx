import React, { useState, useEffect } from "react";
import firebase from "../firebase/firebase";
import { useAuth } from "../Contexts/AuthContext";
import "firebase/database";
import "firebase/storage";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import ProfileAvatar from "../assets/images/profileAvatar.png";
import commpeople from "../assets/images/group-users.png";
import emailIcon from "../assets/images/email.png";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
// import ProfileInput from "./ProfileInput";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = ({ user }) => {
  const { currentUser } = useAuth();
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState(
    user && user.profileImage ? user.profileImage : ""
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  // const isOwner = currentUser && user && currentUser.uid === user.uid;
  const firestore = getFirestore(firebase);

  const [showSaveButton, setShowSaveButton] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      if (currentUser) {
        const docRef = doc(collection(firestore, "users"), currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setEmail(currentUser.email || "");
          setName(userData.name || "");
          setBio(userData.bio || "");
          setProfileImage(userData.profileImage || "");
        } else {
          // Create the user profile document if it doesn't exist
          await setDoc(docRef, {
            name: currentUser.displayName || "",
            email: currentUser.email || "",
            bio: "",
            profileImage: "",
          });
        }
        setLoading(false);
      }
    };

    getUserData().catch((error) => {
      console.error("Error fetching user data: ", error);
      setLoading(false);
    });
  }, [currentUser, firestore]);

  const handleNameChange = async (event) => {
    if (currentUser && currentUser.email) {
      setName(event.target.value);
      await updateDoc(doc(collection(firestore, "users"), currentUser.uid), {
        name: event.target.value,
      });
    }
  };

  const handleBioChange = async (event) => {
    if (currentUser && currentUser.email) {
      setBio(event.target.value);
      await updateDoc(doc(collection(firestore, "users"), currentUser.uid), {
        bio: event.target.value,
      });
    }
  };

  const handleImageUpload = (event) => {
    if (currentUser && currentUser.email) {
      const file = event.target.files[0];
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `profileImages/${currentUser.uid}/${file.name}`
      );

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Handle upload progress if needed
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
          toast.info(`Upload is ${progress}% done`, { autoClose: 900 });
        },
        (error) => {
          // Handle upload error
          console.error("Upload error:", error);
          toast.error("Error while uploading. Try again");
        },
        () => {
          // Upload completed successfully
          getDownloadURL(storageRef).then((url) => {
            setProfileImage(url);
            updateDoc(doc(collection(firestore, "users"), currentUser.uid), {
              profileImage: url,
            });
          });
        }
      );
    }
  };

  const toggleEditMode = (field) => {
    if (field === "name") {
      setIsEditingName(!isEditingName);
      setShowSaveButton(true);
    } else if (field === "bio") {
      setIsEditingBio(!isEditingBio);
      setShowSaveButton(true);
    }
  };

  const handleSave = () => {
    toast.success("Changes saved", { autoClose: 2000 });
    setShowSaveButton(false);
    toggleEditMode("");
  };

  return (
    <div className="container mx-auto p-4">
      {/* <div>
        <ProfileInput></ProfileInput>
      </div> */}
      {loading ? (
        <p className="text-blue-600 ml-2 text-lg">Loading...</p>
      ) : (
        <div className="bg-white h-full shadow rounded-lg p-6">
          <div className="flex items-center space-x-6 mb-4">
            <img
              className="h-20 w-20 object-cover rounded-full cursor-pointer"
              src={profileImage || ProfileAvatar}
              alt="Profile image"
              onClick={() =>
                currentUser &&
                currentUser.email &&
                document.getElementById("imageInput").click()
              }
            />
            {currentUser && currentUser.email && (
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            )}
          </div>

          <div className="mb-2">
            {isEditingName ? (
              <input
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={handleNameChange}
                className="text-lg mb-2 font-bold"
              />
            ) : (
              <p
                className="text-lg mb-2 font-bold"
                onClick={() => toggleEditMode("name")}
              >
                {name || "Enter your name"}
              </p>
            )}
          </div>

          <div className="flex items-center">
            <img
              className="w-5 h-5 rounded-full mr-1"
              src={emailIcon}
              alt="email"
            />
            <div className="mb-2 mt-2">
              <p>{email}</p>
            </div>
          </div>

          <div>
            {isEditingBio ? (
              <textarea
                value={bio}
                placeholder="Tell us about yourself"
                onChange={handleBioChange}
                rows={4}
                cols={50}
                className="w-full h-24 p-2 border rounded-lg"
              />
            ) : (
              <p onClick={() => toggleEditMode("bio")}>
                {bio || "Tell us about yourself"}
              </p>
            )}
          </div>

          {currentUser.email && showSaveButton && (
            <button
              readOnly={false}
              onClick={handleSave}
              className="bg-blue-500 text-white font-semibold rounded-full py-2 px-4 mt-4"
            >
              Save
            </button>
          )}

          <div className="flex items-center mt-8">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={commpeople}
              alt="commpeople"
            />
            <div>
              <h2 className="text-1xl mt-5 font-bold">Community Forum</h2>
            </div>
          </div>
          <div className="pl-0">
            <Link to="/communitypage">
              <button className="py-2 px-5 mt-8 bg-[#4248fb] text-white font-semibold rounded-full shadow-md hover:bg-[#4248fb]-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75">
                Join the forum
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

Profile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    profileImage: PropTypes.string,
    email: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default Profile;
