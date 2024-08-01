import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../../pages/Main";
import RepoPage from "../../pages/Repo";

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/repository/:id" element={<RepoPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
