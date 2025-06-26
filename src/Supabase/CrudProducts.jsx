import Swal from "sweetalert2";
import { supabase } from "../index";
const table = "products";

export const InsertProduct = async (params) => {
  const { error, data } = await supabase.rpc("insert_product", params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
};

export const AddProduct = async (params) => {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("id_company", params.id_company)
    .order("id", { ascending: false });

  return data;
};

export const SearchProduct = async (params) => {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("id_company", params.id_company)
    .ilike("name", "%" + params.description + "%");

  return data;
};

export const DeleteProduct = async (params) => {
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

export const UpdateProduct = async (params, fileOld, fileNew) => {
  const { error } = await supabase.rpc("update_categories", params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
};
