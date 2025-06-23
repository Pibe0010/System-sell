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

export const AddCompanyFromId = async (params) => {
  const { data } = await supabase
    .rpc("add_company_from_id", params)
    .maybeSingle();

  return data;
};
