import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { modalStyle } from "@/utils/styles";
import { MealReport } from "@/types/mealReport";
import MealReportBox from "@/components/mealReport/mealReportBox";
import { Food } from "@/types/food";
import CheckBox from "@/components/common/checkBox";
import { postMealReport, updateMealReport } from "@/services/mealReportService";
import { AuthContext } from "@/contexts/authContext";

type Props = {
  open: boolean;
  onClose: () => void;
  operatedAt: string;
  templates: MealReport[];
  foods: Food[];
  refresh: () => void;
};

type TemplateMealReport = {
  mealReport: MealReport;
  aliginalId: string;
};

const MealReportTemplates = (props: Props) => {
  const { token } = useContext(AuthContext);
  const { open, onClose, operatedAt, templates, foods, refresh } = props;
  const [viewTemplates, setViewTemplate] = useState<TemplateMealReport[]>([]);

  const [selectedTemplate, setSelectedTemplate] =
    useState<TemplateMealReport | null>(null);

  const addMealReport = async () => {
    if (selectedTemplate == null) return;
    const newMealReport: MealReport = {
      ...selectedTemplate.mealReport,
      id: uuidv4(),
      operatedAt: operatedAt,
      meals: selectedTemplate.mealReport.meals.map((meal) => {
        return {
          ...meal,
          id: uuidv4(),
        };
      }),
    };
    await postMealReport(newMealReport, token);
    setSelectedTemplate(null);
    refresh();
    onClose();
  };

  const deleteTemplate = async () => {
    if (selectedTemplate == null) return;
    const aliginalId = selectedTemplate.aliginalId;
    await updateMealReport(
      aliginalId,
      {
        ...selectedTemplate.mealReport,
        id: aliginalId,
        templateFlg: false,
      },
      token
    );
    setViewTemplate(
      viewTemplates.filter((template) => template.aliginalId != aliginalId)
    );
    setSelectedTemplate(null);
    refresh();
  };

  useEffect(() => {
    setViewTemplate(
      templates.map((template) => {
        return {
          mealReport: {
            ...template,
            id: uuidv4(), // 新たに食材を追加して食事報告画面で登録することもあるため、idを新規に生成
            templateFlg: false,
            operatedAt: operatedAt,
          },
          aliginalId: template.id,
        };
      })
    );
  }, [operatedAt, templates]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...modalStyle,
          width: "90%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack sx={{ height: "90%", overflow: "scroll" }}>
          {viewTemplates.map((template) => {
            return (
              <Box
                sx={{
                  position: "relative",
                }}
                key={template.mealReport.id}
              >
                <MealReportBox mealReport={template.mealReport} foods={foods} />
                <CheckBox
                  isChecked={
                    selectedTemplate?.aliginalId == template.aliginalId
                  }
                  onCheck={() => setSelectedTemplate(template)}
                  onUnCheck={() => setSelectedTemplate(null)}
                />
              </Box>
            );
          })}
        </Stack>
        <Stack flexDirection={"row"}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary",
              color: "white",
              mt: 8,
              mx: 2,
            }}
            onClick={addMealReport}
            disabled={selectedTemplate == null}
          >
            <Typography color="white">登録する</Typography>
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "red",
              color: "white",
              mt: 8,
              mx: 2,
            }}
            onClick={deleteTemplate}
            disabled={selectedTemplate == null}
          >
            <Typography color="white">削除する</Typography>
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default MealReportTemplates;
