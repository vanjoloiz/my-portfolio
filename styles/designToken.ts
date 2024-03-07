import { PaletteMode } from "@mui/material";

const BLACK = "#000000";
const WHITE = "#FFFFFF";
const GRAY = "#7C7C7C";
const GRAY_ALTERNATIVE = "#868686";

const ALABASTER = "#FAF9F6";
const GHOST_WHITE = "#F8F8F8";
const ANTIQUE_WHITE = "#FEFEFE";
const MIDNIGHT_BLACK = "#111111";

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: BLACK,
          },
          secondary: {
            main: ALABASTER,
          },
          background: {
            main: GHOST_WHITE,
            secondary: WHITE,
            paper: WHITE,
          },
          text: {
            primary: BLACK,
            secondary: MIDNIGHT_BLACK,
          },
          link: {
            default: GRAY,
            active: BLACK,
          },
        }
      : {
          primary: {
            main: WHITE,
          },
          secondary: {
            main: MIDNIGHT_BLACK,
          },
          background: {
            main: MIDNIGHT_BLACK,
            secondary: BLACK,
            paper: MIDNIGHT_BLACK,
          },
          text: {
            primary: ANTIQUE_WHITE,
            secondary: "#BBBBBB",
          },
          link: {
            default: GRAY_ALTERNATIVE,
            active: ANTIQUE_WHITE,
          },
        }),
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});
