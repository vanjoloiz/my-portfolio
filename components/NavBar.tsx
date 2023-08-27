import { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import IconButton from "@mui/material/IconButton";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useThemeStore } from "../lib/useThemeStore";

interface NavBarProps {
  isLoggedIn: boolean;
  isAdmin?: boolean;
}

const NavBar: FC<NavBarProps> = ({ isLoggedIn, isAdmin }) => {
  const router = useRouter();

  const { toggleTheme }: any = useThemeStore();

  const isDarkMode = useThemeStore((state: any) => state.isDarkMode);

  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMode(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const trigger = useScrollTrigger({ disableHysteresis: true });

  return (
    <AppBar
      color={!trigger ? "transparent" : "inherit"}
      position="fixed"
      sx={{ boxShadow: "none" }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => router.push("/", undefined, { shallow: true })}
        >
          <span style={{ cursor: "pointer" }}>Salvador Loiz</span>
        </Typography>

        {isAdmin && (
          <Typography
            sx={{ cursor: "pointer", marginRight: "15px" }}
            variant="h6"
            component="span"
            onClick={() => {
              router.push("/admin/reviews");
            }}
          >
            Reviews
          </Typography>
        )}

        {isLoggedIn && (
          <Typography
            sx={{ cursor: "pointer", marginRight: "15px" }}
            variant="h6"
            component="span"
            onClick={() => {
              Cookie.remove("token");

              router.push("/login");
            }}
          >
            Logout
          </Typography>
        )}

        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleTheme}
        >
          {mode === "dark" ? <Brightness4Icon /> : <BrightnessHighIcon />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
