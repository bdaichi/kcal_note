import { Food } from "@/types/food";
import { getHTTP, postHTTP } from "./axiosService";
const path = "foods";

export const fetchFoods = async (token: string) => {
  const response = await getHTTP(path, token);
  return response;
};

export const postFood = async (data: Food, token: string) => {
  const response = await postHTTP(path, data, token);
  return response;
};
