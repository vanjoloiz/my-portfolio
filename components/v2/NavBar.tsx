import { FC, useState } from "react";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import NavDrawer from "./NavDrawer";
import HideOnScroll from "@utils/HideOnScroll";

interface NavBarProps {
  isLoggedIn: boolean;
  isAdmin?: boolean;
  user: any;
}

const NavBar: FC<NavBarProps> = ({ user }) => {
  const router = useRouter();

  const [isOpenNavDrawer, setIsOpenNavDrawer] = useState(false);

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
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              onClick={() => router.push("/", undefined, { shallow: true })}
            >
              <span style={{ cursor: "pointer" }}>Salvador Loiz</span>
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
