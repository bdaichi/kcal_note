"use client";

import { Button, Icon, Stack, Typography } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useEffect, useState, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import MealReportBox from "@/components/mealReport/mealReportBox";
import { useAppSelector, useAppDispatch } from "@/stores/store";
import {
  dispatchClearMealReport,
  dispatchUpdateMealReport,
} from "@/stores/mealReportStore";
import {
  fetchMealReport,
  postMealReport,
  updateMealReport,
} from "@/services/mealReportService";
import { AuthContext } from "@/contexts/authContext";

const Page = () => {
  const { token } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const mealReport = useAppSelector((state) => state.mealReport.value);
  const router = useRouter();
  const foods = useAppSelector((state) => state.foods.value);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const checkMealReportExist = useCallback(async () => {
    if (mealReport) {
      const response = await fetchMealReport(mealReport.id, token);
      if (response) {
        setIsEdit(true);
      }
    }
  }, []);

  const setMealAmount = (foodID: string, quantity: number) => {
    if (mealReport == null) return;
    dispatch(
      dispatchUpdateMealReport({
        meals: mealReport.meals.map((meal) =>
          meal.foodID === foodID ? { ...meal, quantity } : meal
        ),
      })
    );
  };

  const addMealReport = async () => {
    if (mealReport == null) return;
    await postMealReport(mealReport, token);
    dispatch(dispatchClearMealReport());
    router.push("/mealReport?operatedAt=" + mealReport.operatedAt);
  };

  const editMealReport = async () => {
    if (mealReport == null) return;
    const operatedAt = mealReport.operatedAt.replaceAll("-", "");
    await updateMealReport(mealReport.id, mealReport, token);
    dispatch(dispatchClearMealReport());
    router.push("/mealReport?operatedAt=" + operatedAt.substring(0, 8));
  };

  const updateTemplateFlg = async (templateFlg: boolean) => {
    if (mealReport == null) return;
    dispatch(
      dispatchUpdateMealReport({
        templateFlg,
      })
    );
  };

  useEffect(() => {
    checkMealReportExist();
  }, [checkMealReportExist]);

  return (
    <Stack sx={{ alignItems: "center" }} spacing={3} my={2}>
      {mealReport && (
        <MealReportBox
          mealReport={mealReport}
          foods={foods}
          isEdit
          setMealAmount={setMealAmount}
        />
      )}
      {isEdit ? (
        <Button variant="contained" onClick={() => editMealReport()}>
          食事を更新
        </Button>
      ) : (
        <Button variant="contained" onClick={() => addMealReport()}>
          食事を登録
        </Button>
      )}
      <Button
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        variant="text"
        onClick={() => updateTemplateFlg(!mealReport?.templateFlg)}
      >
        {mealReport?.templateFlg ? (
          <CheckBoxIcon />
        ) : (
          <CheckBoxOutlineBlankIcon />
        )}
        <Typography
          variant="body2"
          sx={{ color: mealReport?.templateFlg ? "red" : "primary", mx: 0.1 }}
        >
          {mealReport?.templateFlg
            ? "テンプレートを解除"
            : "テンプレートに登録"}
        </Typography>
      </Button>
    </Stack>
  );
};

export default Page;
