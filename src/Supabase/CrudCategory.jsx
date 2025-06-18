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
    const urlImage = await UpImage(newId, file);
    const updateIcon = { icon: urlImage.publicUrl, id: newId };
    await UpdateIconCategory(updateIcon);
  }
};

const UpImage = async (idCategory, file) => {
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

const UpdateIconCategory = async (params) => {
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

export const AddCategory = async (params) => {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("id_company", params.id_company)
    .order("id", { ascending: false });

  return data;
};

export const SearchCategory = async (params) => {
  const { data } = await supabase
    .from(table)
    .select()
    .eq("id_company", params.id_company)
    .ilike("name", "%" + params.description + "%");

  return data;
};

export const DeleteCategory = async (params) => {
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

export const UpdateCategory = async (params, fileOld, fileNew) => {
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

export const UpdateIconStorage = async (id, file) => {
  const url = "categorys/" + id;
  await supabase.storage
    .from("images")
    .update(url, file, { cacheControl: "0", upsert: true });
};
