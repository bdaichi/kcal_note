import Image from "next/image";
import { useState } from "react";
import { Box, Modal, Stack, TextField, Typography } from "@mui/material";
import { Food } from "@/types/food";
import { innerShadow, modalStyle } from "@/utils/styles";
import MealInfo from "@/components/mealReport/mealInfo";
import { convertToBaseUnit } from "@/functions/food";
import { validateNumberInput } from "@/functions/common";

type Props = {
  open: boolean;
  onClose: () => void;
  food: Food;
};

const FoodDetailModal = (props: Props) => {
  const { open, onClose, food } = props;

  const [amount, setAmount] = useState<number>(food.quantity);

  const foodKcal = (food.kcal / food.quantity) * amount;
  const foodProtein = (food.protein / food.quantity) * amount;
  const foodFat = (food.fat / food.quantity) * amount;
  const foodCarb = (food.carb / food.quantity) * amount;

  return (
    <Modal open={open} onClose={onClose} sx={{ justifyContent: "center" }}>
      <Box
        sx={{
          ...modalStyle,
          width: "80%",
          height: "60%",
          maxWidth: 400,
          maxHeight: 450,
        }}
      >
        <Stack>
          <Image
            style={{ alignSelf: "center", margin: 0, padding: 0 }}
            src={food.image}
            height={200}
            alt="food"
            width={250}
          />
          <Stack
            sx={{ my: 2 }}
            flexDirection={"row"}
            justifyContent={"space-between"}
          >
            <Typography variant="body1">{food.name}</Typography>
            <Stack flexDirection={"row"}>
              <TextField
                value={amount}
                sx={{ width: 50, marginLeft: 1.5 }}
                slotProps={{
                  htmlInput: {
                    sx: { height: 8, textAlign: "center", paddingX: 0 },
                  },
                }}
                size="small"
                onChange={(e) => setAmount(validateNumberInput(e.target.value))}
              />
              <Typography sx={{ alignSelf: "end", ml: 0.5 }} variant="body2">
                {convertToBaseUnit(food.baseUnit)}
              </Typography>
            </Stack>
          </Stack>
          <MealInfo
            kcal={foodKcal}
            carb={foodCarb}
            protein={foodProtein}
            fat={foodFat}
          />
          <Box
            sx={{
              width: "95%",
              height: 100,
              overflow: "scroll",
              display: "block",
              ...innerShadow,
              px: 2,
              py: 1,
              my: 1,
            }}
          >
            <Typography
              sx={{ borderBottom: "1px solid gray", px: 0.5 }}
              variant="caption"
            >
              Note
            </Typography>
            <Typography variant="caption">{food.note}</Typography>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
};

export default FoodDetailModal;
