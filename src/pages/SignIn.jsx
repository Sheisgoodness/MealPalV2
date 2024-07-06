import Apple from "../assets/apple.png";
import Google from "../assets/google.png";
import Facebook from "../assets/facebook.png";
import Loader from "../Components/OnboardingLoader";
import { useEffect, useState } from "react";
import { auth,  } from "../firebase/firebase";
import {
  signInWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider
} from "firebase/auth";
import Hide from "../assets/hide.png";
import View from "../assets/view.png";
import Back from "../assets/back.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

  const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = ({ email, password }) => {
    setIsLoading(true);    
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        console.log(user.email);
        navigate("/home");
        // toast.success("Sign In Successful. You will be redirected", {
        //   autoClose: 2000,
        //   onClose: () => {
        //     console.log("sign in successful");
        //     navigate("/home");
        //   },
        // });
      })
      .catch((err) => {
        console.log(err, "err");
        console.log(err.code);
        let customErrorMessage = "An error occurred";
        if (err.code == "auth/invalid-credential") {
          customErrorMessage =
            "User not found. Please check your email address or password.";
        }
        setErrorMessage(customErrorMessage);
        toast.error(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  const providerSignIn = (provider) => {
    setIsLoading(true);
    signInWithRedirect(auth, provider)
      // .then((result) => {
      //   const user = result.user;
      //   console.log(user.email);
      //   console.log("Successful sign in");
      // })
      .catch((err) => {
        const error = err.code;
        toast.error(error.message);
        const errorMessage = err.message;
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    const getRedirectResultAsync = async () => {
      try {
        setIsLoading(true);
        const response = await getRedirectResult(auth);
        if (response) {
          navigate("/home");
        }
      } catch (error) {
        console.error("Error getting redirect result:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getRedirectResultAsync();
  }, []);

  const googleSignIn = () => {
    providerSignIn(googleProvider);
  };
  const facebookSignIn = () => {
    providerSignIn(facebookProvider);
  };

  function handleClick(e) {
    e.preventDefault();
    reset();
    navigate("/");
  }
  
  return (
    <>
      <div className="min-h-screen flex flex-col gap-y-5 justify-center lg:items-center mx-6">
        <ToastContainer />
        <div
          className="w-full flex my-3 justify-between absolute top-4"
          onClick={() => navigate("/")}
        >
          <img
            src={Back}
            alt="back"
            className="h-[1.5rem] w-[1.5rem] ml-5 cursor-pointer"
          />
        </div>
        <h2 className="text-3xl font-extrabold mb-2">Sign into your account</h2>
        <form onSubmit={handleSubmit(handleSignIn)}>
          <div className="flex flex-col gap-1 mb-4">
            <label htmlFor="email" className="text-neutral-500">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email address"
              {...register("email", {
                required: "Required Field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              className="placeholder:text-black rounded-lg p-4 mt-2 lg:w-80 border-2 border-solid outline-none focus:border-blue-500"
            />
            <span className="text-red-500 text-sm">
              {errors?.email && errors?.email?.message}
            </span>
          </div>

          <div className="relative flex flex-col mb-4">
            <label htmlFor="password" className="text-neutral-500 mb-2">
              Input Password
            </label>
            <div className="flex items-center rounded-lg p-4 lg:w-80 border-2 border-solid focus:border-blue-500">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter password"
                className="placeholder:text-black w-full outline-none h-full appearance-none bg-transparent"
                {...register("password", {
                  required: "Required Field",
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z\d])(?=.*[!@#$%^&*.,><*])[A-Za-z\d!@#$%^&*,.><*]{8,}$/,
                    message: "Invalid password",
                  },
                })}
              />
              <span onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <img src={Hide} className="w-6" />
                ) : (
                  <img src={View} className="w-6" />
                )}
              </span>
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 block text-sm text-gray-800"
            >
              Remember Me
            </label>
          </div>
          <button
            className="lg:w-80 text-white py-4 px-4 my-4 w-full bg-[rgb(66,104,251)] lg:hover:bg-blue-600 font-semibold rounded-lg cursor-pointer outline-none border-none"
            type="submit"
          >
            Continue
          </button>
        </form>

        <div className="mt-2 flex-flex-col lg:items-center">
          <button
            className="flex items-center justify-center lg:w-80 py-2 mb-1 w-full mt-2 text-gray-800 bg-transparent border border-solid rounded-lg cursor-pointer outline-none"
            onClick={googleSignIn}
          >
            <img src={Google} alt="Icon" className="w-5 mr-2" />
            Sign in with Google
          </button>
          <button
            className="flex items-center justify-center lg:w-80 py-2 mb-1 w-full mt-2 text-gray-800 bg-transparent border border-solid rounded-lg cursor-pointer outline-none"
            onClick={facebookSignIn}
          >
            <img src={Facebook} alt="Icon" className="w-5 mr-2" />
            Sign in with Facebook
          </button>
          <button className="flex items-center justify-center lg:w-80 py-2 w-full mt-2 text-gray-800 bg-transparent border border-solid rounded-lg cursor-pointer outline-none">
            <img src={Apple} alt="Icon" className="w-5 mr-2" />
            Sign in with Apple
          </button>
        </div>

        <p className="text-gray-400 mt-1 text-center">
          Don't have an account?{" "}
          <span
            onClick={handleClick}
            className="text-blue-500 font-semibold hover:text-blue-600"
          >
            Sign Up
          </span>
        </p>
      </div>
      {isLoading && <Loader />}
    </>
  );
};

export default SignIn;