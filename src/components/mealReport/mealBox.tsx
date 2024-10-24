import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Stack, TextField } from "@mui/material";
import { Food } from "@/types/food";
import { Meal } from "@/types/mealReport";
import FoodDetailModal from "@/components/food/foodDetailModal";
import { convertToBaseUnit } from "@/functions/food";
import { validateNumberInput } from "@/functions/common";

type Props = {
  meal: Meal;
  food: Food | undefined;
  isEdit: boolean;
  setMealAmount: (foodId: string, mealAmount: number) => void;
};

const MealBox = (props: Props) => {
  const { meal, food, isEdit, setMealAmount } = props;
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);

  return (
    <>
      <Card sx={{ height: 130, width: 100, margin: 1 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ height: 50 }}
            src={food?.image}
            alt="food"
            onClick={() => setIsOpenDetail(true)}
          />
          <CardContent
            sx={{
              display: "flex",
              margin: 0,
              paddingX: 2,
              paddingTop: 1,
              paddingBottom: 0,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body2"
              onClick={() => setIsOpenDetail(true)}
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                width: 100,
                paddingX: 1,
                textAlign: "center",
              }}
            >
              {food?.name}
            </Typography>
            <Typography variant="body2">✕</Typography>
            <Stack
              display={"flex"}
              alignItems={"center"}
              my={1}
              direction="row"
            >
              {isEdit ? (
                <TextField
                  sx={{ width: 50, marginLeft: 1.5 }}
                  slotProps={{
                    htmlInput: {
                      sx: {
                        height: 5,
                        textAlign: "center",
                        paddingX: 0,
                      },
                    },
                  }}
                  value={meal.quantity}
                  onChange={(e) =>
                    setMealAmount(
                      food?.id ?? "",
                      validateNumberInput(e.target.value)
                    )
                  }
                  size="small"
                />
              ) : (
                <Typography variant="body2">{meal.quantity}</Typography>
              )}
              <Typography variant="body2" sx={{ ml: 1 }}>
                {convertToBaseUnit(food?.baseUnit ?? "single")}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
      {food && (
        <FoodDetailModal
          open={isOpenDetail}
          onClose={() => setIsOpenDetail(false)}
          food={food}
        />
      )}
    </>
  );
};

export default MealBox;
