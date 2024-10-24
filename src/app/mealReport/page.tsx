"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HelpIcon from "@mui/icons-material/Help";
import { useCallback, useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import useWindowSize from "@/hooks/useWindowSize";
import MealInfo from "@/components/mealReport/mealInfo";
import MealReportBox from "@/components/mealReport/mealReportBox";
import { MealReport } from "@/types/mealReport";
import ConfirmModal from "@/components/common/confirmModal";
import MealReportCalender from "@/components/mealReport/mealReportCalender";
import MealReportTemplates from "@/components/mealReport/mealReportTemplates";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  kcalAmount,
  carbAmount,
  proteinAmount,
  fatAmount,
} from "@/functions/meal";
import {
  deleteMealReport,
  fetchMealReports,
} from "@/services/mealReportService";
import { dispatchInitializeMealReport } from "@/stores/mealReportStore";
import {
  carbColor,
  fatColor,
  innerShadow,
  modalStyle,
  proteinColor,
} from "@/utils/styles";
import PlusIconButton from "@/components/common/plusIconButton";
import { AuthContext } from "@/contexts/authContext";
import Loading from "@/components/common/loading";
import { formatDateString } from "@/functions/common";

const Page = () => {
  const { token, currentUser } = useContext(AuthContext);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [width] = useWindowSize();
  const foods = useAppSelector((state) => state.foods.value);
  const searchParams = useSearchParams();
  const queryOperatedAt = searchParams.get("operatedAt");
  const today =
    queryOperatedAt == undefined
      ? format(new Date(), "yyyyMMdd")
      : queryOperatedAt;
  const [openHelp, setOpenHelp] = useState<boolean>(false);
  const [operatedAt, setOperatedAt] = useState<string>(today);
  const [isOpenCalender, setIsOpenCalender] = useState<boolean>(false);
  const [mealReports, setMealReports] = useState<MealReport[]>([]);
  const [isOpenTemplate, setIsOpenTemplate] = useState<boolean>(false);
  const [deleteMealReportData, setDeleteMealReportData] =
    useState<MealReport | null>(null);
  const currentDateMealReports = mealReports.filter(
    (mealReport) => mealReport.operatedAt.replaceAll("-", "") === operatedAt
  );
  const templateMealReports = mealReports.filter(
    (mealReport) => mealReport.templateFlg
  );

  const getMealReports = useCallback(async () => {
    const mealReports = await fetchMealReports(token);
    setMealReports(mealReports);
  }, [token]);

  const hanbleDeleteMealReport = useCallback(async () => {
    if (deleteMealReportData == null) return;
    await deleteMealReport(
      deleteMealReportData.id,
      deleteMealReportData,
      token
    );
    setMealReports(
      mealReports.filter(
        (mealReport) => deleteMealReportData.id !== mealReport.id
      )
    );
    setDeleteMealReportData(null);
  }, [
    deleteMealReportData,
    mealReports,
    setMealReports,
    setDeleteMealReportData,
  ]);

  useEffect(() => {
    if (currentUser == null) return;
    getMealReports();
  }, [getMealReports, currentUser]);

  if (!currentUser)
    return <Loading isLoading={!currentUser} onClose={() => void 0} />;

  const totalKcal = currentDateMealReports.reduce((acc, mealReport) => {
    return (
      acc +
      mealReport.meals.reduce((acc, meal) => {
        return kcalAmount(acc, meal, foods);
      }, 0)
    );
  }, 0);

  const totalCarb = currentDateMealReports.reduce((acc, mealReport) => {
    return (
      acc +
      mealReport.meals.reduce((acc, meal) => {
        return carbAmount(acc, meal, foods);
      }, 0)
    );
  }, 0);

  const totalProtein = currentDateMealReports.reduce((acc, mealReport) => {
    return (
      acc +
      mealReport.meals.reduce((acc, meal) => {
        return proteinAmount(acc, meal, foods);
      }, 0)
    );
  }, 0);

  const totalFat = currentDateMealReports.reduce((acc, mealReport) => {
    return (
      acc +
      mealReport.meals.reduce((acc, meal) => {
        return fatAmount(acc, meal, foods);
      }, 0)
    );
  }, 0);

  return (
    <Stack sx={{ alignItems: "center" }}>
      <Stack
        flexDirection={"row"}
        sx={{ marginY: 2, mr: 3 }}
        alignItems={"center"}
      >
        <CalendarMonthIcon
          sx={{ cursor: "pointer", mr: 2, height: 30, width: 30 }}
          onClick={() => setIsOpenCalender(true)}
        />
        <Typography variant="h6">
          {`${formatDateString(operatedAt)}日の食事記録`}
        </Typography>
      </Stack>
      {currentDateMealReports.length > 0 && (
        <Stack
          flexDirection={"row"}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          {currentDateMealReports.map((mealReport, index) => (
            <Stack key={mealReport.id}>
              <Stack
                flexDirection={"row"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography variant="h6" sx={{ mx: 2 }}>{`${
                  index + 1
                }食目`}</Typography>
                <Button
                  variant="contained"
                  onClick={() => setDeleteMealReportData(mealReport)}
                  sx={{
                    backgroundColor: "red",
                    borderRadius: 1,
                    mx: 1,
                    width: 70,
                    height: 22,
                  }}
                >
                  <Typography variant="caption" sx={{ color: "white" }}>
                    削除
                  </Typography>
                </Button>
              </Stack>
              <MealReportBox mealReport={mealReport} foods={foods} />
            </Stack>
          ))}
        </Stack>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ...innerShadow,
          backgroundColor: "white",
          flexDirection: "column",
          borderRadius: 3,
          height: 200,
          width: 250,
        }}
      >
        <PlusIconButton
          onClick={() => {
            dispatch(
              dispatchInitializeMealReport({
                operatedAt,
              })
            );
            router.push("/mealReport/selectFoods");
          }}
        />
        <Button
          onClick={() => setIsOpenTemplate(true)}
          variant="contained"
          sx={{
            mt: 1,
            backgroundColor: "primary",
            color: "white",
            borderRadius: 5,
          }}
        >
          テンプレートから登録
        </Button>
      </Box>
      <Box sx={{ m: 2 }} width={"80%"} minWidth={250} maxWidth={400}>
        <Box
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            p: 2,
            position: "relative",
          }}
        >
          <HelpIcon
            onClick={() => setOpenHelp(true)}
            sx={{
              cursor: "pointer",
              position: "absolute",
              right: 4,
              top: 2,
              color: "gray",
            }}
          />
          <MealInfo
            kcal={totalKcal}
            carb={totalCarb}
            protein={totalProtein}
            fat={totalFat}
            widthRate={width / 900}
            pfcParamaterHeight={7}
            totalMode
          />
        </Box>
      </Box>
      {currentDateMealReports.length != 0 && (
        <>
          <PieChart
            sx={{ my: 2, alignSelf: "center" }}
            colors={[carbColor, proteinColor, fatColor]}
            series={[
              {
                arcLabel: (arc) => {
                  const total = totalCarb * 4 + totalProtein * 4 + totalFat * 9;
                  const percent = Math.floor(
                    ((arc.id == "fat" ? arc.value * 9 : arc.value * 4) /
                      total) *
                      100
                  );
                  return `${percent}%`;
                },
                data: [
                  {
                    id: "carb",
                    value: totalCarb,
                    label: "C 炭水化物",
                    color: carbColor,
                  },
                  {
                    id: "protein",
                    value: totalProtein,
                    label: "P タンパク質",
                    color: proteinColor,
                  },
                  {
                    id: "fat",
                    value: totalFat,
                    label: "F 脂質",
                    color: fatColor,
                  },
                ],
              },
            ]}
            width={400}
            height={150}
          />
          <Typography color={"red"} variant="caption">
            ※差分はその他の栄養素
          </Typography>
        </>
      )}
      <ConfirmModal
        open={deleteMealReportData != null}
        onClose={() => setDeleteMealReportData(null)}
        onConfirm={() => hanbleDeleteMealReport()}
        title="食事報告を削除しますか？"
      />
      <MealReportCalender
        open={isOpenCalender}
        onClose={() => setIsOpenCalender(false)}
        setOperatedAt={setOperatedAt}
        mealReports={mealReports}
      />
      <MealReportTemplates
        templates={templateMealReports}
        operatedAt={operatedAt}
        open={isOpenTemplate}
        onClose={() => setIsOpenTemplate(false)}
        foods={foods}
        refresh={() => {
          getMealReports();
        }}
      />
      <Modal
        open={openHelp}
        onClose={() => setOpenHelp(false)}
        sx={{ justifyContent: "center" }}
      >
        <Box sx={modalStyle} height={400} width={300} textAlign={"center"}>
          <Typography variant="h6" mb={1}>
            摂取必要量について
          </Typography>
          <Typography
            sx={{
              lineHeight: 1.8,
              whiteSpace: "pre-wrap",
              overflow: "hidden",
              fontSize: 13,
            }}
          >
            {
              "カロリーはダイエット中の場合、必要量を下回ることを意識してください。\n維持の場合は必要量を摂取し、増量の場合は必要量以上を摂取できるよう心がけましょう。"
            }
            {
              "\n\nタンパク質は筋肉を作るために必要です。筋トレをしている場合は特に意識して摂取しましょう。\n男性の場合は体重×2~2.5g、女性の場合は体重×1.5~2gが目安です。少しくらい摂取量を超えても問題ありません。"
            }
            {
              "\n\n炭水化物は減量中、維持の場合は摂取量を超えないようにしましょう。\nまた、ケトジェニックダイエットをしている場合は50g以下と控えめに摂取するようにしましょう。"
            }
            {
              "\n\n脂質は体温を保つために必要ですが、ローファットをしている場合は過剰摂取は控えるようにしましょう。\n逆にケトジェニックダイエットをしている場合は脂質を恐れず多めに摂取するようにしましょう。"
            }
            {
              "\n\nこの数値はあくまで目安で、人によっては炭水化物の消化が良い人もいれば、脂質のほうが消化が良い人もいます。\n自分に合ったバランスを見つけるようにしましょう。\nまたどれも必要な栄養素ですので、極端に摂取を控えることは避けましょう。"
            }
            {"\n\n詳しい内容は「知識」をご覧ください。"}
          </Typography>
        </Box>
      </Modal>
    </Stack>
  );
};

export default Page;
