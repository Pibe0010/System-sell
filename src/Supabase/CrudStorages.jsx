import Swal from "sweetalert2";
import { supabase } from "../index";
const table = "storages";

export const InsertStorage = async (params) => {
  const { error, data } = await supabase.from(table).insert(params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
};
