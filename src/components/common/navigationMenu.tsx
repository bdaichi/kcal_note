"use client";

import { Box, Modal, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const NavigationMenu = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("/mealReport");
  const menuItems: { label: string; path: string }[] = [
    {
      label: "食事報告",
      path: "/mealReport",
    },
    {
      label: "マイページ",
      path: "/mypage",
    },
    {
      label: "体重管理",
      path: "/bodyReport",
    },
    {
      label: "知識",
      path: "/knowledge",
    },
  ];

  return (
    <>
      {path == "/" ? (
        <></>
      ) : (
        <Box
          sx={{
            position: "fixed",
            top: 10,
            left: 10,
            width: 40,
            height: 40,
            backgroundColor: "white",
            borderRadius: 2,
            border: "0.1px solid gray",
            boxShadow: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => setOpen(true)}
        >
          <MenuIcon />
        </Box>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: 200,
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            display: "flex",
            flexDirection: "column",
            py: 3,
            px: 0.5,
          }}
        >
          {menuItems.map((item, index) => (
            <Stack
              sx={{ ml: 1 }}
              flexDirection={"row"}
              alignItems={"center"}
              key={index}
              my={0.5}
            >
              <Typography>{currentPath === item.path ? "▶" : "　"}</Typography>
              <Typography
                sx={{
                  cursor: "pointer",
                  mx: 2,
                  mb: 1,
                  borderBottom: "0.5px solid",
                  fontSize: 20,
                  color: currentPath === item.path ? "primary.main" : "black",
                }}
                onClick={() => {
                  setOpen(false);
                  setCurrentPath(item.path);
                  router.push(item.path);
                }}
              >
                {item.label}
              </Typography>
            </Stack>
          ))}
        </Box>
      </Modal>
    </>
  );
};

export default NavigationMenu;
