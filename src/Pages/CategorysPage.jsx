import { useQuery } from "@tanstack/react-query";
import {
  CategoryTemplate,
  useCategoriesStore,
  useCompanyStore,
} from "../index.js";

export const CategorysPage = () => {
  const { addCategories } = useCategoriesStore();
  const { dataCompany } = useCompanyStore();
  const {} = useQuery({
    queryKey: ["add categories", dataCompany?.id],
    queryFn: () => addCategories({ id_company: dataCompany?.id }),
  });

  return <CategoryTemplate />;
};
