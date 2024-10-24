import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { foodsReducer } from "./foodStore";
import { mealReportReducer } from "./mealReportStore";
import { persistReducer, persistStore } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import { bodyReportReducer } from "./bodyReportStore";

const persistConfig = {
  key: "root",
  storage: localStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    foods: foodsReducer,
    mealReport: mealReportReducer,
    bodyReport: bodyReportReducer,
  })
);

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
