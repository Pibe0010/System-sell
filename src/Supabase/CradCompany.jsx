import Swal from "sweetalert2";
import { supabase } from "../index";

const tabla = "company";

export const InsertCompany = async (params) => {
  const { data, error } = await supabase
    .from(tabla)
    .insert(params)
    .select()
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
