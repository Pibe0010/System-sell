import { supabase } from "../index";

const table = "roles";

export const AddRoleName = async (params) => {
  const { data, error } = await supabase
    .from(table)
    .select()
    .eq("name", params.name)
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
