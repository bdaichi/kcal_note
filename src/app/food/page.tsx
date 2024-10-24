"use client";

import { Button, Stack } from "@mui/material";
// import FoodBox from "@/components/food/foodBox";
// import { postFood } from "@/services/foodService";
// import { Food } from "@/types/food";
// import data from "@/utils/jsons/foods.json";
// import { AuthContext } from "@/contexts/authContext";
// import { useContext } from "react";

const Page = () => {
  // const { token } = useContext(AuthContext);
  // const foods: Food[] = data.foods as Food[];

  // const createFoods = () => {
  //   foods.forEach(async (food) => {
  //     await postFood(food, token);
  //   });
  // };

  return (
    <Stack flexDirection={"row"} flexWrap={"wrap"} justifyContent={"center"}>
      {/* <Button onClick={() => createFoods()}>done</Button>
      {foods.map((food) => (
        <FoodBox key={food.id} food={food} />
      ))} */}
    </Stack>
  );
};

export default Page;
