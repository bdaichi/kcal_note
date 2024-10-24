import { Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  content: string;
};

const ColumnTemplate = (props: Props) => {
  return (
    <Stack spacing={1} my={1.5}>
      <Typography
        variant="h6"
        sx={{
          borderBottom: "1px solid #000",
        }}
      >
        {props.title}
      </Typography>
      <Typography variant={"body2"} style={{ lineHeight: 1.6 }}>
        {props.content}
      </Typography>
    </Stack>
  );
};

export default ColumnTemplate;
