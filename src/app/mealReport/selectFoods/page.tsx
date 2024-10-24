"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import FoodBox from "@/components/food/foodBox";
import useSearchFood from "@/hooks/useSearchFood";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import { dispatchUpdateMealReport } from "@/stores/mealReportStore";
import { innerShadow } from "@/utils/styles";
import { fetchFoods } from "@/services/foodService";
import { dispatchSetFoods } from "@/stores/foodStore";
import { Food } from "@/types/food";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/authContext";

const Page = () => {
  const { token } = useContext(AuthContext);
  const mealReport = useAppSelector((state) => state.mealReport.value);
  const dispatch = useAppDispatch();
  const { viewFoods, searchField } = useSearchFood();
  const [seletedFoods, setSelectedFoods] = useState<Food[]>(
    viewFoods.filter((food) =>
      mealReport?.meals.some((meal) => meal.foodID == food.id)
    )
  );
  const router = useRouter();

  const getFoods = useCallback(async () => {
    const foods: Food[] = await fetchFoods(token);
    dispatch(dispatchSetFoods(foods));
  }, [dispatch, token]);

  const selectFood = useCallback(
    (foodId: string, actionType: "add" | "delete") => {
      if (mealReport == null) return;
      if (actionType === "add") {
        const food = viewFoods.find((food) => food.id === foodId);
        if (food) setSelectedFoods((state) => [...state, food]);
        dispatch(
          dispatchUpdateMealReport({
            meals: [
              ...mealReport.meals,
              {
                id: uuidv4(),
                foodID: foodId,
                quantity: 0,
                mealReportID: mealReport.id,
              },
            ],
          })
        );
      } else {
        setSelectedFoods((state) => state.filter((f) => f.id !== foodId));
        dispatch(
          dispatchUpdateMealReport({
            meals: mealReport.meals.filter((meal) => meal.foodID != foodId),
          })
        );
      }
    },
    [dispatch, mealReport, viewFoods]
  );

  useEffect(() => {
    getFoods();
  }, [getFoods]);

  return (
    <Stack sx={{ flex: "relarive", alignItems: "center" }}>
      {searchField()}
      <Stack
        marginTop={12}
        direction={"row"}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Box
          onClick={() => {
            router.push("/food/new");
          }}
          sx={{
            ...innerShadow,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: 330,
            height: 80,
            borderRadius: 3,
            border: 3,
            borderColor: "cornflowerblue",
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              height: 30,
            }}
          >
            <Typography variant="h6">？</Typography>
          </Box>
          <Box
            sx={{
              height: 30,
            }}
          >
            <Typography variant="body1">食材を追加</Typography>
          </Box>
        </Box>
        {
          //選択中の食材を先頭に表示したい雰囲気
          [
            ...seletedFoods,
            ...viewFoods.filter((food) => !seletedFoods.includes(food)),
          ].map((food) => {
            const isSelected = mealReport?.meals.some(
              (meal) => meal.foodID == food.id
            );
            return (
              <FoodBox
                key={food.id}
                food={food}
                isSelected={isSelected}
                selectFood={selectFood}
                isSelectMode
              />
            );
          })
        }
      </Stack>
      <Button
        variant="contained"
        sx={{
          width: "75%",
          padding: 1,
          position: "fixed",
          bottom: 2,
          backgroundColor: "primary",
          zIndex: 30,
        }}
        disabled={mealReport?.meals.length === 0}
        onClick={() => router.push("/mealReport/new")}
      >
        次へ
      </Button>
    </Stack>
  );
};

export default Page;
