"use client";

import PageTemplate from "@/components/common/detailField/pageTemplate";
import KnowledgeHeader from "@/components/knowledge/knowledgeHeader";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const Page = () => {
  const title = "増量";
  const content = (
    <Typography style={{ lineHeight: 1.8, textAlign: "center", fontSize: 14 }}>
      {"筋トレをしている前提で話をします。"}
      {"\n増量したい方はたくさん食べないと\nいけないという思考だと思います"}
      {
        "\nよくあるのが1食だけたくさん食べて\n満足する人たちですね。\n太っている人が朝だけご飯を抜いて、\n昼と夜はジャンクフードを食べるという生活を送って痩せると思いますか？\nあなた方がやっているのはこれです。"
      }
      {
        "\nまず基礎代謝分のカロリーを摂取するのはクリアしてください、これは最低条件です。そしてできれば消費カロリー以上のカロリーを摂取しましょう。\n私の経験談になりますが、消費カロリー以上は取らなくても、筋肉がそこまで発達してない方であれば、基礎代謝以上カロリーを摂取して、たんぱく質は体重×2g以上、脂質は30g、ちゃんと米を食うってことをすればある程度筋肉はつくとおもいます。"
      }
      {
        "\nたんぱく質はできるだけ固形物で取ってください、プロテインはあくまで補助です。肉や魚で取るようにしましょう。あとEAAやBCAAは情弱ビジネスなので買わないようにしましょう。"
      }
    </Typography>
  );

  return (
    <PageTemplate
      headderButton={KnowledgeHeader()}
      title={title}
      content={content}
    />
  );
};

export default Page;
