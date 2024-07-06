import { useState } from "react"
import CommunitySearch from "./communitySearch"
import PostMain from './PostMain'
import { update } from "firebase/database"
import BookmarkPage from "../../pages/BookmarkPage"


const Newcommunity = () => {
    const [tab, setTab] = useState('Update')
    const categories = ['Recent', "Quick Meal","Breakfast","Lunch","Dinner", "African Cuisine","Italian Cuisine","Chinese Cuisine", "Indian Cuisine"]
    function toggleTab(tab){
        setTab(tab)
    }
  return (
    <>
    <div className="flex justify-between">
        <div style={{borderBottom: tab == 'Update' ? '2px solid #101010' : '2px solid #eaeaea', color: tab == 'Update' ? '#101010' :'#707070'  }} onClick={() => toggleTab('Update')} className="text-xl font-semibold flex-1 text-center pb-2 cursor-pointer">Update</div>
        <div style={{borderBottom: tab == 'Saved' ? '2px solid #101010' : '2px solid #eaeaea', color: tab == 'Saved' ? '#101010' :'#707070'  }} onClick={() => toggleTab('Saved')} className="text-xl font-semibold flex-1 text-center pb-2 cursor-pointer">Saved</div>
    </div>
    <CommunitySearch toggleTab={toggleTab}/>
   {tab == 'Update' && 
     <div className="flex gap-3 whitespace-nowrap overflow-x-auto">
     {categories.map((cat, index) => (
         <span className="text-lg font-small text-[#101010] px-3 py-[5px] rounded-lg border hover:cursor-pointer border-[#1010104F]" key={index}>{cat}</span>
     ))}
    </div>}
   {tab == 'Update' && <PostMain />}
   {tab == 'Saved' && <BookmarkPage />}
    </>

  )
} 

export default Newcommunity
