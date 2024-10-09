import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar"; // Adjust the import path as necessary
import Home from "./Pages/Home/Home";
import Auth from "./Pages/Auth/Auth";
import LoginCallback from "./Pages/Auth/LoginCallback"; // Add the correct import for login callback
import Questions from "./Pages/Questions/Questions";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./Pages/Questions/DisplayQuestion";
import Tags from "./Pages/Tags/Tags";
import Users from "./Pages/Users/Users";
import UserProfile from "./Pages/UserProfile/UserProfile";

const AllRoutes = ({ slideIn, handleSlideIn }) => {
  return (
    <>
      <Navbar handleSlideIn={handleSlideIn} />
      <Routes>
        <Route
          path="/"
          element={<Home slideIn={slideIn} handleSlideIn={handleSlideIn} />}
        />
        <Route path="/Auth" element={<Auth />} />
        <Route path="/auth/callback" element={<LoginCallback />} /> {/* New Route for Google Auth Callback */}
        <Route path="/AskQuestion" element={<AskQuestion />} />
        <Route
          path="/Questions"
          element={<Questions slideIn={slideIn} handleSlideIn={handleSlideIn} />}
        />
        <Route
          path="/Questions/:id"
          element={
            <DisplayQuestion slideIn={slideIn} handleSlideIn={handleSlideIn} />
          }
        />
        <Route
          path="/Tags"
          element={<Tags slideIn={slideIn} handleSlideIn={handleSlideIn} />}
        />
        <Route
          path="/Users"
          element={<Users slideIn={slideIn} handleSlideIn={handleSlideIn} />}
        />
        <Route
          path="/Users/:id"
          element={
            <UserProfile slideIn={slideIn} handleSlideIn={handleSlideIn} />
          }
        />
      </Routes>
    </>
  );
};

export default AllRoutes;
