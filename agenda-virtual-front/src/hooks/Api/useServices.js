import { useQuery } from "react-query";
import { getServices } from "../../services/api";

export const useGetServices = () => {
  const { data, isLoading, error } = useQuery('get-services', getServices);
  return {data, isLoading, error};
};