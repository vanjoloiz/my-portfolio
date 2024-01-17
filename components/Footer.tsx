import { FC } from "react";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const Footer: FC = () => {
  return (
    <footer style={{ marginTop: "10px", marginBottom: "15px" }}>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Copyright © Salvador Loiz. 2023.
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Link
          href="https://github.com/vanjoloiz/my-portfolio"
          color="inherit"
          target="_blank"
          rel="noopener"
        >
          <Tooltip title="Gimme some star!" arrow>
            <GitHubIcon sx={{ cursor: "pointer" }} />
          </Tooltip>
        </Link>
      </Box>
    </footer>
  );
};

export default Footer;
