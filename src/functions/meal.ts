import { Food } from "@/types/food";
import { Meal, MealReport } from "@/types/mealReport";

// 食べた量に応じてカロリーを計算
export const kcalAmount = (acc: number, meal: Meal, foods: Food[]) => {
  const food = foods.find((food) => food.id == meal.foodID);
  return (
    acc +
    Math.round(((food?.kcal ?? 0) / (food?.quantity ?? 0)) * meal.quantity)
  );
};

// 食べた量に応じて炭水化物を計算
export const carbAmount = (acc: number, meal: Meal, foods: Food[]) => {
  const food = foods.find((food) => food.id == meal.foodID);
  return (
    acc +
    Math.round(((food?.carb ?? 0) / (food?.quantity ?? 0)) * meal.quantity)
  );
};

// 食べた量に応じてタンパク質を計算
export const proteinAmount = (acc: number, meal: Meal, foods: Food[]) => {
  const food = foods.find((food) => food.id == meal.foodID);
  return (
    acc +
    Math.round(((food?.protein ?? 0) / (food?.quantity ?? 0)) * meal.quantity)
  );
};

// 食べた量に応じて脂質を計算
export const fatAmount = (acc: number, meal: Meal, foods: Food[]) => {
  const food = foods.find((food) => food.id == meal.foodID);
  return (
    acc + Math.round(((food?.fat ?? 0) / (food?.quantity ?? 0)) * meal.quantity)
  );
};
