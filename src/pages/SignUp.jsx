import React, { useState, useEffect } from "react";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import Google from "../assets/google.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Back from "../assets/back.png";
import Loader from "../Components/OnboardingLoader";
import Hide from "../assets/hide.png";
import View from "../assets/view.png";
import foodplan from "../assets/foodplan.jpg"; 

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = ({ fullname, email, password }) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        const userData = {
          fullname: fullname,
          email: email,
        };
        localStorage.setItem("userData", JSON.stringify(userData));
        toast.success("Sign In Successful. You will be redirected", {
          autoClose: 2000,
          onClose: () => {
            console.log("sign in successful");
            navigate("/home");
          },
        });
      })
      .catch((err) => {
        console.log(err, "err");
        console.log(err.code);
        let customErrorMessage = "An error occurred";
        if (err.code === "auth/email-already-in-use") {
          customErrorMessage =
            "Existing user. Please login with your email address.";
        }
        setErrorMessage(customErrorMessage);
        toast.error(customErrorMessage); 
      })
      .finally(() => setIsLoading(false));
  };

  const providerSignIn = (provider) => {
    signInWithRedirect(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user.email);
        navigate("/home");
      })
      .catch((err) => {
        const error = err.code;
        toast.error(error.message);
        const errorMessage = err.message;
      });
  };

  useEffect(() => {
    const getRedirectResultAsync = async () => {
      try {
        const response = await getRedirectResult(auth);
        if (response) {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error getting redirect result:", error);
      }
    };

    getRedirectResultAsync();
  }, []);

  const googleSignIn = () => {
    providerSignIn(googleProvider);
  };

  function handleClick(e) {
    e.preventDefault();
    reset();
    navigate("/signin");
  }

  return (
    <>
      <div className="relative flex flex-col justify-center items-center min-h-screen mx-6">
        <ToastContainer />

        {/* Top Background Image */}
        <div className="relative w-full h-48 md:h-64 bg-cover bg-center" style={{ backgroundImage: `url(${foodplan})`, paddingTop: '4rem' }}>
          <img
            src={Back}
            alt="back"
            className="h-[1.5rem] w-[1.5rem] cursor-pointer absolute top-4 left-4 z-10"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Create Account Container */}
        <div className="bg-[#f0f6ff] p-4 rounded-lg shadow-md w-full max-w-md z-20 mt-4 md:mt-8">
          <h2 className="font-extrabold text-2xl mb-2 text-center">Create an account</h2>
          <form
            action=""
            onSubmit={handleSubmit(handleSignUp)}
            className="flex flex-col w-full"
          >
            <div className="flex flex-col mb-4 w-full">
              <label htmlFor="fullname" className="text-neutral-500">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                id="username"
                className="placeholder:text-black outline-none border-solid border-2 p-4 focus:border-blue-500 rounded-lg mt-2"
                {...register("fullname", { required: "required Field" })}
              />
            </div>

            <div className="flex flex-col mb-4 w-full">
              <label htmlFor="password" className="text-neutral-500">
                Password
              </label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  id="password"
                  className="placeholder:text-black outline-none border-solid border-2 p-4 focus:border-blue-500 rounded-lg mt-2 w-full"
                  {...register("password", {
                    required: "Required Field",
                    pattern: {
                      value:
                        /^(?=.*[A-Za-z\d])(?=.*[!@#$%^&*.,><*])[A-Za-z\d!@#$%^&*,.><*]{8,}$/,
                      message:
                        "Password must be at least 8 characters and must include at least one letter, one digit, and one special character.",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 flex items-center px-4"
                >
                  <img
                    src={showPassword ? Hide : View}
                    alt={showPassword ? "Hide password" : "Show password"}
                    className="h-6 w-6"
                  />
                </button>
              </div>
              <span className="text-red-500 text-sm">
                {errors?.password && errors?.password?.message}
              </span>
            </div>

            <div className="text-center">
              <button
                className="bg-[rgb(66,104,251)] text-white text-lg font-semibold cursor-pointer py-4 px-4 rounded-lg w-full my-3"
                type="submit"
              >
                Sign Up
              </button>
              <p>
                By using this app, you agree to our{" "}
                <a
                  href="https://docs.google.com/document/d/15ONH41KmOXuOUFBbTSLmjOb2Q-xufJC2jQeK3HOB0dw/edit"
                  className="text-blue-500 font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Terms of use and Conditions
                </a>
              </p>
            </div>
          </form>

          <div className="mt-5 flex flex-col w-full">
            <button className="rounded-lg border-solid border-2 mb-1 py-3 px-4 w-full mt-2 bg-white">
              <div
                className="flex justify-center items-center gap-3"
                onClick={googleSignIn}
              >
                <img src={Google} alt="google" className="w-6" />
                <p>Sign up with Google</p>
              </div>
            </button>
            <div className="my-4 text-center">
              <p>
                Already have an account?{" "}
                <span
                  className="text-blue-500 font-semibold cursor-pointer"
                  onClick={handleClick}
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Container */}
        <div className="absolute bottom-0 w-full">
          <img src="your-bottom-image-path" alt="Bottom Image" className="w-full" />
        </div>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default SignUp;
