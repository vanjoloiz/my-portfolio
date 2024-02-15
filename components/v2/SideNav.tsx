import { useRouter } from "next/router";
import Cookie from "js-cookie";
import Link from "next/link";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

import HomeIcon from "@mui/icons-material/Home";
import Person4Icon from "@mui/icons-material/Person4";
import AddCommentIcon from "@mui/icons-material/AddComment";
import ArticleIcon from "@mui/icons-material/Article";
import EmailIcon from "@mui/icons-material/Email";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FeedbackIcon from "@mui/icons-material/Feedback";
import LogoutIcon from "@mui/icons-material/Logout";

const SideNav = ({ user }: any) => {
  const router = useRouter();

  const items = user
    ? [
        {
          label: "Home",
          icon: <HomeIcon />,
          pathName: "/v2",
        },

        {
          label: "About",
          icon: <Person4Icon />,
          pathName: "/v2/about",
        },

        {
          label: "+Review",
          icon: <AddCommentIcon />,
          pathName: "/v2/create-review",
        },

        {
          label: "Reviews",
          icon: <FeedbackIcon />,
          pathName: "/v2/reviews",
        },

        {
          label: "News",
          icon: <ArticleIcon />,
          pathName: "/v2/news",
        },

        {
          label: "Contact",
          icon: <EmailIcon />,
          pathName: "/v2/contact",
        },

        {
          label: "Logout",
          icon: <LogoutIcon />,
          pathName: "/v2/login",
          onClick: () => {
            Cookie.remove("token");
            router.push("/v2/login");
            // if (isAdmin) {
            //   router.reload();
            // }
          },
        },
      ]
    : [
        {
          label: "Home",
          icon: <HomeIcon />,
          pathName: "/v2",
        },

        {
          label: "About",
          icon: <Person4Icon />,
          pathName: "/v2/about",
        },

        // {
        //   label: "Add Review",
        //   icon: <SettingsIcon />,
        //   pathName: "/v2/create-review",
        // },

        {
          label: "Reviews",
          icon: <FeedbackIcon />,
          pathName: "/v2/reviews",
        },

        {
          label: "News",
          icon: <ArticleIcon />,
          pathName: "/v2/news",
        },

        {
          label: "Contact",
          icon: <EmailIcon />,
          pathName: "/v2/contact",
        },

        {
          label: "Login",
          icon: <LoginIcon />,
          pathName: "/v2/login",
          onClick: () => {
            Cookie.remove("token");
            router.push("/v2/login");
            // if (isAdmin) {
            //   router.reload();
            // }
          },
        },

        {
          label: "Sign Up",
          icon: <PersonAddIcon />,
          pathName: "/v2/sign-up",
        },
      ];

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 10px)",
        flexDirection: "column",
        position: "sticky",
        top: 0,
        left: 0,
      }}
    >
      <Typography variant="h4" fontWeight="bold" mb={2} letterSpacing={7}>
        Vanjo
      </Typography>

      <List sx={{ width: "8rem" }}>
        {items.map((item) => (
          <ListItem disablePadding key={item.label}>
            <ListItemButton
              onClick={item.onClick && item.onClick}
              disableRipple
              disableGutters
              sx={{
                width: "fit-content",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
            >
              <ListItemText
                primary={
                  <Link href={item.pathName}>
                    <Typography
                      component="a"
                      fontSize="18px"
                      sx={{
                        color:
                          router.pathname === `${item.pathName}`
                            ? "#FFFFFF"
                            : "#BBBBBB",
                        "&:hover": {
                          letterSpacing: "3px",
                          transition: ".3s ease-in-out",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-start",
                          gap: "20px",
                        }}
                      >
                        {item.icon}
                        {item.label}
                      </Box>
                    </Typography>
                  </Link>
                }
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Typography variant="subtitle1" mt={5}>
        © {new Date().getFullYear()} Salvador Loiz
      </Typography>

      <Typography variant="subtitle1" fontSize="12px">
        Built using Next.js
      </Typography>
    </Box>
  );
};

export default SideNav;
