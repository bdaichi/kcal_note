import { MealReport } from "@/types/mealReport";
import { getHTTP, patchHTTP, postHTTP } from "./axiosService";

const path = "meal-reports";

export const fetchMealReports = async (token: string) => {
  const response = await getHTTP(path, token);
  return response;
};

export const fetchMealReport = async (id: string, token: string) => {
  const response = await getHTTP(`${path}/${id}`, token);
  return response;
};

export const postMealReport = async (data: MealReport, token: string) => {
  const { meals, ...mealReport } = data;
  const response = await postHTTP(
    path,
    {
      mealReport: mealReport,
      meals: meals.map((meal) => {
        return {
          ...meal,
          mealReportID: mealReport.id,
        };
      }),
    },
    token
  );
  return response;
};

export const updateMealReport = async (
  id: string,
  data: MealReport,
  token: string
) => {
  const { meals, ...mealReport } = data;
  const response = await patchHTTP(
    `${path}/${id}`,
    {
      mealReport: {
        ...mealReport,
        updatedAt: new Date().toISOString(),
      },
      meals: meals,
    },
    token
  );
  return response;
};

export const deleteMealReport = async (
  id: string,
  data: MealReport,
  token: string
) => {
  const { meals, ...mealReport } = data;
  const archivedData = {
    ...mealReport,
    meals: meals,
    archivedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const response = await patchHTTP(`${path}/${id}`, archivedData, token);
  return response;
};
