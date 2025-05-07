import { useQuery } from "@tanstack/react-query";
import { getUserFriends } from "../lib/api";

const useFriend = () => {
  const { data: friends, isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });
  return { friends, loadingFriends };
};
export default useFriend;
