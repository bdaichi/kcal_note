"use client";

import { AuthContext } from "@/contexts/authContext";
import { validateNumberInput } from "@/functions/common";
import useFoodImage from "@/hooks/useFoodImage";
import { postFood } from "@/services/foodService";
import { dispatchAddFood } from "@/stores/foodStore";
import { dispatchAddMeal } from "@/stores/mealReportStore";
import { useAppDispatch } from "@/stores/store";
import { Food } from "@/types/food";
import { textFiledSlotProps } from "@/utils/styles";
import { Button, Stack, TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
  const { token } = useContext(AuthContext);
  const router = useRouter();
  const foodID = uuidv4();
  const dispatch = useAppDispatch();
  const [foodName, setFoodName] = useState<string>("");
  const [kcal, setKcal] = useState<number>(0);
  const [carb, setCarb] = useState<number>(0);
  const [protein, setProtein] = useState<number>(0);
  const [fat, setFat] = useState<number>(0);
  const [note, setNote] = useState<string>("");
  const { imageField, image } = useFoodImage({ foodName: foodName });

  const createCustomFood = async () => {
    const food: Food = {
      id: foodID,
      name: foodName,
      image: image,
      category: "customize",
      baseUnit: "single",
      quantity: 1,
      kcal: kcal,
      carb: carb,
      protein: protein,
      fat: fat,
      creatorID: "",
      note: note,
    };
    await postFood(food, token);
    dispatch(dispatchAddFood(food));
    dispatch(dispatchAddMeal({ id: uuidv4(), foodID: foodID, quantity: 1 }));
    router.push("/mealReport/selectFoods");
  };

  return (
    <Stack spacing={2} alignItems={"center"}>
      {imageField()}
      <TextField
        placeholder="食品名を入力"
        value={foodName}
        onChange={(e) => setFoodName(e.target.value)}
        slotProps={textFiledSlotProps}
      />
      <TextField
        label="カロリー"
        value={kcal}
        onChange={(e) => setKcal(validateNumberInput(e.target.value))}
        slotProps={textFiledSlotProps}
      />
      <TextField
        label="炭水化物(g)"
        value={carb}
        onChange={(e) => setCarb(validateNumberInput(e.target.value))}
        slotProps={textFiledSlotProps}
      />
      <TextField
        label="タンパク質(g)"
        value={protein}
        onChange={(e) => setProtein(validateNumberInput(e.target.value))}
        slotProps={textFiledSlotProps}
      />
      <TextField
        label="脂質(g)"
        value={fat}
        onChange={(e) => setFat(validateNumberInput(e.target.value))}
        slotProps={textFiledSlotProps}
      />
      <TextField
        label="メモ"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        multiline
        maxRows={4}
      />
      <Button onClick={() => createCustomFood()}>登録する</Button>
    </Stack>
  );
};
export default Page;
