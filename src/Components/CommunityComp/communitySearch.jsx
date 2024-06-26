import React, { useState } from 'react'

const CommunitySearch = () => {
    const [searchTerm, setSearchTerm] = useState("")
  return (
    <div className='w-full my-6'>
      <input className='border search-community border-[#919191] border-solid font-medium text-lg w-full px-3 py-2 rounded-lg' value={searchTerm} onClick={(e => setSearchTerm(e.target.value))} type='text' placeholder='Search' />
    </div>
  )
}

export default CommunitySearch
