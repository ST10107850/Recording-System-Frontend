import { useGetVendorsQuery } from "../../features/user/vendorSlice";

export const useVendor = () => {
  const { data = {}, isLoading, isError, error } = useGetVendorsQuery();
  return {
    data,
    isLoading,
    isError,
    error,
  };
};
