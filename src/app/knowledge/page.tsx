"use client";

import { Button, Stack } from "@mui/material";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const knowledges = [
    {
      title: "基礎知識",
      path: "/knowledge/column",
    },
    {
      title: "ダイエット",
      path: "/knowledge/diet",
    },
    {
      title: "増量",
      path: "/knowledge/bulkUp",
    },
  ];
  return (
    <Stack>
      {knowledges.map((knowledge, index) => {
        return (
          <Button
            key={index}
            onClick={() => router.push(knowledge.path)}
            color="primary"
            sx={{
              width: "80%",
              margin: "0 auto",
              borderRadius: 0,
              fontSize: 20,
              padding: "10px 0",
            }}
          >
            {knowledge.title}
          </Button>
        );
      })}
    </Stack>
  );
};

export default Page;
