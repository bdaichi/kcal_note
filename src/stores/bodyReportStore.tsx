import { v4 as uuidv4 } from "uuid";
import { BodyReport } from "@/types/bodyReport";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

export interface BodyReportStore {
  value: BodyReport;
  actionType: "create" | "update";
}

const initialState: BodyReportStore = {
  value: {
    id: uuidv4(),
    operatedAt: format(new Date(), "yyyyMMdd"),
    weight: 0,
    bodyImage: "",
    memo: "",
    creatorID: "",
  },
  actionType: "create",
};

const bodyReportSlice = createSlice({
  name: "bodyReport",
  initialState,
  reducers: {
    dispatchInitializeBodyReport: (
      state,
      action: PayloadAction<{ operatedAt: string }>
    ) => {
      state.value = {
        ...initialState.value,
        id: uuidv4(),
        operatedAt: action.payload.operatedAt,
      };
      state.actionType = "create";
    },
    dispatchUpdateBodyReport: (
      state,
      action: PayloadAction<{
        value: {
          id?: string;
          weight?: number;
          operatedAt?: string;
          memo?: string;
          creatorID?: string;
          bodyImage?: string;
        };
        actionType?: "create" | "update";
      }>
    ) => {
      state.value = {
        id: action.payload.value.id ?? state.value.id,
        weight: action.payload.value.weight ?? state.value.weight,
        operatedAt: action.payload.value.operatedAt ?? state.value.operatedAt,
        memo: action.payload.value.memo ?? state.value.memo,
        creatorID: action.payload.value.creatorID ?? state.value.creatorID,
        bodyImage: action.payload.value.bodyImage ?? state.value.bodyImage,
      };
      state.actionType = action.payload.actionType ?? state.actionType;
    },
    dispatchClearBodyReport: (state) => {
      state.value = { ...initialState.value, id: uuidv4() };
      state.actionType = "create";
    },
  },
});

export const {
  dispatchUpdateBodyReport,
  dispatchClearBodyReport,
  dispatchInitializeBodyReport,
} = bodyReportSlice.actions;
export const bodyReportReducer = bodyReportSlice.reducer;
