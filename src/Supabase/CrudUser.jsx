import Swal from "sweetalert2";
import { supabase } from "../index";

const table = "users";

export const AddUser = async (params) => {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("id_auth", params.id_auth)
    .maybeSingle();

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }

  return data;
};

export const InsertAdmin = async (params) => {
  const { data, error } = await supabase.from(table).insert(params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }

  return data;
};

export const AddAuthIdSupabase = async () => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }

  if (session != null) {
    const { user } = session;
    const idAtuh = user.id;
    return idAtuh;
  }
};
