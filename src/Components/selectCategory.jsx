import React, { useEffect, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext';
import { db } from '../firebase/firebase';
import { PostsReducer, postActions, postsStates } from '../Contexts/PostReducer';
  import {
    doc,
    setDoc,
    collection,
    serverTimestamp,
  } from "firebase/firestore";
import { toast } from 'react-toastify';



const SelectCategory = () => {
    const category1 = ["Quick Meal", "Breakfast", "Lunch", "Dinner"]
    const category2 = ["African Cuisine", "Italian Cuisine", "Chinese Cuisine", "Indian Cuisine", "Mexican Cuisine", "Japanese"]

    const [choosenCategory, setChoosenCategory] = useState([]);

    const handleCheckbox = (category) => {
      if(choosenCategory.includes(category)) {
        setChoosenCategory(choosenCategory.filter(item => item !== category))
      } else {
        setChoosenCategory([...choosenCategory, category])
      }
    }

    useEffect(() => {
      console.log(choosenCategory);
    }, [choosenCategory]);


    const doneButton = async () => {

      try {
        
        const postData = sessionStorage.getItem('userPost');
  
        const parsedPostData = JSON.parse(postData);
  
        parsedPostData.category = choosenCategory;
  
        const postDocRef = doc(collection(db, "posts"));
              const documentId = postDocRef.id;
  
              parsedPostData.timestamp = serverTimestamp()
  
              parsedPostData.documentId = documentId;
      
              await setDoc(postDocRef, parsedPostData);
              
              toast.success("Post created successfully");
      } catch (error) {
        toast.error("An error occurred");
        console.log("Error:", error);
      }

    }

  return (
    <>
    <h1 className='text-center text-xl my-3 font-medium'>Select Category</h1>
    <div className='border-b-[#EAEAEA] border-b py-3'>
      {category1.map(item => (
        <div className='flex items-center gap-2 p-3' key={item}>
            <input  type='checkbox' className='h-fit w-fit' onClick={() => {handleCheckbox(item)}} />
            <span className='text-[#101010] text-md font-medium'>{item}</span>
        </div>
      ))}
    </div>
    <div className='py-3'>
      {category2.map(item => (
        <div className='flex items-center gap-2 p-3' key={item}>
            <input  type='checkbox' className='h-fit w-fit' onClick={() => {handleCheckbox(item)}} />
            <span className='text-[#101010] text-md font-medium'>{item}</span>
        </div>
      ))}
    </div>
    <button
    className="bg-[#4268FB] hover:w-fit ml-3 px-6 py-2 cursor-pointer text-white font-normal rounded-md hover:bg-[#4248fb]-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
    onClick={doneButton}
    >
        Done
    </button>
    </>
  )
}

export default SelectCategory
