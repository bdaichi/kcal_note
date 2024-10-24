import { v4 as uuidv4 } from "uuid";
import { Meal, MealReport, MealReportLabel } from "@/types/mealReport";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface MealReportStore {
  value: MealReport;
}

const initialState: MealReportStore = {
  value: {
    id: uuidv4(),
    meals: [],
    operatedAt: "",
    templateFlg: false,
    memo: "",
    creatorID: "",
    label: "morning",
  },
};

const mealReportSlice = createSlice({
  name: "mealReport",
  initialState,
  reducers: {
    dispatchInitializeMealReport: (
      state,
      action: PayloadAction<{ operatedAt: string }>
    ) => {
      state.value = {
        ...initialState.value,
        id: uuidv4(),
        operatedAt: action.payload.operatedAt,
      };
    },
    dispatchUpdateMealReport: (
      state,
      action: PayloadAction<{
        id?: string;
        meals?: Meal[];
        operatedAt?: string;
        templateFlg?: boolean;
        memo?: string;
        creatorID?: string;
        label?: MealReportLabel;
      }>
    ) => {
      state.value = {
        id: action.payload.id ?? state.value.id,
        meals: action.payload.meals ?? state.value.meals,
        operatedAt: action.payload.operatedAt ?? state.value.operatedAt,
        templateFlg: action.payload.templateFlg ?? state.value.templateFlg,
        memo: action.payload.memo ?? state.value.memo,
        creatorID: action.payload.creatorID ?? state.value.creatorID,
        label: action.payload.label ?? state.value.label,
      };
    },
    dispatchAddMeal: (state, action: PayloadAction<Meal>) => {
      state.value.meals = [
        ...state.value.meals,
        { ...action.payload, mealReportID: state.value.id },
      ];
    },
    dispatchClearMealReport: (state) => {
      state.value = { ...initialState.value, id: uuidv4() };
    },
  },
});

export const {
  dispatchUpdateMealReport,
  dispatchClearMealReport,
  dispatchInitializeMealReport,
  dispatchAddMeal,
} = mealReportSlice.actions;
export const mealReportReducer = mealReportSlice.reducer;
