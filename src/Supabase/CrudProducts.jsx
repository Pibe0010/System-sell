import Swal from "sweetalert2";
import { supabase } from "../index";
const table = "products";

export const InsertProduct = async (params, file) => {
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
    const urlImage = await UpImage(newId, file);
    const updateIcon = { icon: urlImage.publicUrl, id: newId };
    await UpdateIconCategory(updateIcon);
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

  if (params.icon != "-") {
    const url = "categorys/" + params.id;
    await supabase.storage.from("images").remove([url]);
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

  if (fileNew != "-" && fileNew.size != undefined) {
    if (fileOld != "-") {
      await UpdateIconStorage(params._id, fileNew);
    } else {
      const dataImg = await UpImage(params._id, fileNew);
      const imageParamsUpdate = {
        icon: dataImg.publicUrl,
        id: params._id,
      };
      await UpdateIconCategory(imageParamsUpdate);
    }
  }
};
