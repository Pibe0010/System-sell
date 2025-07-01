import { useQuery } from "@tanstack/react-query";
import {
  ProductTemplate,
  Spinner_one,
  useBranchesStore,
  useCategoriesStore,
  useCompanyStore,
  useProductsStore,
} from "../index.js";

export const ProductPage = () => {
  const { addProduct, searchProduct, search } = useProductsStore();
  const { dataCompany } = useCompanyStore();
  const { addBranches } = useBranchesStore();
  const { addCategories } = useCategoriesStore();

  const { isLoading, error, refetch } = useQuery({
    queryKey: ["add product", dataCompany?.id],
    queryFn: () =>
      addProduct({ id_company: dataCompany?.id, refetchs: refetch }),

    enabled: !!dataCompany,
    refetchOnWindowFocus: false,
  });

  const {} = useQuery({
    queryKey: ["search product", search],
    queryFn: () =>
      searchProduct({ id_company: dataCompany?.id, search: search }),
    enabled: !!dataCompany,
    refetchOnWindowFocus: false,
  });

  const {} = useQuery({
    queryKey: ["add branch", dataCompany?.id],
    queryFn: () => addBranches({ id_company: dataCompany?.id }),
    enabled: !!dataCompany,
    refetchOnWindowFocus: false,
  });

  const {} = useQuery({
    queryKey: ["add cetegories", dataCompany?.id],
    queryFn: () => addCategories({ id_company: dataCompany?.id }),
    enabled: !!dataCompany,
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <Spinner_one />;
  if (error) return <span>Error....</span>;

  return <ProductTemplate />;
};
