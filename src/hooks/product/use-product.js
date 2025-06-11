import { useGetProductsQuery } from "../../features/user/product-slice";

export const useProduct = () => {
  const {
    data,
  } = useGetProductsQuery();

  return {
    data,
  };
};
