import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  CardActionArea,
  CardActions,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { Food } from "@/types/food";
import FoodDetailModal from "@/components/food/foodDetailModal";
import { borderStyle, carbColor, fatColor, proteinColor } from "@/utils/styles";
import CheckBox from "@/components/common/checkBox";
import { convertToBaseUnit } from "@/functions/food";

type Props = {
  food: Food;
  isSelected?: boolean;
  isSelectMode?: boolean;
  selectFood?: (foodId: string, actionType: "add" | "delete") => void;
};

const cardActionStyle = {
  position: "absolute",
  bottom: 4,
  right: 4,
  zIndex: 1,
};

const FoodBox = (props: Props) => {
  const {
    food,
    isSelected,
    isSelectMode = false,
    selectFood = () => void 0,
  } = props;
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(false);
  const isPC = useMediaQuery("(max-width:500px)");

  const checkBoxField = () => {
    if (!isSelectMode) return;
    return (
      <CheckBox
        isChecked={isSelected ?? false}
        onCheck={() => selectFood(food.id, "add")}
        onUnCheck={() => selectFood(food.id, "delete")}
      />
    );
  };

  const foodNameStyle = (width: number) => {
    return {
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      width: width,
    };
  };

  const pfcField = (height: number) => {
    return (
      <CardContent sx={{ marginBottom: 1, paddingX: 2, paddingY: 0 }}>
        <Typography variant="caption">{`C 炭水化物 ${food.carb} g`}</Typography>
        <Box sx={borderStyle(carbColor, food.carb, height)} />
        <Typography variant="caption">
          {`P タンパク質 ${food.protein} g`}
        </Typography>
        <Box sx={borderStyle(proteinColor, food.protein, height)} />
        <Typography variant="caption">{`F 脂質 ${food.fat} g`}</Typography>
        <Box sx={borderStyle(fatColor, food.fat, height)} />
      </CardContent>
    );
  };

  return (
    <>
      <Card sx={{ width: 345, margin: 1, position: "relative" }}>
        {checkBoxField()}
        {isPC ? (
          <CardActionArea
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "start",
              justifyContent: "start",
              padding: 2,
            }}
          >
            <CardMedia
              component="img"
              sx={{ height: 100, width: 100, borderRadius: 1 }}
              src={food.image}
              alt="food"
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                justifyContent: "start",
                p: 0,
                m: 0,
                height: 100,
              }}
            >
              <Stack mx={2} direction={"row"} alignItems={"center"}>
                <Typography sx={foodNameStyle(60)} variant="body2">
                  {food.name}
                </Typography>
                <Typography
                  sx={{ mx: 1 }}
                  variant="body2"
                  color="text.secondary"
                >
                  {`${food.quantity} ${convertToBaseUnit(food.baseUnit)}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${food.kcal} kcal`}
                </Typography>
              </Stack>
              {pfcField(4)}
            </CardContent>
          </CardActionArea>
        ) : (
          <CardActionArea>
            <CardMedia
              component="img"
              sx={{ height: 170 }}
              src={food.image}
              alt="food"
            />
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                margin: 0,
                paddingX: 2,
                paddingTop: 1,
                paddingBottom: 0,
              }}
            >
              <Typography sx={foodNameStyle(250)} gutterBottom variant="h6">
                {food.name}
              </Typography>
              <CardContent
                sx={{
                  margin: 0,
                  paddingX: 0,
                  flexDirection: "column",
                  alignItems: "end",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {`${food.quantity} ${convertToBaseUnit(food.baseUnit)}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`${food.kcal} kcal`}
                </Typography>
              </CardContent>
            </CardContent>
            {pfcField(8)}
          </CardActionArea>
        )}
        <CardActions onClick={() => setIsOpenDetail(true)} sx={cardActionStyle}>
          <Typography variant="body2" color="primary">
            詳細
          </Typography>
        </CardActions>
      </Card>

      <FoodDetailModal
        open={isOpenDetail}
        onClose={() => setIsOpenDetail(false)}
        food={food}
      />
    </>
  );
};

export default FoodBox;
