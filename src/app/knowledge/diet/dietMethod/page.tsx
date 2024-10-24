"use client";

import PageTemplate from "@/components/common/detailField/pageTemplate";
import KnowledgeHeader from "@/components/knowledge/knowledgeHeader";
import { modalStyle } from "@/utils/styles";
import { Box, Modal, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [currentContent, setCurrentContent] = useState<number>(0);
  const title = "減量方法";
  const contents = [
    <Typography
      key={1}
      style={{ lineHeight: 1.8, textAlign: "center", fontSize: 14 }}
    >
      {
        "まずはローファットから説明します。\n多くの人が実践しており、身体への負担が少なく、日本人にあっていると思います。おすすめです。"
      }
      {
        "\nローファットとは、その名の通り脂質の摂取量を抑えるダイエットです。\n脂肪は1gで9kcalあり、炭水化物やタンパク質は1gで4kcalです。\n脂肪を摂取しないことで、カロリーを抑えることができます。"
      }
      {
        "\n摂取カロリーは消費カロリーから200引くくらいでいいです。ちゃんとした計算方法などはどっかに転がってますが、いきなり基礎代謝ギリギリの摂取カロリーはやめてください。まあでも一度失敗するのもいい経験かもですね〜"
      }
      {
        "\nPFCは、まずタンパク質から決めましょう。男性であれば体重×2~2.5、女性は体重×1.5~2gを摂取すれば問題ないと思います。次に脂質は30~50gとしましょう。残りを炭水化物にする感じです。"
      }
      {
        "\n脂肪は必要な栄養素です。\n脂肪を摂取しないことで、肌荒れや髪の毛の状態が悪くなることがあります。\nまた、脂肪は脳の栄養素でもあります。\n脂肪を摂取しないことで、集中力が低下することがあります。"
      }
      {"\nなので、最低でも30gは摂取するようにしてください。"}
      {
        "\n脂肪にも種類があります。飽和脂肪酸、一価不飽和脂肪酸、多価不飽和脂肪酸など。\n飽和脂肪酸は、動物性食品に多く含まれています。\n一価不飽和脂肪酸は、オリーブオイルやアーモンドに多く含まれています。\n多価不飽和脂肪酸は、青魚やえごま油に多く含まれています。"
      }
      {
        "\nこの中で、多価不飽和脂肪酸は、体内で生成できない必須脂肪酸です。\n体内で生成できないため、食事から摂取する必要があるということを意識してください。"
      }
      {
        "\nより詳細な情報は自分で調べてみてください。人に1〜10説明してもらうより、自分で調べたほうが頭に入ると思います。"
      }
    </Typography>,
    <Typography
      key={2}
      style={{ lineHeight: 1.8, textAlign: "center", fontSize: 14 }}
    >
      {"次に説明するのは、ケトジェニックです。別名、糖質制限です。"}
      {
        "\nケトジェニックとは、ローファットとは正反対で炭水化物を極端に制限し、脂質をメインに摂取するダイエットです。"
      }
      {
        "\nこちらも摂取カロリーは消費カロリーから200引くくらいにしましょう。それか最初のうちは消費カロリーと同じくらいとっても大丈夫です。\nまずは身体をケトーシスにもっていくために脂質を多く取ってください。"
      }
      {
        "\nPFCバランスはこちらもタンパク質から決めます。量はローファットより少し多めにしましょう。そして糖質は10~20gにしましょう。残りを脂質で補います。"
      }
      {
        "\nよく勘違いされているのが、糖質だけ抑える人です。アホなんですか？死にますよ？"
      }
      {
        "\n糖質制限中だから米食わないサラダだけ〜みたいなアホをよく見ますが、あなたのエネルギー源はどこになるんですか？\n馬鹿だからエネルギーが不要？"
      }
      {
        "\n重要なことは1つ、糖質制限中は脂質をしっかり摂取すること！脂質がエネルギー源になります。"
      }
      {
        "\n人間の体は通常、炭水化物をエネルギー源として使いますが、糖質制限中は脂質をエネルギー源として使います。なので、脂質を取らないと終わりです。"
      }
      {
        "\n糖新生、ケトン体などと調べれば詳細が出てきます、ここらへんも自身で調べて頭に叩き込んでください。"
      }
    </Typography>,
  ];
  const footerButtons = [
    {
      onClick: () => {
        if (currentContent === 0) {
          router.push("/knowledge/diet");
        } else {
          setCurrentContent(0);
        }
      },
      label: "前へ",
      style: {
        backgroundColor: "white",
        color: "black",
      },
    },
  ];

  return (
    <>
      <PageTemplate
        headderButton={KnowledgeHeader()}
        title={title}
        content={contents[currentContent]}
        footerButtons={footerButtons}
      />
    </>
  );
};

export default Page;
