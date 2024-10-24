import { MenuItem, Select, Stack } from "@mui/material";
import { Food } from "@/types/food";
import { MealReport, MealReportLabel } from "@/types/mealReport";
import MealInfo from "@/components/mealReport/mealInfo";
import MealList from "@/components/mealReport/mealList";
import {
  kcalAmount,
  carbAmount,
  proteinAmount,
  fatAmount,
} from "@/functions/meal";
import { useAppDispatch } from "@/stores/store";
import { dispatchUpdateMealReport } from "@/stores/mealReportStore";

type Props = {
  mealReport: MealReport;
  foods: Food[];
  isEdit?: boolean;
  setMealAmount?: (foodId: string, mealAmount: number) => void;
};

const MealReportBox = (props: Props) => {
  const disptach = useAppDispatch();
  const {
    mealReport,
    foods,
    isEdit = false,
    setMealAmount = () => void 0,
  } = props;

  const totalKcal = mealReport.meals.reduce((acc, meal) => {
    return kcalAmount(acc, meal, foods);
  }, 0);
  const totalCarb = mealReport.meals.reduce((acc, meal) => {
    return carbAmount(acc, meal, foods);
  }, 0);
  const totalProtein = mealReport.meals.reduce((acc, meal) => {
    return proteinAmount(acc, meal, foods);
  }, 0);
  const totalFat = mealReport.meals.reduce((acc, meal) => {
    return fatAmount(acc, meal, foods);
  }, 0);

  return (
    <Stack
      sx={{
        margin: 1,
        padding: 1,
        width: 260,
        backgroundColor: "white",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
        borderRadius: 2,
      }}
    >
      <Select
        value={mealReport.label}
        sx={{ height: 25, width: 80, mb: 1, alignSelf: "end", p: 0 }}
        onChange={(e) => {
          disptach(
            dispatchUpdateMealReport({
              label: e.target.value as MealReportLabel,
            })
          );
        }}
        disabled={!isEdit}
      >
        <MenuItem value="morning">朝食</MenuItem>
        <MenuItem value="lunch">昼食</MenuItem>
        <MenuItem value="dinner">夕食</MenuItem>
        <MenuItem value="snack">間食</MenuItem>
      </Select>
      <MealList
        mealReport={mealReport}
        foods={foods}
        isEdit={isEdit}
        setMealAmount={setMealAmount}
      />
      <MealInfo
        kcal={totalKcal ?? 0}
        carb={totalCarb ?? 0}
        protein={totalProtein ?? 0}
        fat={totalFat ?? 0}
      />
    </Stack>
  );
};

export default MealReportBox;
