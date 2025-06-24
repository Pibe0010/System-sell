import { useQuery } from "@tanstack/react-query";
import {
  ProductTemplate,
  Spinner_one,
  useCompanyStore,
  useProductsStore,
} from "../index.js";

export const ProductPage = () => {
  const { addProduct, searchProduct, search } = useProductsStore();
  const { dataCompany } = useCompanyStore();

  const { isLoading, error } = useQuery({
    queryKey: ["add product", dataCompany?.id],
    queryFn: () => addProduct({ id_company: dataCompany?.id }),
    enabled: !!dataCompany,
    refetchOnWindowFocus: false,
  });

  const {} = useQuery({
    queryKey: ["search product", search],
    queryFn: () =>
      searchProduct({ id_company: dataCompany?.id, description: search }),
    enabled: !!dataCompany,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner_one />;
  if (error) return <span>Error....</span>;

  return <ProductTemplate />;
};
