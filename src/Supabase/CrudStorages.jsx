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

export const AddStockFromStorage = async (params) => {
  const { error, data } = await supabase
    .from(table)
    .select()
    .eq("id_branches", params.id_branches)
    .eq("id_product", params.id_product)
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

export const DeleteStorage = async (params) => {
  const { error } = await supabase.from(table).delete().eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
};
