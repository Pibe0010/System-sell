import { supabase } from "../index";

const table = "document_type";

export const AddDocumentType = async (params) => {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("id_company", params.id_company);

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
