import { Button, Typography } from "@mui/material";

const PlusIconButton = (props: { onClick: () => void }) => {
  return (
    <Button
      sx={{
        width: 65,
        height: 65,
        borderRadius: "50%",
        margin: 1,
        backgroundColor: "primary",
        my: 2,
      }}
      variant="contained"
      onClick={props.onClick}
    >
      <Typography variant="h5">+</Typography>
    </Button>
  );
};

export default PlusIconButton;
