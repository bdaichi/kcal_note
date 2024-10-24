import { validateNumberInput } from "@/functions/common";
import {
  DietMethod,
  Gender,
  TrainingLevel,
  User,
  UserStatus,
} from "@/types/user";
import { modalStyle, textFiledSlotProps } from "@/utils/styles";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  updateUser: (user: User) => Promise<void>;
};

const UpdateProfileModal = (props: Props) => {
  const { isOpen, onClose, user, updateUser } = props;
  const [name, setName] = useState<string>(user.name || "ユーザー名");
  const [weight, setWeight] = useState<number>(user.weight ?? 0);
  const [stature, setStature] = useState<number>(user.stature ?? 0);
  const [age, setAge] = useState<number>(user.age ?? 0);
  const [gender, setGender] = useState<Gender>(user.gender);
  const [trainingLevel, setTrainingLevel] = useState<TrainingLevel>(
    user.trainingLevel
  );
  const [targetWeight, setTargetWeight] = useState<number>(user.targetWeight);
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [dietMethod, setDietMethod] = useState<DietMethod>(user.dietMethod);

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Stack
        spacing={2}
        sx={{
          ...modalStyle,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          pt: 4,
        }}
        width={300}
        height={600}
      >
        <TextField
          label="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
          slotProps={textFiledSlotProps}
        />
        <TextField
          label="身長"
          value={stature}
          onChange={(e) => setStature(validateNumberInput(e.target.value))}
          slotProps={textFiledSlotProps}
        />
        <TextField
          label="体重"
          value={weight}
          onChange={(e) => setWeight(validateNumberInput(e.target.value))}
          slotProps={textFiledSlotProps}
        />
        <TextField
          label="年齢"
          value={age}
          onChange={(e) => setAge(validateNumberInput(e.target.value))}
          slotProps={textFiledSlotProps}
        />
        <FormControl>
          <InputLabel id="gender-label">性別</InputLabel>
          <Select
            value={gender}
            label="性別"
            labelId="gender-label"
            sx={{
              height: 30,
            }}
            onChange={(e) => setGender(e.target.value as Gender)}
          >
            <MenuItem value={"man"}>男性</MenuItem>
            <MenuItem value={"woman"}>女性</MenuItem>
            <MenuItem value={"other"}>その他</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="trainingLevel-label">トレーニングレベル</InputLabel>
          <Select
            value={trainingLevel}
            label="トレーニングレベル"
            labelId="trainingLevel-label"
            onChange={(e) => setTrainingLevel(e.target.value as TrainingLevel)}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: 200,
              height: 40,
            }}
          >
            <MenuItem value={"one"}>
              ほぼ運動しない。通勤、デスクワーク程度
            </MenuItem>
            <MenuItem value={"two"}>軽い運動。週に1回〜2回程度の運動</MenuItem>
            <MenuItem value={"three"}>
              中程度の運動。週に3回〜5回程度の運動
            </MenuItem>
            <MenuItem value={"four"}>激しい運動。6回〜7回程度の運動</MenuItem>
            <MenuItem value={"five"}>非常に激しい。1日に2回以上の運動</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="目標体重"
          value={targetWeight}
          onChange={(e) => setTargetWeight(validateNumberInput(e.target.value))}
          slotProps={textFiledSlotProps}
        />
        <FormControl>
          <InputLabel id="status-label">ステータス</InputLabel>
          <Select
            value={status}
            label="ステータス"
            labelId="status-label"
            onChange={(e) => setStatus(e.target.value as UserStatus)}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: 200,
              height: 40,
            }}
          >
            <MenuItem value={"diet"}>ダイエット</MenuItem>
            <MenuItem value={"maintain"}>維持</MenuItem>
            <MenuItem value={"bulkUp"}>増量</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="dietMethod-label">ダイエット方法</InputLabel>
          <Select
            value={dietMethod}
            disabled={status != "diet"}
            label="ダイエット方法"
            labelId="dietMethod-label"
            onChange={(e) => setDietMethod(e.target.value as DietMethod)}
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: 200,
              height: 40,
            }}
          >
            <MenuItem value={"lowFat"}>ローファット(脂質制限)</MenuItem>
            <MenuItem value={"lowCarb"}>ケトジェニック(糖質制限)</MenuItem>
          </Select>
        </FormControl>
        <Button
          sx={{ height: 10 }}
          size="large"
          onClick={() =>
            updateUser({
              ...user,
              name,
              weight,
              stature,
              age,
              gender,
              trainingLevel,
              status,
              targetWeight,
              dietMethod,
            })
          }
        >
          保存
        </Button>
      </Stack>
    </Modal>
  );
};

export default UpdateProfileModal;
