import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Slide from "@mui/material/Slide";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeStore } from "../../lib/useThemeStore";

const ColorThemeButton = () => {
  const { toggleTheme }: any = useThemeStore();

  const isDarkMode = useThemeStore((state: any) => state.isDarkMode);

  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMode(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <Slide direction="left" in={true} timeout={725} unmountOnExit mountOnEnter>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 80px)",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        <Button
          onClick={toggleTheme}
          variant="contained"
          sx={{
            borderTopLeftRadius: "24px",
            borderBottomLeftRadius: "24px",
          }}
          disableFocusRipple
          disableRipple
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </Button>
      </Box>
    </Slide>
  );
};

export default ColorThemeButton;
