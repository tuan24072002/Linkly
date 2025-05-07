import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signup } from "../lib/api";

const useSignup = () => {
  const queryClient = useQueryClient();
  const {
    mutate: signupMutation,
    isPending,
    error,
  } = useMutation<
    AxiosResponse<any>,
    AxiosError<AxiosResponse<any>>,
    signupType
  >({
    mutationFn: signup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return { signupMutation, isPending, error };
};

export default useSignup;
