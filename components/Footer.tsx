import { FC } from "react";
import Typography from "@mui/material/Typography";

const Footer: FC = () => {
  return (
    <footer style={{ marginTop: "10px" }}>
      <Typography variant="subtitle1" align="center" gutterBottom>
        Copyright © Salvador Loiz. 2023.
      </Typography>
    </footer>
  );
};

export default Footer;
