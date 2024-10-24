"use client";
import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [playAudio, setPlayAudio] = useState<HTMLAudioElement | null>(null);

  const playStartVoice = useCallback(async () => {
    if (playAudio) {
      playAudio.pause();
      playAudio.currentTime = 0;
    }
    try {
      const audioSrc = "/audio/start.wav";
      const audio = new Audio(audioSrc);
      audio.volume = 0.1;
      setPlayAudio(audio);
      await audio.play();
      router.push("/auth");
    } catch (e) {
      console.error(e);
    }
  }, [router, playAudio]);

  return (
    <Stack
      direction={"column"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={4}
      sx={{ height: "100vh" }}
    >
      <Typography variant="h5">Beautiful Body</Typography>
      <Button variant="contained" color="primary" onClick={playStartVoice}>
        Start
      </Button>
      <Typography variant="caption">
        ※ボタンを押すと音声が再生されます
      </Typography>
    </Stack>
  );
}
