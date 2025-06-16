import Swal from "sweetalert2";
import { supabase } from "../index";

const table = "modules";

export const AddModules = async () => {
  const { data, error } = await supabase.from(table).select();

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
