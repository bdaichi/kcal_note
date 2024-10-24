import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import { Box, Modal } from "@mui/material";
import { format } from "date-fns";
import { modalStyle } from "@/utils/styles";
import { MealReport } from "@/types/mealReport";

type Props = {
  open: boolean;
  onClose: () => void;
  setOperatedAt: (operatedAt: string) => void;
  mealReports: MealReport[];
};

const MealReportCalender = (props: Props) => {
  const { open, onClose, setOperatedAt, mealReports } = props;

  const operatedAts = mealReports.map((mealReport) =>
    mealReport.operatedAt.substring(0, 8)
  );
  const events = operatedAts
    .filter(
      (operatedAt, index, operatedAts) =>
        operatedAts.indexOf(operatedAt) === index
    )
    .map((operatedAt) => {
      return { title: "登録済み", date: operatedAt };
    });

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...modalStyle, width: "90%", height: "90%" }}>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          dateClick={(arg) => {
            setOperatedAt(format(arg.dateStr, "yyyyMMdd"));
            onClose();
          }}
          initialView="dayGridMonth"
          locales={allLocales}
          locale="ja"
          height={"auto"}
          events={events}
        />
      </Box>
    </Modal>
  );
};

export default MealReportCalender;
