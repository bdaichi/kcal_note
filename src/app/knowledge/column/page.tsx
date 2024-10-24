"use client";
import ColumnTemplate from "@/components/common/detailField/columnTemplate";
import PageTemplate from "@/components/common/detailField/pageTemplate";
import KnowledgeHeader from "@/components/knowledge/knowledgeHeader";
import { useRouter } from "next/navigation";

const Page = () => {
  const title = "基礎知識";
  const columns: {
    title: string;
    content: string;
  }[] = [
    {
      title: "基礎代謝",
      content:
        "人間が生きていく上で必要なエネルギー。\n体温維持や心拍、呼吸など生命活動で使用されます。\n人間は何もせずとも生きているだけでカロリーを消費するのです。",
    },
    {
      title: "消費カロリー",
      content:
        "運動や日常生活で消費されるカロリー。\n基礎代謝 + 運動で消費したカロリーの合計です。\n運動と言ってもランニングや筋トレなどハードなものだけでなく、\nトイレへ行くために立って歩くなどの日常的な動作も含まれます。",
    },
    {
      title: "摂取カロリー",
      content:
        "その名の通り摂取したカロリーです。\n米を食ったり、ジュースを飲んだりすると、0kcalの食べ物出ない限り、基本カロリーは加算されます。\n0kcalで有名なのはドーナツですよね、中心が空洞であることから、カロリーゼロ！大好物です。",
    },
    {
      title: "PFCバランス",
      content:
        "摂取カロリーのうちのP：タンパク質、F：脂質、C：炭水化物の割合です。\nよくここを見落とす方、ないがしろにする方がいますが、かなり重要です。\nダイエットってなると野菜、キムチや納豆などの発酵食品、豆腐などを食べて満足してる人いますよね。これで健康になれるでしょ？的な。三大栄養素のPFCも管理できてないやつが健康になれるわけねーんだよなぁって思いながら見てます。",
    },
  ];
  const content = () => {
    return (
      <>
        {columns.map((column, index) => {
          return (
            <ColumnTemplate
              key={index}
              title={column.title}
              content={column.content}
            />
          );
        })}
      </>
    );
  };

  return (
    <PageTemplate
      headderButton={KnowledgeHeader()}
      title={title}
      content={content()}
    />
  );
};

export default Page;
