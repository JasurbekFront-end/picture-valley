import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/home/home";
import SearchedHome from "./pages/home/serachedHome";
import NotFound from "./pages/not-found/not-found";
import UserProfile from "./pages/user/user-profile";
import UserLiked from "./pages/user/user-liked";
import UserCollected from "./pages/user/user-collected";
import ScrollTo from "./scrollto";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollTo/>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/user/liked" element={<UserLiked />} />
          <Route path="/user/collected" element={<UserCollected />} />
          <Route path="/search/:query" element={<SearchedHome />} />
          <Route path="*" element={<NotFound />}/> 
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
