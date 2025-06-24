import { Route, Routes } from "react-router-dom";
import {
  CategorysPage,
  HomePage,
  LoginPage,
  ProtectedRoute,
  SettignsPage,
  Spinner_one,
  useCompanyStore,
  UserAuth,
  useUserStore,
} from "../index.js";
import { useQuery } from "@tanstack/react-query";

export const MyRoutes = () => {
  const { user } = UserAuth();
  const { dataUser, addUser } = useUserStore();
  const { addCompany, dataCompany } = useCompanyStore();
  const { isLoading, error } = useQuery({
    queryKey: ["add user"],
    queryFn: addUser,
    refetchOnWindowFocus: false,
  });

  const {} = useQuery({
    queryKey: ["add company", dataUser?.id],
    queryFn: () => addCompany({ _id_user: dataUser?.id }),
    enabled: !!dataUser,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner_one />;
  if (error) return <span>Error....</span>;

  return (
    <Routes>
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/settings" element={<SettignsPage />} />
        <Route path="/settings/categories" element={<CategorysPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};
