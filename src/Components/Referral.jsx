import  { useState, useEffect } from "react";
import share from "../assets/meal-history/Share.png";
import link from "../assets/meal-history/Link.png";
import { useAuth } from "../Contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Referral() {
  const { currentUser } = useAuth();
  const [referralLink, setReferralLink] = useState(currentUser?.uid);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [copiedCount, setCopiedCount] = useState("loading...");

  const getPointsFromFirebase = async () => {
    try {
      const docss = await getDoc(doc(db, "users", currentUser?.uid));

      console.log(docss.data(), currentUser?.uid);
      if (docss.exists() && docss.data()?.points) {
        const data = docss.data();
        setCopiedCount(data.points);
      } else {
        setCopiedCount(0);
      }
    } catch (e) {
      console.error("Error getting points from firebase:", e);
    }
  };

  // to set loggedin state to true to automatically generate referral link
  useEffect(() => {
    setIsLoggedIn(true);
    getPointsFromFirebase();
    generateReferralLink();
  }, []);

  // to generate the referral link
  const generateReferralLink = async () => {
    try {
      const referralCode = generateRandomReferralCode();
      const referralLink = `https://meal-pal-v2-delta.vercel.app/signup?referral=${referralCode}`;
      // to Save referral code to local storage
      localStorage.setItem("referralCode", referralCode);

      setReferralLink(referralLink);
    } catch (error) {
      console.error("Error generating referral link:", error);
    }
  };

  // to generate random characters  for referral link
  const generateRandomReferralCode = () => {
    return currentUser?.uid;
  };

  // to copy the referral link to clipboard
  const copyReferralLink = (event) => {
    setReferralLink(event.target.value);

    try {
      navigator.clipboard.writeText(referralLink);

      // Show the notification
      var notification = document.getElementById("copyNotification");
      notification.style.opacity = "1";

      // Hide the notification after 1 second
      setTimeout(function () {
        notification.style.opacity = "0";

        // Delay before fetching points from local storage
        setTimeout(() => {
          const points = localStorage.getItem("Points");
          if (points) {
            setCopiedCount(parseInt(points));
          }
        }, 500);
      }, 1000);

      // Update points in localStorage
      // let points = copiedCount + 10;

      // localStorage.setItem("Points", points.toString());
    } catch (error) {
      console.error("Failed to copy referral link: ", error);
    }
  };
  const redeemPoints = () => {
    const updatedPoints = Math.max(copiedCount - 400, 0);
    localStorage.setItem("Points", updatedPoints.toString());
    setCopiedCount(updatedPoints);
  };

  if (copiedCount >= 400) {
    document.getElementById("redeem").style.background = "green";
  }

  return (
    <>
      <div className={`flex justify-center items-center mt-6`}>
        <div className=" bg-[#F0F6FF]  text-black rounded-xl flex w-[359px] h-[180px] p-3 items-center content-center gap-x-4 gap-y-[11px] flex-shrink-0 flex-wrap">
          <h1 className="font-manrope text-2xl font-semibold leading-[140%]">
            <span
              id="count"
              className="font-manrope text-2xl font-semibold leading-[140%]"
            >
              {copiedCount}
            </span>{" "}
            Pts
          </h1>
          <p className="font-manrope text-base font-normal leading-[140%]  ">
            Reach 400 points and get a meal on us! You have referred 0 friends
            so far.
          </p>
          <button
            id="redeem"
            onClick={redeemPoints}
            disabled={copiedCount < 400}
            className="bg-white p-1 text-black border-2 w-3/6 border-blue-600
               hover:bg-blue-200  mr-5 flex px-4  py-[7.5px] justify-center items-center rounded-3xl font-manrope font-semibold text-sm"
          >
            Redeem Points
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center mt-6">
        <div className="bg-[#F0F6FF]  text-black rounded-xl flex w-[359px]  p-3 items-center content-center gap-x-4 gap-y-[11px] flex-shrink-0 flex-wrap">
          <p className="font-manrope text-2xl font-semibold leading-[140%]">
            Invite a friend
          </p>
          <p className="font-manrope text-base font-normal leading-[140%]">
            Earn 10 points for every friend that signs up.
          </p>
          {isLoggedIn && (
            <div className="flex items-center gap-4 relative">
              <button
                onClick={copyReferralLink}
                className="inline-flex gap-3 items-center py-[.5rem] px-[1rem] border border-[#4268FB] rounded-[1rem]"
              >
                <img src={share} alt="link" />
                <p className="text-[0.875rem] font-semibold"> Share</p>
              </button>
              <button
                onClick={copyReferralLink}
                className="inline-flex gap-3 items-center py-[.5rem] px-[1rem] border border-[#4268FB] rounded-[1rem]"
              >
                <img src={link} alt="link" />

                <p className="text-[0.875rem] font-semibold">Copy link</p>
              </button>

              {/* pop up notification */}
              <div
                id="copyNotification"
                className="absolute right-[-55px] top-0 text-xs text-green-700 opacity-0  transition-opacity duration-700"
              >
                Copied!
              </div>
            </div>
          )}
          {!isLoggedIn && (
            <div className="bg-white border rounded-lg inline-block w-[270px] relative px-2 py-2">
              <button className="bg-black  text-white rounded-lg text-sm pb-1 px-1 absolute right-2">
                Copy
              </button>
            </div>
          )}
        </div>
      </div>
      {/*<div className='flex justify-center items-center mt-4'><img src={suffiximg} alt="a suffix-image"/></div>*/}
    </>
  );
}

