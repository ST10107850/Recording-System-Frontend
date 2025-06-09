import { useGetSuppliersQuery } from "../features/user/supplier-slice";

export const useSupplier = () => {
    const { data, isLoading, isError, error, refetch } = useGetSuppliersQuery();
    return {
        data,
        isLoading,
        isError,
        error,
        refetch
    };
}