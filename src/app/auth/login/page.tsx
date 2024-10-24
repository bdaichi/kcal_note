"use client";

import { Button, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, initializeFirebase } from "@/services/firebaseService";
import { createUser } from "@/services/userService";
import { User } from "@/types/user";

const Page = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const signUp = async () => {
    try {
      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const token = await newUser.user.getIdToken();
      const user: User = {
        email: email,
        uid: newUser.user.uid,
        name: "",
        stature: 0,
        weight: 0,
        age: 0,
        trainingLevel: "one",
        status: "maintain",
        dietMethod: "lowFat",
        gender: "other",
        targetWeight: 0,
      };
      await createUser(user, token);
      router.push("/auth/tutorial");
    } catch (error) {
      //FIXME: エラーハンドリングを追加する
      //例：すでに登録されているメールアドレスの場合のエラーハンドリング
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/auth");
    } catch (error) {
      //FIXME: エラーハンドリングを追加する
      console.error(error);
    }
  };

  useEffect(() => {
    initializeFirebase();
  }, []);

  return (
    <Stack
      sx={{
        py: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography variant="h5" sx={{ my: 4 }}>
        Beautiful Body
      </Typography>
      <Typography variant="h6">アカウントをお持ちの方はログイン</Typography>
      <Typography variant="h6">アカウントがない方は新規登録</Typography>
      <TextField
        type="email"
        label="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ width: 350, my: 2, mt: 4 }}
      />
      <TextField
        type="password"
        label="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ width: 350, my: 2 }}
      />

      <Button variant="contained" onClick={signIn} sx={{ width: 120, my: 2 }}>
        <Typography>ログイン</Typography>
      </Button>
      <Button variant="outlined" onClick={signUp} sx={{ width: 120, my: 2 }}>
        <Typography>新規登録</Typography>
      </Button>
    </Stack>
  );
};

export default Page;
