import { Route, Routes } from "react-router-dom";
import { HomePage, LoginPage } from "../index.js";

export const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
