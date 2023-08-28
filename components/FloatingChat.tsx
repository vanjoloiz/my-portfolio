import Fab from "@mui/material/Fab";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";

const FloatingChat = () => {
  return (
    <Box
      sx={{
        position: "sticky",
        bottom: "50px",
        margin: "45px",
        marginTop: "0 !important",
        marginBottom: "0 !important",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <Tooltip
        title="Salvador Loiz is here right now!"
        arrow
        open
        placement="left-start"
      >
        <Fab color="primary">
          <ChatBubbleIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default FloatingChat;
