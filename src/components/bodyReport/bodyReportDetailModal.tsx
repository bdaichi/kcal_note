import { modalStyle, textFiledSlotProps } from "@/utils/styles";
import { Button, Modal, Stack, TextField, Typography } from "@mui/material";
import Camera from "../common/camera";
import { formatDateString, validateNumberInput } from "@/functions/common";
import { BodyReport } from "@/types/bodyReport";
import Image from "next/image";
import { dispatchUpdateBodyReport } from "@/stores/bodyReportStore";
import { useAppDispatch } from "@/stores/store";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: (weight: number, bodyImage: string, memo: string) => void;
  bodyReport?: BodyReport;
};

const BodyReportDetailModal = (props: Props) => {
  const dispatch = useAppDispatch();
  const { open, onClose, onSaved, bodyReport } = props;
  if (bodyReport == undefined) return null;
  const { weight, bodyImage, memo, operatedAt } = bodyReport;
  const takePicture = (url: string) => {
    dispatch(dispatchUpdateBodyReport({ value: { bodyImage: url } }));
  };

  return (
    <Modal open={open}>
      <Stack
        height={"100vh"}
        width={"100vw"}
        sx={{
          ...modalStyle,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">{formatDateString(operatedAt)}</Typography>
        <>
          {bodyImage == "" ? (
            <Camera height={350} width={300} takePicture={takePicture} />
          ) : (
            <Stack spacing={1}>
              <Image
                src={bodyImage ?? "/static/images/none.jpg"}
                alt="bodyImage"
                width={300}
                height={300}
                style={{ objectFit: "cover" }}
              />
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  dispatch(
                    dispatchUpdateBodyReport({ value: { bodyImage: "" } })
                  )
                }
              >
                写真を削除
              </Button>
            </Stack>
          )}
        </>
        <TextField
          sx={{ my: 2 }}
          label="体重"
          value={weight}
          onChange={(e) =>
            dispatch(
              dispatchUpdateBodyReport({
                value: { weight: validateNumberInput(e.target.value) },
              })
            )
          }
          slotProps={textFiledSlotProps}
        />
        <TextField
          label="メモ"
          value={memo}
          multiline
          onChange={(e) =>
            dispatch(
              dispatchUpdateBodyReport({ value: { memo: e.target.value } })
            )
          }
        />
        <Stack flexDirection={"row"} sx={{ my: 2, justifyContent: "center" }}>
          <Button sx={{ mx: 2 }} onClick={onClose}>
            閉じる
          </Button>
          <Button
            sx={{ mx: 2 }}
            variant="contained"
            onClick={() => onSaved(weight ?? 0, bodyImage ?? "", memo ?? "")}
          >
            保存
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
};

export default BodyReportDetailModal;
