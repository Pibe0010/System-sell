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

  return data;
};

export const AddProduct = async (params) => {
  const { data } = await supabase.rpc("add_product", {
    _id_company: params.id_company,
  });
  return data;
};

export const SearchProduct = async (params) => {
  const { data } = await supabase.rpc("search_product", {
    _id_company: params.id_company,
    search: params.search,
  });

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

export const UpdateProduct = async (params) => {
  const { error } = await supabase.rpc("update_product", params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
};
