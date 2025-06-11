import { useGetResellersQuery } from "../../features/user/reseller-slice";

export const useReseller = () => {
  const { data } = useGetResellersQuery();

  return {
    data,
  };
};
