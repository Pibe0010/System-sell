import Swal from "sweetalert2";
import { supabase } from "../index";
const table = "categorys";

export const InsertCategory = async (params, file) => {
  const { error, data } = await supabase.rpc("insert_category", params);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }

  const img = file.size;

  if (img != undefined) {
    const newId = data;
    const urlImage = await upImage(newId, file);
    const updateIcon = { icon: urlImage.publicUrl, id: newId };
    await updateIconCategory(updateIcon);
  }
};

const upImage = async (idCategory, file) => {
  const url = "categorys/" + idCategory;
  const { data, error } = await supabase.storage
    .from("images")
    .upload(url, file, {
      cacheControl: "0",
      upsert: true,
    });

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }

  if (data) {
    const { data: imgUrl } = await supabase.storage
      .from("images")
      .getPublicUrl(url);

    return imgUrl;
  }
};

const updateIconCategory = async (params) => {
  const { error } = await supabase
    .from("categorys")
    .update(params)
    .eq("id", params.id);

  if (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
    return;
  }
};

export const addCategory = async (params) => {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("id_company", params.id_company)
    .order("id", { ascending: false });

  return data;
};
