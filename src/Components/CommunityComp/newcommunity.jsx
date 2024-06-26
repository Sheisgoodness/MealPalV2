import { useState } from "react"
import CommunitySearch from "./communitySearch"
import PostMain from './PostMain'
import { update } from "firebase/database"


const Newcommunity = () => {
    const [tab, setTab] = useState('Update')
    const categories = ['Recent', "Healthy","Dessert","Vegetarian","Quick","Easy","Breakfast","Lunch","Dinner"]
    function toggleTab(tab){
        setTab(tab)
    }
  return (
    <>
    <div className="flex justify-between">
        <div style={{borderBottom: tab == 'Update' ? '2px solid #101010' : '2px solid #eaeaea', color: tab == 'Update' ? '#101010' :'#707070'  }} onClick={() => toggleTab('Update')} className="text-xl font-semibold flex-1 text-center pb-2">Update</div>
        <div style={{borderBottom: tab == 'Saved' ? '2px solid #101010' : '2px solid #eaeaea', color: tab == 'Saved' ? '#101010' :'#707070'  }} onClick={() => toggleTab('Saved')} className="text-xl font-semibold flex-1 text-center pb-2">Saved</div>
    </div>
    <CommunitySearch/>
   {tab == 'Update' && 
     <div className="flex gap-3 whitespace-nowrap overflow-x-auto">
     {categories.map((cat, index) => (
         <span className="text-lg font-small text-[#101010] px-3 py-[5px] rounded-lg border border-[#1010104F]" key={index}>{cat}</span>
     ))}
    </div>}
   {tab == 'Update' && <PostMain />}
    </>

  )
} 

export default Newcommunity
