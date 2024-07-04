import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuth } from "./Contexts/AuthContext";
import PrivateRoute from "./Contexts/PrivateRoute";
import CreateMealPlanPage from "./pages/CreateMealPlanPage";
import MealPointsPage from "./pages/MealPointsPage";
import MealHistoryPage from "./pages/MealHistoryPage";
import "./App.css";
import ReferralPage from "./pages/ReferralPage";
import Makepost from "./pages/makepost";
import Onboarding from "./pages/Onboarding";
import Preview from "./pages/Previewmeal";
import Mealdetails from "./pages/MealFullDetails";
import SignUp from "./pages/SignUp";
import RecommendedMeal from "./pages/RecommendedMeal";
import SelectCategory from "./Components/selectCategory";
import SignIn from "./pages/SignIn";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import CommunityPage from "./pages/CommunityPage";
import Navbar from "./Components/Navbar";
import Notification from "./pages/NotificationPage";
import Savedmeal from "./pages/Savedmeal";
import ContactUsPage from "./pages/ContactUsPage";
import SuccessPage from "./pages/SuccessPage";
import BookmarkPage from "./pages/BookmarkPage";
import FAQPage from "./pages/FAQPage";
import Report from "./pages/report";
import MealDetail from "./Components/MealDetail";
import SelectPreference from "./Components/SelectPreference";
import MealNutrientsPage from "./pages/MealNutrientsPage";
import FeedbackFormPage from "./pages/FeedbackFormPage";
import ThankYouPage from "./pages/ThankYouPage";

function App() {
  const { userLoggedIn } = useAuth();

  return (
    <div className="font-[Manrope]">
      <>
        {userLoggedIn && <Navbar />}
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route
            path="/notification"
            element={
              <PrivateRoute>
                <Notification />
              </PrivateRoute>
            }
          />
          <Route
            path="/mealpoint"
            element={
              <PrivateRoute>
                <MealPointsPage />
              </PrivateRoute>
            }
          />

          
          <Route
            path="/CreateMealPlan"
            element={
              <PrivateRoute>
                <CreateMealPlanPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/SelectPreferrence"
            element={
              <PrivateRoute>
                <SelectPreference />
              </PrivateRoute>
            }
          />
          <Route
            path="/MealNutrients"
            element={
              <PrivateRoute>
                <MealNutrientsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/FeedbackForm"
            element={
              <PrivateRoute>
                <FeedbackFormPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ThankYou"
            element={
              <PrivateRoute>
                <ThankYouPage />
              </PrivateRoute>
            }
          />
        
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <MealHistoryPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/mealhistory"
            element={
              <PrivateRoute>
                <MealHistoryPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/preview/:id"
            element={
              <PrivateRoute>
                <Preview />
              </PrivateRoute>
            }
          />
          <Route
            path="/mealdetails/:id"
            element={
              <PrivateRoute>
                <MealDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/referral"
            element={
              <PrivateRoute>
                <ReferralPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/makepost"
            element={
              <PrivateRoute>
                <Makepost />
              </PrivateRoute>
            }
          />
          <Route
            path="/selectcategory"
            element={
              <PrivateRoute>
                <SelectCategory />
              </PrivateRoute>
            }
          />
          <Route
            path="/report/:postId"
            element={
              <PrivateRoute>
                <Report />
              </PrivateRoute>
            }
          />
          <Route
            path="/communitypage"
            element={
              <PrivateRoute>
                <CommunityPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recommended"
            element={
              <PrivateRoute>
                <RecommendedMeal />
              </PrivateRoute>
            }
          />
          <Route
            path="/meal/:mealName"
            element={
              <PrivateRoute>
                <MealDetail />
              </PrivateRoute>
            }
          />

          <Route
            path="/contactUs"
            element={
              <PrivateRoute>
                <ContactUsPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/success"
            element={
              <PrivateRoute>
                <SuccessPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/bookmark"
            element={
              <PrivateRoute>
                <BookmarkPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/faq"
            element={
              <PrivateRoute>
                <FAQPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </>
    </div>
  );
}

export default App;
