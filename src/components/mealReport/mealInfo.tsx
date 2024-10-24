import { Box, Stack, Typography } from "@mui/material";
import { borderStyle, carbColor, fatColor, proteinColor } from "@/utils/styles";
import {
  calculateCalorie,
  calculateCarb,
  calculateFat,
  calculateProtein,
} from "@/functions/user";
import { AuthContext } from "@/contexts/authContext";
import { useContext } from "react";

type Props = {
  kcal: number;
  protein: number;
  carb: number;
  fat: number;
  widthRate?: number;
  pfcParamaterHeight?: number;
  totalMode?: boolean; // trueの場合、合計/必要量を表示
};

const MealInfo = (props: Props) => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) return <></>;
  const { weight, stature, age, trainingLevel, gender, status, dietMethod } =
    currentUser;
  const {
    kcal,
    protein,
    carb,
    fat,
    widthRate = 1,
    pfcParamaterHeight = 2,
  } = props;
  const needKcal = calculateCalorie(
    weight,
    stature,
    age,
    trainingLevel ?? "one",
    gender ?? "other"
  );
  const pfcParamater = (lable: string, value: number, needValue: number) => {
    const borderColor = () => {
      switch (lable) {
        case "C 炭水化物":
          return carbColor;
        case "P タンパク質":
          return proteinColor;
        case "F 脂質":
          return fatColor;
        default:
          return "rgb(255, 255, 255)";
      }
    };
    return (
      <>
        <Stack
          direction={"row"}
          sx={{ justifyContent: "space-between" }}
          my={Math.round(pfcParamaterHeight) / 15}
        >
          <Typography variant="caption">{lable}</Typography>
          <Stack direction={"row"}>
            <Typography
              variant="body2"
              sx={{ textAlign: "right" }}
            >{`${Math.ceil(value)} g`}</Typography>

            {props.totalMode && (
              <>
                <Typography variant="body2" sx={{ mx: 1 }}>{`/`}</Typography>
                <Typography
                  variant="body2"
                  sx={{ mr: 1, width: 40, textAlign: "right" }}
                >{`${needValue} g`}</Typography>
              </>
            )}
          </Stack>
        </Stack>
        <Box
          sx={borderStyle(borderColor(), value * widthRate, pfcParamaterHeight)}
        />
      </>
    );
  };
  const needCarb = calculateCarb(needKcal, status, dietMethod);
  const needProtein = calculateProtein(weight, gender);
  const needFat = calculateFat(needKcal, status, dietMethod);
  return (
    <Box sx={{ mt: 1 }}>
      <Stack direction={"row"} sx={{ justifyContent: "space-between", my: 1 }}>
        <Typography variant="body1">Total</Typography>
        <Stack direction={"row"}>
          <Typography variant="body1">{Math.ceil(kcal)}kcal</Typography>
          {props.totalMode && (
            <Typography sx={{ mx: 1 }}>{`/ ${needKcal}kcal`}</Typography>
          )}
        </Stack>
      </Stack>
      {pfcParamater("C 炭水化物", carb, needCarb)}
      {pfcParamater("P タンパク質", protein, needProtein)}
      {pfcParamater("F 脂質", fat, needFat)}
    </Box>
  );
};

export default MealInfo;
