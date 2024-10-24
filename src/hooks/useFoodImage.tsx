import { getImage } from "@/services/unsplashService";
import { Box, Button, Stack, Typography } from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Image from "next/image";
import { useState } from "react";
import { innerShadow } from "@/utils/styles";
import Camera from "@/components/common/camera";

type Props = {
  foodName: string;
};

const useFoodImage = (props: Props) => {
  const { foodName } = props;
  const [cameraModeFlg, setCameraModeFlg] = useState<boolean>(false);
  const [images, setImage] = useState<string[]>(["/static/images/none.jpg"]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const serchImages = async () => {
    const res = await getImage(foodName);
    setImage([images[0], ...res.slice(0, 10)]);
    setCurrentImageIndex(1);
  };

  const pageNationIconStyle = (disabled: boolean) => {
    return {
      cursor: "pointer",
      height: 30,
      width: 30,
      display: "flex",
      justifyContent: "center",
      borderRadius: "50%",
      backgroundColor: disabled ? "white" : "cornflowerblue",
    };
  };

  const imageField = () => {
    if (cameraModeFlg) {
      return (
        <Camera
          height={200}
          width={300}
          takePicture={(url) => {
            setImage([url, ...images.slice(1)]);
            setCurrentImageIndex(0);
            setCameraModeFlg(false);
          }}
        />
      );
    } else {
      return (
        <Stack alignItems={"center"} my={2} spacing={1}>
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {currentImageIndex > 0 && (
              <Box
                sx={pageNationIconStyle(currentImageIndex == 0)}
                onClick={() => setCurrentImageIndex(currentImageIndex - 1)}
              >
                <Typography
                  sx={{
                    alignSelf: "center",
                    color: "white",
                  }}
                >
                  {"＜ "}
                </Typography>
              </Box>
            )}
            {images[0] == "/static/images/none.jpg" &&
            currentImageIndex == 0 ? (
              <Box
                sx={{
                  width: 200,
                  height: 200,
                  border: "1px solid",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  m: 2,
                  borderRadius: 2,
                  ...innerShadow,
                }}
                onClick={() => setCameraModeFlg(true)}
              >
                <CameraAltIcon />
                <Typography>写真を撮る</Typography>
              </Box>
            ) : (
              <Image
                width={200}
                height={200}
                style={{
                  alignSelf: "center",
                  margin: 4,
                  padding: 0,
                  objectFit: "cover",
                }}
                src={images[currentImageIndex]}
                alt={foodName}
                onClick={() =>
                  currentImageIndex == 0 ? setCameraModeFlg(true) : {}
                }
              />
            )}
            {!(currentImageIndex == images.length - 1) && (
              <Box
                sx={pageNationIconStyle(currentImageIndex == images.length - 1)}
                onClick={() => setCurrentImageIndex(currentImageIndex + 1)}
              >
                <Typography
                  sx={{
                    alignSelf: "center",
                    color: "white",
                  }}
                >
                  {" ＞"}
                </Typography>
              </Box>
            )}
          </Stack>
          <Button
            sx={{ width: 200 }}
            variant="contained"
            onClick={() => serchImages()}
          >
            食材名から画像を検索
          </Button>
        </Stack>
      );
    }
  };

  // hooksで切り出すものなのか？ hooksとcomponentで分けるべきか？
  return { imageField, image: images[currentImageIndex] };
};

export default useFoodImage;
