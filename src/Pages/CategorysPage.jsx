import { useQuery } from "@tanstack/react-query";
import {
  CategoryTemplate,
  Spinner_one,
  useCategoriesStore,
  useCompanyStore,
} from "../index.js";

export const CategorysPage = () => {
  const { addCategories, searchCategories, search } = useCategoriesStore();
  const { dataCompany } = useCompanyStore();

  const { isLoading, error } = useQuery({
    queryKey: ["add categories", dataCompany?.id],
    queryFn: () => addCategories({ id_company: dataCompany?.id }),
    enabled: !!dataCompany,
    refetchOnWindowFocus: false,
  });

  const {} = useQuery({
    queryKey: ["search categories", search],
    queryFn: () =>
      searchCategories({ id_company: dataCompany?.id, description: search }),
    enabled: !!dataCompany,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner_one />;
  if (error) return <span>Error....</span>;

  return <CategoryTemplate />;
};
