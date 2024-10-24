import { innerShadow } from "@/utils/styles";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { CSSProperties } from "react";

type Props = {
  title: string;
  content: JSX.Element;
  headderButton?: JSX.Element;
  footerButtons?: {
    onClick: () => void;
    label: string;
    style: CSSProperties | undefined;
  }[];
};

const PageTemplate = (props: Props) => {
  const router = useRouter();
  const { title, content, footerButtons } = props;

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "space-around",
        position: "relative",
      }}
      spacing={3}
      my={4}
    >
      {props.headderButton}
      <Typography
        style={{
          borderBottom: "1px solid #000",
        }}
        variant="h5"
      >
        {title}
      </Typography>
      <Stack
        height={450}
        width={"85%"}
        sx={{
          display: "flex",
          alignItems: "center",
          ...innerShadow,
          backgroundColor: "white",
          flexDirection: "column",
          borderRadius: 1,
          p: 3,
          overflow: "scroll",
          whiteSpace: "pre-wrap",
        }}
      >
        {content}
      </Stack>
      {footerButtons && (
        <Stack flexDirection={"row"}>
          {footerButtons.map((button) => (
            <Button
              sx={{ ...button.style, width: 100, mx: 2 }}
              key={button.label}
              onClick={() => button.onClick()}
              variant="contained"
            >
              {button.label}
            </Button>
          ))}
        </Stack>
      )}
    </Stack>
  );
};

export default PageTemplate;
