import { Food } from "@/types/food";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface FoodsStore {
  value: Food[];
}

const initialState: FoodsStore = {
  value: [],
};

const foodsSlice = createSlice({
  name: "foods",
  initialState,
  reducers: {
    dispatchSetFoods: (state, action: PayloadAction<Food[]>) => {
      state.value = action.payload;
    },
    dispatchAddFood: (state, action: PayloadAction<Food>) => {
      state.value = [action.payload, ...state.value];
    },
  },
});

export const { dispatchSetFoods, dispatchAddFood } = foodsSlice.actions;
export const foodsReducer = foodsSlice.reducer;
