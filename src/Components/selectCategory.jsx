import React from 'react'

const SelectCategory = () => {
    const category1 = ["Quick Meal", "Breakfast", "Lunch", "Dinner"]
    const category2 = ["African Cuisine", "Italian Cuisine", "Chinese Cuisine", "Indian Cuisine", "Mexican Cuisine", "Japanese"]
  return (
    <>
    <h1 className='text-center text-xl my-3 font-medium'>Select Category</h1>
    <div className='border-b-[#EAEAEA] border-b py-3'>
      {category1.map(item => (
        <div className='flex items-center gap-3 p-3' key={item}>
            <input  type='checkbox'/>
            <span className='text-[#101010] text-md font-medium'>{item}</span>
        </div>
      ))}
    </div>
    <div className='py-3'>
      {category2.map(item => (
        <div className='flex items-center gap-3 p-3' key={item}>
            <input  type='checkbox'/>
            <span className='text-[#101010] text-md font-medium'>{item}</span>
        </div>
      ))}
    </div>
    <button
    className="bg-[#4268FB] ml-3 px-6 py-2 cursor-pointer text-white font-normal rounded-md hover:bg-[#4248fb]-700 focus:outline-none focus:ring focus:ring-violet-400 focus:ring-opacity-75"
    >
        Done
    </button>
    </>
  )
}

export default SelectCategory
