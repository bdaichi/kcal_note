import { BodyReport } from "@/types/bodyReport";
import { Stack, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { format } from "date-fns";
import { useCallback } from "react";

type Props = {
  currentDate: string;
  bodyReports: BodyReport[];
};

const BodyReportLineChart = (props: Props) => {
  const { currentDate, bodyReports } = props;
  const currentYear = new Date(currentDate.substring(0, 4)).getFullYear();
  const currentMonth = new Date(currentDate.substring(4, 6)).getMonth() + 1;
  const lastDay = new Date(currentYear, currentMonth, 0).getDate();

  const chartData = useCallback(() => {
    const initData: BodyReport[] = Array.from({ length: lastDay }, (_, i) => {
      const operatedAt = format(
        new Date(currentYear, currentMonth - 1, i + 1),
        "yyyyMMdd"
      );
      return {
        id: "",
        operatedAt,
        weight: undefined,
        bodyImage: "",
        memo: "",
        creatorID: "",
      };
    });
    const chartData = initData.map((data) => {
      const bodyReport = bodyReports.find(
        (bodyReport) => bodyReport.operatedAt === data.operatedAt
      );
      return bodyReport?.weight || null;
    });
    return chartData;
  }, [bodyReports, currentYear, currentMonth, lastDay]);

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">{`${currentYear}年${currentMonth}月`}</Typography>
      <LineChart
        yAxis={[{ label: "体重" }]}
        xAxis={[
          {
            min: 1,
            label: "日",
            data: Array.from({ length: lastDay }, (_, i) => i + 1),
          },
        ]}
        series={[
          {
            data: chartData(),
            connectNulls: true,
            baseline: "min",
          },
        ]}
        grid={{ vertical: true, horizontal: true }}
        width={380}
        height={300}
      />
    </Stack>
  );
};

export default BodyReportLineChart;
