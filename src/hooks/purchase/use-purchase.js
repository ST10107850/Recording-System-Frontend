import { useGetPurchasesQuery } from "../../features/user/purchase-slice";

export const usePurchase = () => {
  const { data={}, isLoading, isError, error } = useGetPurchasesQuery();
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
