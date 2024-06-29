import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { BookmarkProvider } from "./Contexts/BookmarkContext.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <BookmarkProvider>
          <App />
        </BookmarkProvider>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
