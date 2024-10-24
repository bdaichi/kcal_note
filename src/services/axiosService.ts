import axios from "axios";

const BASEURL = process.env.NEXT_PUBLIC_API_URL;

export const getHTTP = async (query: string, token: string) => {
  const url = BASEURL + query;
  const response = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const postHTTP = async (query: string, data: object, token: string) => {
  const response = await axios.post(BASEURL + query, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const patchHTTP = async (query: string, data: object, token: string) => {
  const response = await axios.patch(BASEURL + query, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
