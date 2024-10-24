export const borderStyle = (
  color: string,
  quantity: number,
  height: number,
  option?: {}
) => {
  const width = Math.round(quantity * 1.5);
  return {
    backgroundColor: color,
    height: height,
    width: width == 1 ? 2 : width,
    ...option,
  };
};

export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  overflow: "scroll",
  display: "block",
  transform: "translate(-50%, -50%)",
  borderRadius: 1,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export const innerShadow = {
  boxShadow:
    "inset -5px -5px 10px 0px rgba(255, 255, 255, 0.5), inset 5px 5px 10px 0px rgba(0, 0, 0, 0.3)",
};

export const carbColor = "#4287f5";

export const proteinColor = "#f542bc";

export const fatColor = "#e6f542";

export const textFiledSlotProps = {
  htmlInput: {
    sx: {
      height: 5,
    },
  },
};
