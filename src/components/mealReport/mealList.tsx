import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import MealBox from "@/components/mealReport/mealBox";
import { MealReport } from "@/types/mealReport";
import { Food } from "@/types/food";
import { innerShadow } from "@/utils/styles";
import PlusIconButton from "../common/plusIconButton";
import { useAppDispatch } from "@/stores/store";
import { dispatchUpdateMealReport } from "@/stores/mealReportStore";

type Props = {
  mealReport: MealReport;
  foods: Food[];
  isEdit: boolean;
  setMealAmount: (foodId: string, mealAmount: number) => void;
};

const MealList = (props: Props) => {
  const { mealReport, foods, isEdit, setMealAmount } = props;
  const dispatch = useAppDispatch();
  const router = useRouter();

  return (
    <Box
      sx={{
        borderRadius: 2,
        ...innerShadow,
        display: "flex",
        overflow: "auto",
        width: "100%",
        maxWidth: 250,
        backgroundColor: "gray",
      }}
    >
      {mealReport.meals.map((meal, index) => {
        const food = foods.find((food) => food.id == meal.foodID);
        return (
          <Box key={index}>
            <MealBox
              meal={meal}
              food={food}
              isEdit={isEdit}
              setMealAmount={setMealAmount}
            />
          </Box>
        );
      })}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mx: 3,
        }}
      >
        <PlusIconButton
          onClick={() => {
            dispatch(dispatchUpdateMealReport(mealReport));
            router.push("/mealReport/selectFoods");
          }}
        />
      </Box>
    </Box>
  );
};

export default MealList;
