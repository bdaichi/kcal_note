import { BodyReport } from "@/types/bodyReport";
import { getHTTP, patchHTTP, postHTTP } from "./axiosService";
const path = "body-reports";

export const fetchBodyReports = async (token: string) => {
  const response = await getHTTP(path, token);
  return response;
};

export const fetchBodyReport = async (id: string, token: string) => {
  const response = await getHTTP(`${path}/${id}`, token);
  return response;
};

export const postBodyReport = async (data: BodyReport, token: string) => {
  const response = await postHTTP(path, data, token);
  return response;
};

export const patchBodyReport = async (data: BodyReport, token: string) => {
  const response = await patchHTTP(`${path}/${data.id}`, data, token);
  return response;
};

export const deleteBodyReport = async (data: BodyReport, token: string) => {
  const updateBodyReport = {
    ...data,
    archivedAt: new Date().toISOString(),
  };
  const response = await postHTTP(
    `${path}/${data.id}`,
    updateBodyReport,
    token
  );
  return response;
};
