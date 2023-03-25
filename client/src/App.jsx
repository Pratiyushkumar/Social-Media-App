import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

import HomePage from "Scenes/homePage";
import LoginPage from "Scenes/loginPage";
import ProfilePage from "Scenes/profilePage";

const App = () => {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
