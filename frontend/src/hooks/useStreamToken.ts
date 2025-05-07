import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import useAuthUser from "./useAuthUser";

const useStreamToken = () => {
  const { authUser } = useAuthUser();
  const { data: tokenData, isLoading } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser, // This will run only when authUser is available
  });

  return { tokenData, isLoading };
};
export default useStreamToken;
