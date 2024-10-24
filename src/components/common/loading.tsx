import { Box, Modal, Typography } from "@mui/material";
import Image from "next/image";

type Props = {
  isLoading: boolean;
  onClose: () => void;
};

const Loading = (props: Props) => {
  return (
    <Modal
      open={props.isLoading}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClose={() => props.onClose()}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Image
          property="gif"
          src="/gif/abloading.gif"
          alt="loading"
          width={300}
          height={300}
        />
        <Typography variant="h6" sx={{ color: "white", my: 2 }}>
          Loading...
        </Typography>
      </Box>
    </Modal>
  );
};

export default Loading;
