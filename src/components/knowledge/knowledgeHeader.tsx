import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

const KnowledgeHeader = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/knowledge")}
      color="primary"
      sx={{
        position: "absolute",
        top: 25,
        left: 0,
        borderRadius: 0,
      }}
    >
      {"＜一覧に戻る"}
    </Button>
  );
};

export default KnowledgeHeader;
