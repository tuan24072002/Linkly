import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { sendFriendRequest } from "../lib/api";
import toast from "react-hot-toast";

const useSendRequest = () => {
    const queryClient = useQueryClient();
    const { mutate: sendRequestMutation, isPending } = useMutation<
        AxiosResponse<any>,
        AxiosError<AxiosResponse<any>>,
        sendRequestType
    >({
        mutationFn: sendFriendRequest,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["outgoingFriendReqs"] }),
        onError: (data) => {
            toast.error(data.response?.data.message || "Something went wrong");
        }
    });
    return {
        sendRequestMutation,
        isPending
    }
}
export default useSendRequest