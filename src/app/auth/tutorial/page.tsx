"use client";

import PageTemplate from "@/components/common/detailField/pageTemplate";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [contentIndex, setContentIndex] = useState(0);
  const title = "Beautiful Body";
  const contentTexts = [
    "このアプリは皆さんの食事を管理する\nアプリです。\n食事を管理することにより「脂肪が少ないスリムな体」「筋肉ゴリゴリのゴリマッチョ」など、理想の身体を手にすることができます。\nこのアプリを始める前に皆さんに知っておいてほしい知識があります。\n自身の消費カロリー、基礎代謝、摂取カロリー、PFCバランスについてです。\nこれらについての知識がない情弱な方は「知識」をまずご覧いただくことをおすすめします。",
    "ちゃんと食べてるのに筋肉がつかない、もしくは、食べてないのに痩せないと言う方をチラホラ見かけます。\nちゃんととは？\nあなたの基礎代謝と消費カロリーはどのくらいで、摂取カロリーはいくらですか？PFCバランスなどはどうなってますか？と聞きたくなります。\nおそらく多くの人が\n答えられないと思います。\n当たり前ですが食べたもので\nあなたの体は作られるのです。\n自分の身体や食事に関して無知な人が理想とする身体を手に入れられるとは思いません。\nですので、このアプリを使って正しい知識を身につけてから、理想の身体を手に入れましょう。",
  ];
  const content = (
    <Typography style={{ lineHeight: 1.8, textAlign: "center", fontSize: 15 }}>
      {contentTexts[contentIndex]}
    </Typography>
  );
  const footerButtons = [
    {
      onClick: () => {
        if (contentIndex === 0) {
          setContentIndex(1);
        } else {
          router.push("/auth");
        }
      },
      label: contentIndex === 0 ? "次へ" : "始める",
      style: {
        backgroundColor: "primary",
        color: "white",
      },
    },
  ];

  return (
    <PageTemplate
      title={title}
      content={content}
      footerButtons={footerButtons}
    />
  );
};

export default Page;
