import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { login } from "../lib/api";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const {
    mutate: loginMutation,
    isPending,
    error,
  } = useMutation<
    AxiosResponse<any>,
    AxiosError<AxiosResponse<any>>,
    loginType
  >({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message || "Logged in successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  return { loginMutation, isPending, error };
};
export default useLogin;
