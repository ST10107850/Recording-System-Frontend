import { useGetUserQuery } from "../../features/user/userSlice";

export const useGetStaff = () => {
  const { data = {}, isLoading, isError, error } = useGetUserQuery();
  return {
    data,
    isLoading,
    isError,
    error,
  };
}