import { useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import Google from "../assets/google.svg";
import Facebook from "../assets/facebook.svg";
import Apple from "../assets/apple.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import Back from "../assets/back.png";
import Loader from "../Components/OnboardingLoader";
import {  doc, increment, updateDoc } from "firebase/firestore";

const fetchPointsFromFirebase = async (refferalUid) => {
  await updateDoc(doc(db, "users", refferalUid), {
    points: increment(10),
  });
};

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState, reset } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const referral = queryParams.get("referral");

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async ({ fullname, email, password }) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await fetchPointsFromFirebase(referral);

      const user = userCredential.user;
      console.log(user);
      const userData = {
        fullname: fullname,
        email: email,
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("Sign Up Successful. Redirecting to home page...", {
        autoClose: 2000,
      });
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (err) {
      console.log(err, "err");
      let customErrorMessage = "An error occurred";
      if (err.code === "auth/email-already-in-use") {
        customErrorMessage =
          "Existing user. Please login with your email address.";
      }
      setErrorMessage(customErrorMessage);
      toast.error(customErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const providerSignIn = (provider) => {
    signInWithRedirect(auth, provider);
  };

  useEffect(() => {
    const getRedirectResultAsync = async () => {
      try {
        const response = await getRedirectResult(auth);
        if (response) {
          console.log("Redirect result:", response);
          navigate("/home");
        }
      } catch (error) {
        console.error("Error getting redirect result:", error);
      }
    };
    getRedirectResultAsync();
  }, [navigate]);

  const googleSignIn = () => {
    providerSignIn(googleProvider);
  };

  const facebookSignIn = () => {
    providerSignIn(facebookProvider);
  };

  const handleClick = (e) => {
    e.preventDefault();
    reset();
    navigate("/signin");
  };

  const handleBackClick = () => {
    const previousRoute = localStorage.getItem("previousRoute");
    if (previousRoute) {
      navigate(previousRoute);
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-y-5 justify-center md:items-center min-h-screen mx-lg-20 mx-6">
        <ToastContainer />
        <div
          className="w-full flex my-3 justify-between top-4"
          onClick={handleBackClick}
        >
          <img
            src={Back}
            alt="back"
            className="h-[1.5rem] w-[1.5rem] cursor-pointer"
          />
        </div>
        <h2 className="font-extrabold text-3xl mb-2">Create your account</h2>
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="lg:flex flex-col justify-center lg:items-center w-full"
        >
          <div className="flex flex-col lg:items-center mb-4 w-full">
            <label htmlFor="fullname" className="text-neutral-500">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Enter full name"
              id="fullname"
              className="placeholder outline-none border-solid border-2 p-4 focus rounded-lg lg:w-6/12 md:w-6/12 mt-2"
              {...register("fullname", { required: "required Field" })}
            />
            <span className="text-red-500 text-sm">
              {errors?.fullname && errors?.fullname?.message}
            </span>
          </div>
          <div className="flex flex-col lg:items-center mb-4 w-full">
            <label htmlFor="email-address" className="text-neutral-500">
              Email Address
            </label>
            <input
              type="email"
              name="email-address"
              placeholder="Enter email address"
              id="email-address"
              className="placeholder outline-none border-solid border-2 p-4 focus rounded-lg lg:w-6/12 md:w-6/12 mt-2"
              {...register("email", {
                required: "Required Field",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <span className="text-red-500 text-sm">
              {errors?.email && errors?.email?.message}
            </span>
          </div>
          <div className="flex flex-col lg:items-center mb-4 w-full">
            <label htmlFor="password" className="text-neutral-500">
              Input Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              id="password"
              className="placeholder outline-none border-solid border-2 p-4 focus rounded-lg lg:w-6/12 md:w-6/12 mt-2"
              {...register("password", {
                required: "Required Field",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z\d])(?=.*[!@#$%^&,.><])[A-Za-z\d!@#$%^&,.><]{8,}$/,
                  message:
                    "Password must be at least 8 characters and must include at least one letter, one digit, and one special character.",
                },
              })}
            />
            <span className="text-red-500 text-sm">
              {errors?.password && errors?.password?.message}
            </span>
          </div>
          <div className="text-center">
            <button
              className="text-center bg-[rgb(66,104,251)] text-white text-lg font-semibold cursor-pointer py-4 px-4 rounded-lg w-full my-3 lg:w-3/6"
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
        <div className="mt-5 flex flex-col lg:items-center w-full">
          <button
            className="rounded-lg border-solid border-2 mb-1 py-3 px-4 w-full lg:w-3/6 md:w-3/6 mt-2"
            onClick={googleSignIn}
          >
            <div className="flex justify-center items-center gap-3">
              <img src={Google} alt="google" className="w-6" />
              <p>Sign up with Google</p>
            </div>
          </button>
          <button
            className="rounded-lg border-solid border-2 mb-1 py-3 px-4 w-full lg:w-3/6 md:w-3/6 mt-2"
            onClick={facebookSignIn}
          >
            <div className="flex justify-center items-center gap-3">
              <img src={Facebook} alt="facebook" className="w-6" />
              <p>Sign up with Facebook</p>
            </div>
          </button>
          <button className="rounded-lg border-solid border-2 mb-1 py-3 px-4 w-full lg:w-3/6 md:w-3/6 mt-2">
            <div className="flex justify-center items-center gap-3">
              <img src={Apple} alt="apple" className="w-8 p-0" />
              <p>Sign up with Apple</p>
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
      {isLoading && <Loader />}
    </>
  );
};

export default SignUp;
