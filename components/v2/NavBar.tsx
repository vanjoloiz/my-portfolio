import { FC, useEffect, useState } from "react";
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
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import { io } from "socket.io-client";
import { BASE_URL } from "@utils/baseUrl";

interface NavBarProps {
  isLoggedIn: boolean;
  isAdmin?: boolean;
  user: any;
}

const socket = io(BASE_URL);

const NavBar: FC<NavBarProps> = ({ user }) => {
  const router = useRouter();

  const [viewingUserCount, setViewingUserCount] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const [isOpenNavDrawer, setIsOpenNavDrawer] = useState(false);

  useEffect(() => {
    if (Cookie.get("userId") === undefined) {
      Cookie.set("userId", uuidv4());
    }

    socket.emit("join", Cookie.get("userId"));
  }, []);

  useEffect(() => {
    const fetchInitialCount = async () => {
      setIsLoading(true);

      const { data } = await axios.get("/api/v1/count");
      setViewingUserCount(data.length);
      setIsLoading(false);
    };

    fetchInitialCount();
  }, []);

  useEffect(() => {
    socket.on("updateViewsCount", (count) => {
      setViewingUserCount(count);
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
            bgcolor: "##262626",
          }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              <span
                onClick={() => router.push("/v2", undefined, { shallow: true })}
                style={{ cursor: "pointer" }}
              >
                Salvador Loiz
              </span>{" "}
            </Typography>

            <Box sx={{ display: { lg: "none" } }}>
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

            {!isLoading && (
              <Typography
                component="span"
                fontWeight="bold"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                }}
              >
                <AccessTimeIcon sx={{ fontSize: "12px", mr: 0.5 }} />
                {viewingUserCount}
                <span style={{ marginLeft: "2px" }}>
                  {viewingUserCount > 1 ? "Viewers" : "Viewer"}
                </span>
              </Typography>
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
