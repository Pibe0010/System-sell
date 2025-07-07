import { useQuery } from "@tanstack/react-query";
import {
  AfterSalesTemplate,
  useCompanyStore,
  useProductsStore,
} from "../index.js";

export const AfterSalesPage = () => {
  const { dataCompany } = useCompanyStore();
  const { searchProduct, search } = useProductsStore();

  useQuery({
    queryKey: ["search sales product", search],
    queryFn: () =>
      searchProduct({ id_company: dataCompany?.id, search: search }),
    enabled: !!dataCompany,
    refetchOnWindowFocus: false,
  });

  return <AfterSalesTemplate />;
};
