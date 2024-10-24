import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const checkBoxStyle = {
  width: 30,
  height: 30,
  color: "#0f68f7",
  backgroundColor: "#f5f5f5",
  borderRadius: "50%",
  position: "absolute",
  top: 5,
  right: 5,
  zIndex: 20,
};

type Props = {
  isChecked: boolean;
  onCheck: () => void;
  onUnCheck: () => void;
};

const CheckBox = (props: Props) => {
  const { isChecked, onCheck, onUnCheck } = props;
  if (isChecked) {
    return <TaskAltIcon sx={checkBoxStyle} onClick={onUnCheck} />;
  } else {
    return <RadioButtonUncheckedIcon sx={checkBoxStyle} onClick={onCheck} />;
  }
};

export default CheckBox;
