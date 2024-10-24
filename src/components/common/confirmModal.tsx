import { modalStyle } from "@/utils/styles";
import { Box, Button, Modal, Stack, Typography } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  onConfirm: () => void;
};

const ConfirmModal = (props: Props) => {
  const { open, onClose, title, onConfirm } = props;
  return (
    <Modal open={open} onClose={onClose} sx={{ justifyContent: "center" }}>
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {title}
        </Typography>
        <Stack direction="row" spacing={2} className="flex justify-around mt-4">
          <Button
            onClick={onConfirm}
            sx={{ width: 90 }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          >
            はい
          </Button>
          <Button
            onClick={onClose}
            sx={{ width: 90 }}
            className="bg-slate-500 hover:bg-slate-600 text-white font-bold py-2 px-4 rounded-full"
          >
            いいえ
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
