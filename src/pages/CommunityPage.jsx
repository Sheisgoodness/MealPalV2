// eslint-disable-next-line no-unused-vars
import React from "react";
// import PostMain from "../Components/CommunityComp/PostMain";
import Newcommunity from "../Components/CommunityComp/newcommunity";
import { Link } from "react-router-dom";

const CommunityPage = () => {
  return (
    <div className="w-full">
      <div className="flex bg-white-100 relative">
        <div className="flex-auto w-full mt-8 bg-white rounded-xl">
          <div className="w-[90%] mx-auto mb-10">
            <h4 className="font-medium leading-10 text-3xl mb-5">Welcome To The Community!</h4>
            {/* <PostMain></PostMain> */}
            <Newcommunity />
           <Link to='/makepost'>
              <button className="bg-[#4268FB] text-white text-xl rounded-lg fixed bottom-[10%] px-5 s py-4 cursor-pointer right-[5%]">
                  Create a Post
              </button>
           </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
