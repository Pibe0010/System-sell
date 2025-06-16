import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  ProtectedRoute,
  SettignsPage,
  UserAuth,
} from "../index.js";

export const MyRoutes = () => {
  const { user } = UserAuth();
  return (
    <Routes>
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettignsPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
