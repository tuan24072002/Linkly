import { axiosIntance } from "./axios";

export const signup = async (data: any): Promise<AxiosResponse<any>> => {
  const response = await axiosIntance.post("/auth/signup", data);
  return response.data;
};
export const login = async (data: any): Promise<AxiosResponse<any>> => {
  const response = await axiosIntance.post("/auth/login", data);
  await new Promise((r) => setTimeout(r, 3000));
  return response.data;
};
export const logout = async () => {
  const response = await axiosIntance.post("/auth/logout");
  return response.data;
};
export const getAuthUser = async () => {
  try {
    const response = await axiosIntance.get("/auth/me");
    return response.data;
  } catch (error) {
    console.log(`Error in getAuthUser: ${error}`);
    return null;
  }
};
export const onboard = async (data: any) => {
  const response = await axiosIntance.post("/auth/onboard", data);
  return response.data;
};
export const getUserFriends = async () => {
  const response = await axiosIntance.get("/user/friends");
  return response.data;
};
export const getRecommendedUsers = async () => {
  const response = await axiosIntance.get("/user");
  return response.data;
};
export const getOutgoingRequests = async () => {
  const response = await axiosIntance.get("/user/outgoing-friend-request");
  return response.data;
};
export const sendFriendRequest = async (data: any) => {
  const response = await axiosIntance.post(
    `/user/friend-request/${data.userId}`,
    data
  );
  return response.data;
};
export const getFriendRequests = async () => {
  const response = await axiosIntance.get("/user/friend-request");
  return response.data;
};
export const acceptFriendRequest = async (data: any) => {
  const response = await axiosIntance.put(
    `/user/friend-request/${data.requestId}/accept`,
    data
  );
  return response.data;
};
export const getStreamToken = async () => {
  const response = await axiosIntance.get("/chat/token");
  return response.data;
};
