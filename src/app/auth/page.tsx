"use client";

import Loading from "@/components/common/loading";
import { AuthContext } from "@/contexts/authContext";
import { fetchFoods } from "@/services/foodService";
import { dispatchSetFoods } from "@/stores/foodStore";
import { useAppDispatch } from "@/stores/store";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useContext, useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { currentUser, token } = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const getFoods = useCallback(async () => {
    if (token == "") return;
    dispatch(dispatchSetFoods(await fetchFoods(token)));
  }, [dispatch, token]);

  const appStart = useCallback(async () => {
    setTimeout(() => {
      setIsLoading(false);
      if (currentUser == null && token == "") {
        router.push("/auth/login");
      } else {
        getFoods();
        router.push("/mealReport");
      }
    }, 5000);
  }, [currentUser, token, router, getFoods]);

  useEffect(() => {
    appStart();
  }, [appStart]);

  return (
    <>
      {isLoading ? (
        <Loading isLoading={isLoading} onClose={() => setIsLoading(false)} />
      ) : (
        <Stack></Stack>
      )}
    </>
  );
};
export default Page;
