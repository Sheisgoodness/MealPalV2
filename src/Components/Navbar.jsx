import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        // toast.success("Sign out Successful! You will be redirected", {
        //   autoClose: 2000,
        //   onClose: () => {
        //     console.log("sign out successful");
        //     navigate("/");
        //   },
        // });
      })
      .catch((error) => {
        toast.error("Error Signing out");
        console.log("Error Signing out", error);
      });
  };

  return (
    <>
      <ToastContainer />
      <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <Link to="/home">
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                MealPal
              </span>
            </Link>
          </div>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-multi-level"
            aria-expanded={isMenuOpen ? "true" : "false"}
          >
            <span className="sr-only">
              {isMenuOpen ? "Close main menu" : "Open main menu"}
            </span>
            {isMenuOpen ? (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            )}
          </button>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-multi-level"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <NavItem to="/home" currentPath={location.pathname}>
                Home
              </NavItem>
              <NavItem to="/profile" currentPath={location.pathname}>
                Profile
              </NavItem>
              {/* <NavItem to="/mealplan" currentPath={location.pathname}>
                Meal Plan
              </NavItem> */}
              <NavItem to="/Recommended" currentPath={location.pathname}>
                Meal List
              </NavItem>
              <NavItem to="/referral" currentPath={location.pathname}>
                Referral
              </NavItem>
              <NavItem to="/communitypage" currentPath={location.pathname}>
                Community Forum
              </NavItem>

              {/*  New NavItem added */}
              <NavItem to="/ContactUs" currentPath={location.pathname}>
                ContactUs
              </NavItem>
              <NavItem to="/bookmark" currentPath={location.pathname}>
                Bookmark
              </NavItem>
              <NavItem to="/Faq" currentPath={location.pathname}>
                FAQ
              </NavItem>
              <button
                className="block py-2 px-3 text-red-500 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-red md:dark:hover:text-red-300 dark:hover:bg-gray-700 dark:hover:text-red-500 md:dark:hover:bg-transparent cursor-pointer"
                onClick={handleSignOut}
              >
                LogOut
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavItem({ to, currentPath, children }) {
  const isActive = to === currentPath;
  const baseClassName =
    "block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent cursor-pointer";

  return (
    <li
      className={`${
        isActive ? "bg-blue-700 py-2 px-2 text-white" : "text-gray-900"
      } ${baseClassName}`}
    >
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default Navbar;