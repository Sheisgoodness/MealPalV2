import React from "react";
import ReactDOM from "react-dom";
import {createRoot} from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { ToastContainer } from "react-toastify";
import { BookmarkProvider } from "./Contexts/BookmarkContext.jsx";


createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <ToastContainer />
          <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
