"use client";

import { Box, Modal, Stack, Typography } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";
import { format } from "date-fns";
import { useCallback, useContext, useEffect, useState } from "react";
import BodyReportCalender from "@/components/bodyReport/bodyReportCalendar";
import { BodyReport } from "@/types/bodyReport";
import {
  fetchBodyReports,
  patchBodyReport,
  postBodyReport,
} from "@/services/bodyReportService";
import { AuthContext } from "@/contexts/authContext";
import BodyReportDetailModal from "@/components/bodyReport/bodyReportDetailModal";
import { useAppDispatch, useAppSelector } from "@/stores/store";
import {
  BodyReportStore,
  dispatchInitializeBodyReport,
  dispatchUpdateBodyReport,
} from "@/stores/bodyReportStore";
import { formatDateString } from "@/functions/common";
import BodyReportLineChart from "@/components/bodyReport/bodyReportLineChart";
import { modalStyle } from "@/utils/styles";

const Page = () => {
  const { currentUser, token } = useContext(AuthContext);
  const dispatch = useAppDispatch();
  const today = format(new Date(), "yyyyMMdd");
  const [bodyReports, setBodyReports] = useState<BodyReport[]>([]);
  const [isOpenDetailModal, setIsOpenDetailModal] = useState<boolean>(false);
  const [isOpenHelp, setOpenHelp] = useState<boolean>(false);
  const bodyReport = useAppSelector((state) => state.bodyReport);

  const getBodyReports = useCallback(async () => {
    if (token == "") return;
    const response = await fetchBodyReports(token);
    setBodyReports(response);
  }, [token]);

  const serchBodyReport = (operatedAt: string): BodyReportStore => {
    const existedBodyReport = bodyReports.find((bodyReport) => {
      return bodyReport.operatedAt === operatedAt;
    });
    if (existedBodyReport) {
      return {
        value: existedBodyReport,
        actionType: "update",
      };
    } else {
      return {
        value: {
          ...bodyReport.value,
          operatedAt: operatedAt,
        },
        actionType: "create",
      };
    }
  };

  const handleSaved = useCallback(
    async (weight: number, bodyImage: string, memo: string) => {
      const bodyReportData: BodyReport = {
        ...bodyReport.value,
        weight: weight,
        bodyImage: bodyImage,
        memo: memo,
        creatorID: currentUser?.uid ?? "",
      };
      if (bodyReport.actionType === "create") {
        await postBodyReport(bodyReportData, token);
      } else {
        await patchBodyReport(bodyReportData, token);
      }
      setIsOpenDetailModal(false);
      getBodyReports();
    },
    [bodyReport, currentUser, token, getBodyReports]
  );

  useEffect(() => {
    dispatch(dispatchInitializeBodyReport({ operatedAt: today }));
    getBodyReports();
  }, [getBodyReports]);

  return (
    <Stack
      direction="column"
      spacing={2}
      alignItems="center"
      justifyContent="center"
      padding={2}
    >
      <Typography variant="h4">体重記録</Typography>
      <Typography variant="h6">
        {formatDateString(bodyReport.value.operatedAt)}
      </Typography>
      <Typography variant="h6">{`目標体重：${
        currentUser?.targetWeight ?? 0
      }kg`}</Typography>
      <Box>
        <BodyReportCalender
          bodyReports={bodyReports}
          setOperatedAt={(operatedAt) => {
            dispatch(dispatchUpdateBodyReport(serchBodyReport(operatedAt)));
          }}
          onEventClick={(operatedAt) => {
            dispatch(dispatchUpdateBodyReport(serchBodyReport(operatedAt)));
            setIsOpenDetailModal(true);
          }}
        />
      </Box>
      <BodyReportDetailModal
        open={isOpenDetailModal}
        onClose={() => {
          dispatch(dispatchInitializeBodyReport({ operatedAt: today }));
          setIsOpenDetailModal(false);
        }}
        onSaved={async (weight, bodyImage, memo) =>
          handleSaved(weight, bodyImage, memo)
        }
        bodyReport={bodyReport.value}
      />
      <BodyReportLineChart
        currentDate={bodyReport.value.operatedAt}
        bodyReports={bodyReports}
      />
      <HelpIcon
        onClick={() => setOpenHelp(true)}
        sx={{
          cursor: "pointer",
          position: "absolute",
          right: 10,
          top: 5,
          color: "gray",
        }}
      />
      <Modal
        open={isOpenHelp}
        onClose={() => setOpenHelp(false)}
        sx={{ justifyContent: "center" }}
      >
        <Box sx={modalStyle} height={400} width={300} textAlign={"center"}>
          <Typography variant="h6" mb={1}>
            体重管理のポイント
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
              "こんな機能を実装していてなんですが、体重を毎日記録することはおすすめしないです！\n"
            }
            {"体脂肪が落ちていても体重が増えていることがあります。\n"}
            {
              "それをわかっていても、体重が増えていると気分は下がるものです。\n変に焦って食事を減らし、それでも体重が減らずやけになって爆食するまでが一連の流れです。\n"
            }
            {"落とすべきは体重ではなく、体脂肪\n"}
            {
              "体重はあくまで目安で、おすすめなのは身体の写真を撮って記録することです。\n"
            }
            {
              "週に1回程度、同じ時間帯に撮影することで、変化を確認しやすくなります。\n"
            }
            {
              "ただ1週間で劇的に変わるなんてことはありえませんから、気長に続けてみてください。\n"
            }
            {"1ヶ月、2ヶ月と続けていくうちに、変化が見えてくるはずです。\n"}
          </Typography>
        </Box>
      </Modal>
    </Stack>
  );
};

export default Page;
