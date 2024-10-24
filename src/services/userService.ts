import { getHTTP, patchHTTP, postHTTP } from "./axiosService";
import { User } from "@/types/user";

const path = "users";

export const createUser = async (data: User, token: string) => {
  const response = await postHTTP(path, data, token);
  return response;
};

export const fetchUser = async (token: string) => {
  const response = await getHTTP(path, token);
  return response;
};

export const updateUser = async (data: User, token: string) => {
  const response = await patchHTTP(path, data, token);
  return response;
};
