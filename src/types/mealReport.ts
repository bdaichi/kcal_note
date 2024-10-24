export type MealReport = {
  id: string;
  meals: Meal[];
  operatedAt: string;
  templateFlg: boolean;
  memo: string;
  creatorID: string;
  label: MealReportLabel;
};

export type Meal = {
  id: string;
  foodID: string;
  quantity: number;
  mealReportID?: string;
};

export type MealReportLabel = "morning" | "lunch" | "dinner" | "snack";
