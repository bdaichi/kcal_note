import { useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { Box, Button, Stack } from "@mui/material";

type Props = {
  height: number;
  width: number;
  takePicture: (url: string) => void;
};
const Camera = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { height, width, takePicture } = props;
  const videoConstraints = {
    facingMode: { exact: "environment" },
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      takePicture(imageSrc);
    }
  }, [takePicture]);

  const pickImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result as string;
        takePicture(url);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Stack alignItems={"center"} mt={2}>
      <Box>
        <Webcam
          audio={false}
          width={width}
          height={height}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
      </Box>
      <Stack
        alignItems={"center"}
        justifyContent={"space-around"}
        flexDirection={"row"}
        width={250}
      >
        <Button
          variant="contained"
          sx={{
            width: 100,
          }}
          onClick={() => capture()}
        >
          撮影
        </Button>

        <Button onClick={() => inputRef.current?.click()}>
          写真を選択
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={pickImage}
            hidden
          />
        </Button>
      </Stack>
    </Stack>
  );
};

export default Camera;
