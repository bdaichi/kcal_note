"use client";

import Loading from "@/components/common/loading";
import UpdateProfileModal from "@/components/mypage/updateProfileModal";
import { AuthContext } from "@/contexts/authContext";
import {
  BMR,
  calculateCalorie,
  convertToDietMethod,
  convertToGender,
  convertToTrainingLevel,
  convertToUserStatus,
} from "@/functions/user";
import { updateUser } from "@/services/userService";
import { User } from "@/types/user";
import { Button, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";

const Page = () => {
  const { currentUser, reloadUser, token } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  if (!currentUser)
    return <Loading isLoading={!currentUser} onClose={() => void 0} />;

  const {
    name,
    stature,
    weight,
    age,
    gender,
    trainingLevel,
    status,
    dietMethod,
  } = currentUser;

  const isCanCalculate =
    stature != 0 && weight != 0 && age != 0 && gender != "other";

  const userInfo: {
    label: string;
    value: string | number;
  }[] = [
    { label: "名前", value: name || "ユーザー名" },
    { label: "身長", value: stature },
    { label: "体重", value: weight },
    { label: "年齢", value: age },
    {
      label: "性別",
      value: convertToGender(gender),
    },
    {
      label: "トレーニングレベル",
      value: convertToTrainingLevel(trainingLevel),
    },
    {
      label: "目標体重",
      value: currentUser.targetWeight,
    },
    {
      label: "ステータス",
      value: convertToUserStatus(status),
    },
    {
      label: "ダイエット方法",
      value: convertToDietMethod(dietMethod),
    },
    {
      label: "基礎代謝量",
      value: !isCanCalculate
        ? "計算に必要な情報が設定されてません"
        : BMR(weight, stature, age, gender ?? "other"),
    },
    {
      label: "消費カロリー",
      value: !isCanCalculate
        ? "計算に必要な情報が設定されてません"
        : calculateCalorie(
            weight,
            stature,
            age,
            trainingLevel ?? "one",
            gender ?? "other"
          ),
    },
  ];

  return (
    <>
      <Stack
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          margin: "auto",
          padding: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography mt={2} mb={5} variant="h4">
          プロフィール
        </Typography>
        {userInfo.map((info) => (
          <Stack
            key={info.label}
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              width: "95%",
              borderBottom: "1px solid #000",
              py: 0.5,
              my: 0.5,
            }}
          >
            <Typography>{info.label}</Typography>
            <Typography>{info.value}</Typography>
          </Stack>
        ))}
        <Button
          variant="contained"
          size="large"
          sx={{ my: 5 }}
          onClick={() => setIsEdit(true)}
        >
          編集
        </Button>
      </Stack>

      <UpdateProfileModal
        isOpen={isEdit}
        onClose={() => setIsEdit(false)}
        user={currentUser}
        updateUser={async (user: User) => {
          await updateUser(user, token);
          await reloadUser();
          setIsEdit(false);
        }}
      />
    </>
  );
};

export default Page;
