"use client";

import PageTemplate from "@/components/common/detailField/pageTemplate";
import KnowledgeHeader from "@/components/knowledge/knowledgeHeader";
import { modalStyle } from "@/utils/styles";
import { Box, Modal, Stack, Switch, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [pigFlag, setPigFlag] = useState<boolean>(true);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const headerButton = () => {
    return (
      <>
        {KnowledgeHeader()}
        <Stack
          sx={{ position: "absolute", top: 0, right: 10 }}
          direction={"row"}
          alignItems={"center"}
        >
          <Switch
            checked={pigFlag}
            onChange={(e) => {
              setPigFlag(e.target.checked);
            }}
          />
          <Typography onClick={() => setOpenModal(true)}>🐷</Typography>
        </Stack>
      </>
    );
  };
  const title = pigFlag ? "ブーブーブヒヒ" : "減量";
  const content = (
    <Typography style={{ lineHeight: 1.8, textAlign: "center", fontSize: 14 }}>
      {pigFlag
        ? "ブヒーブーブーブーブー\nブヒヒブヒブーブーブヒヒヒブーブーブーブーブヒ！\nブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブー\nブーブーブーブーブー\nブーブーブーブヒヒブーブーブーブーブー\nブーブーブーブーブーブーブーブーブヒーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブヒーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブー\nブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブーブー"
        : "痩せれない理由は大きく分けて2つあり、下記のどちらかだと思います。\n・摂取カロリーが誤っている\n・PFCバランスがぐちゃぐちゃ\nまず1のパターン、摂取カロリーは基礎代謝以上、消費カロリー未満が正しいのですが、極端に摂取カロリーを減らし基礎代謝を下回っていたり、逆に食べすぎて消費カロリーを上回っておりませんか？\n消費カロリーを上回ったらなぜ痩せないのかを説明はしません。\nそりゃそうやろって感じなので\nでは、逆に基礎代謝を下回っている方、食べなかったらその分痩せるという考えを持ってませんか？\n不正解です、辛いほうが痩せるなんて根性論は必要ないです。\n基礎代謝は生きるうえで必要なのです、それを摂取しなかったら身体は衰弱します。\nそうなるともうダイエットどころではないですよね。\n私は減量で一番大切なのは健康であることだと思っております。それは心も含めてです。過度なダイエットで身体も心も壊してしまわないよう気をつけましょう。\nそれでは次の2のパターン、多いのが脂質を極端に取らない方、何も考えずにカロリーだけ気にする方。\n三大栄養素のタンパク質、脂質、炭水化物、これらはどれも必要なもので、1日に必要な摂取量というものも存在します。\nですので、極端に取らなかったり\n逆に取りすぎると身体の不調を招きます。\n何度も言いますが、健康であることが第一条件です、用法用量をお守りください。"}
    </Typography>
  );
  const footerButtons = [
    {
      onClick: () => {
        router.push("/knowledge/diet/dietMethod");
      },
      label: "次へ",
      style: {
        backgroundColor: "primary",
        color: "white",
      },
    },
  ];

  return (
    <>
      <PageTemplate
        headderButton={headerButton()}
        title={title}
        content={content}
        footerButtons={footerButtons}
      />
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        sx={{ justifyContent: "center" }}
      >
        <Box sx={{ ...modalStyle, height: 130, width: 300 }}>
          <Typography>
            豚の皆さんにわかりやすいよう豚語での説明も表示できるようにしております。感謝しろ
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default Page;
