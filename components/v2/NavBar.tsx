import { FC, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Cookie from "js-cookie";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import NavDrawer from "./NavDrawer";
import HideOnScroll from "@utils/HideOnScroll";
import Fade from "@mui/material/Fade";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useThemeStore } from "../../lib/useThemeStore";

const Odometer = dynamic(import("react-odometerjs"), {
  ssr: false,
});

import { io } from "socket.io-client";
import { BASE_URL } from "@utils/baseUrl";

interface NavBarProps {
  isLoggedIn: boolean;
  isAdmin?: boolean;
  user: any;
}

const socket = io(BASE_URL, {
  reconnection: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 1000,
});

const NavBar: FC<NavBarProps> = ({ user }) => {
  const router = useRouter();

  const [viewingUserCount, setViewingUserCount] = useState(0);

  const [isOpenNavDrawer, setIsOpenNavDrawer] = useState(false);

  const { toggleTheme }: any = useThemeStore();

  const isDarkMode = useThemeStore((state: any) => state.isDarkMode);

  const [mode, setMode] = useState<"light" | "dark">("light");

  useEffect(() => {
    setMode(isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const emitSocketConnection = () => {
    if (Cookie.get("userId") === undefined) {
      Cookie.set("userId", uuidv4());
    }

    socket.emit("join", Cookie.get("userId"));
  };

  useEffect(() => {
    emitSocketConnection();
  }, []);

  useEffect(() => {
    const fetchInitialCount = async () => {
      const { data } = await axios.get("/api/v1/count");
      setViewingUserCount(data.length);
    };

    fetchInitialCount();
  }, []);

  useEffect(() => {
    socket.on("updateViewsCount", (count) => {
      setViewingUserCount(count);
    });
  }, []);

  useEffect(() => {
    socket.io.on("reconnect", () => {
      emitSocketConnection();
    });
  }, []);

  const handleMenuIconClick = () => setIsOpenNavDrawer(!isOpenNavDrawer);

  return (
    <>
      <HideOnScroll>
        <AppBar
          position="sticky"
          sx={{
            boxShadow: "none",
            backgroundColor: "secondary.main",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, color: "primary.main" }}
            >
              <span
                onClick={() => router.push("/v2", undefined, { shallow: true })}
                style={{ cursor: "pointer" }}
              >
                Salvador Loiz
              </span>{" "}
            </Typography>

            <Box sx={{ display: { lg: "none" } }}>
              <IconButton
                onClick={toggleTheme}
                disableFocusRipple
                disableTouchRipple
              >
                {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>

              <IconButton
                onClick={handleMenuIconClick}
                disableFocusRipple
                disableTouchRipple
                sx={{
                  "&:hover": {
                    bgcolor: "transparent",
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {viewingUserCount !== 0 && (
              <Fade in={true} timeout={725}>
                <Typography
                  component="span"
                  fontWeight="bold"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "12px",
                    color: "primary.main",
                  }}
                >
                  <AccessTimeIcon sx={{ fontSize: "12px", mr: 0.5 }} />
                  <Odometer value={viewingUserCount} />
                  <span style={{ marginLeft: "2px" }}>
                    {viewingUserCount > 1 ? "Viewers" : "Viewer"}
                  </span>
                </Typography>
              </Fade>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <NavDrawer
        user={user}
        isOpen={isOpenNavDrawer}
        onClose={() => setIsOpenNavDrawer(false)}
      />
    </>
  );
};

export default NavBar;
