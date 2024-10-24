import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import { format } from "date-fns";
import { BodyReport } from "@/types/bodyReport";

type Props = {
  setOperatedAt: (operatedAt: string) => void;
  onEventClick: (operatedAt: string) => void;
  bodyReports: BodyReport[];
};

const BodyReportCalender = (props: Props) => {
  const { setOperatedAt, onEventClick, bodyReports } = props;
  const events = bodyReports.map((bodyReport) => {
    return {
      title: `${bodyReport.weight ?? ""}kg`,
      date: bodyReport.operatedAt,
    };
  });
  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      eventClick={(arg) => {
        if (arg.event.start) onEventClick(format(arg.event.start, "yyyyMMdd"));
      }}
      dateClick={(arg) => {
        onEventClick(format(arg.dateStr, "yyyyMMdd"));
      }}
      initialView="dayGridMonth"
      headerToolbar={{
        start: "title",
        center: "",
        end: "today prev,next",
      }}
      datesSet={(arg) => {
        const currentYear = arg.view.currentStart.getFullYear();
        const currentMonth = arg.view.currentStart.getMonth() + 1;
        setOperatedAt(
          `${currentYear}${currentMonth.toString().padStart(2, "0")}01`
        );
      }}
      locales={allLocales}
      locale="ja"
      height={"auto"}
      events={events}
    />
  );
};

export default BodyReportCalender;
