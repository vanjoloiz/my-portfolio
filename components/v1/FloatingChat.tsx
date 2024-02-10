import { useState, Fragment, useEffect, useRef, FC } from "react";
import { io } from "socket.io-client";
import Fab from "@mui/material/Fab";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import { BASE_URL } from "@utils/baseUrl";

const socket = io(BASE_URL);

interface FloatingChat {
  user?: any;
  isAdmin?: boolean;
  isLoggedIn: boolean;
  messages: any;
  setMessages: any;
}

const scrollDivToBottom = (divRef: any) => {
  return (
    divRef.current !== undefined &&
    divRef.current !== null &&
    divRef.current.scrollIntoView({ behavior: "smooth" })
  );
};

const FloatingChat: FC<FloatingChat> = ({
  user,
  isAdmin,
  isLoggedIn,
  messages,
  setMessages,
}) => {
  const divRef = useRef();

  const [isShowChats, setIsShowChats] = useState(false);

  const [message, setMessage] = useState({
    userId: user?._id,
    userIdToSend: isAdmin
      ? "6426ea5b9f3c8c2c97b4cc70"
      : "642654cf90b5bced5ed5dc68",
    message: "",
    userName: user?.firstName,
  });

  useEffect(() => {
    messages.length > 0 && scrollDivToBottom(divRef);
  }, [messages, isShowChats]);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: "50px",
        right: "10px",
        margin: "45px",
        marginTop: "0 !important",
        marginBottom: "0 !important",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 9,
      }}
    >
      {isShowChats && (
        <>
          <Card sx={{ maxWidth: "375px", height: "auto", width: "375px" }}>
            {!isLoggedIn ? (
              <>
                <CardHeader
                  sx={{
                    paddingBottom: "5px",
                  }}
                  title={
                    <Typography gutterBottom>
                      Log in to message Salvador.
                    </Typography>
                  }
                />

                <CardContent>
                  <Button
                    variant="contained"
                    disableElevation
                    disableFocusRipple
                  >
                    Login
                  </Button>
                </CardContent>
              </>
            ) : (
              <>
                <CardHeader
                  title={<Typography gutterBottom>Salvador Loiz</Typography>}
                />
                <Divider />
                <CardContent>
                  <List sx={{ maxHeight: "250px", overflowY: "scroll" }}>
                    {messages.map((chat: any, index: number) => (
                      <Fragment key={index}>
                        <ListItem
                          //@ts-ignore
                          ref={divRef}
                          sx={{
                            display: "flex",
                            justifyContent:
                              user._id !== chat.userIdToSend
                                ? "flex-end"
                                : "flex-start",
                          }}
                        >
                          {user._id === chat.userIdToSend && (
                            <ListItemAvatar>
                              <Avatar />
                            </ListItemAvatar>
                          )}

                          <div>
                            {user._id === chat.userIdToSend && (
                              <div>{chat.userName}</div>
                            )}
                            <div
                              style={{
                                backgroundColor: "#1976d2",
                                padding: "10px",
                                color: "#ffebee",
                                borderRadius: "5px",
                              }}
                            >
                              <ListItemText>{chat.message}</ListItemText>
                            </div>
                          </div>
                        </ListItem>
                      </Fragment>
                    ))}
                  </List>

                  <div style={{ display: "flex" }}>
                    <TextField
                      value={message.message}
                      fullWidth
                      size="small"
                      margin="dense"
                      multiline
                      maxRows={4}
                      onChange={(e) => {
                        setMessage((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }));
                      }}
                      onKeyDown={(e: any) => {
                        if (e.keyCode === 13 && !e.shiftKey) {
                          e.preventDefault();
                          // setMessage({
                          //   ...message,
                          // userId: user._id,
                          // message: "",
                          // userName: user.firstName,
                          // });

                          setMessage((prevMessage) => ({
                            ...prevMessage,
                            message: "",
                          }));

                          if (message.message === "") return;

                          setMessages((prevMessages: any) => [
                            ...prevMessages,
                            message,
                          ]);

                          socket.emit("sendMessageToServer", { message });
                        }
                      }}
                    />

                    <IconButton
                      sx={{ cursor: "pointer" }}
                      type="submit"
                      onClick={() => {
                        if (message.message === "") return;

                        setMessage((prev) => ({
                          ...prev,
                          userId: user._id,
                          message: "",
                        }));

                        setMessages((prevMessages: any) => [
                          ...prevMessages,
                          message,
                        ]);

                        socket.emit("sendMessageToServer", { message });
                      }}
                    >
                      <SendIcon />
                    </IconButton>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </>
      )}

      <Tooltip
        title="Salvador Loiz is here right now!"
        arrow
        open={!isShowChats && !isAdmin}
        placement="left-start"
      >
        <Fab
          color="primary"
          style={{ marginTop: "auto", marginLeft: "5px" }}
          onClick={() => setIsShowChats(!isShowChats)}
        >
          <ChatBubbleIcon />
        </Fab>
      </Tooltip>
    </Box>
  );
};

export default FloatingChat;
