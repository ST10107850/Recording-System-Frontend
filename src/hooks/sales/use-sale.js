import { useGetSalesQuery } from "../../features/user/sale-slice";

export const useSale = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetSalesQuery();

  return {
    data,
    isLoading,
    isError,
    error,
  };
}