import { useGetInventoryQuery } from "../../features/user/inventory-slice";

export const useInventory = () => {
  const {
    data = {},
    isLoading,
    isError,
    error,
    refetch,
  } = useGetInventoryQuery();

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  };
};
