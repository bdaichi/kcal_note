"use client";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

type StoreProviderProps = {
  children: ReactNode;
};

export default function StoreProvider({
  children,
}: Readonly<StoreProviderProps>) {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      </Provider>
    </>
  );
}
