// import React from "react";
import { IconButton, Skeleton, Stack } from "@mui/material";
import Applayout from "../componenets/layout/Applayout.jsx";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { grayColor, orange } from "../contants/color.jsx";
import {
  AttachFile as AttachFileIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { InputBox } from "../componenets/styled/StyledComponent.jsx";
import FileMenu from "../componenets/Dialog/FileMenu.jsx";
// import { sampleMessage } from "../contants/sampleData.js";
import MessageComponent from "../componenets/shared/MessageComponent.jsx";
import { getSocket } from "../socket.jsx";
import { NEW_MESSAGE } from "../contants/event.js";
import {
  useGetChatDetailsQuery,
  useGetMyMessagesQuery,
} from "../redux/api/api.js";
import { useErrors, useSocketEvents } from "../hooks/hook.jsx";
import { useInfiniteScrollTop } from "6pp";
import { useDispatch } from "react-redux";
import { setIsFileMenu } from "../redux/reducer/msc.js";
import { removeNewMessageAlert } from "../redux/reducer/chat.js";

const Chat = ({ chatId, user }) => {
  const containerRef = useRef(null);
  const socket = getSocket();
  const dispatch=useDispatch();
  // console.log(chatId===user._id,chatId,user._id);
  // const fileMenuRef = useRef(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [fileMenuAnchor,setFileMenuAnchor]=useState(null);

  const chatDetails = useGetChatDetailsQuery({ chatId, skip: !chatId });
  const oldMessagesChunk = useGetMyMessagesQuery({ chatId, page });

  const totalPage=oldMessagesChunk?.data?.totalPages;
  const newData=oldMessagesChunk?.data?.messages;

  const {data:oldMessages,setData:setOldMessages}=useInfiniteScrollTop(containerRef,totalPage,page,setPage,newData);

  const errors = [
    { isError: chatDetails.isError, error: chatDetails.error },
    { isError: oldMessagesChunk.isError, error: oldMessagesChunk.error },
  ];
  // console.log(chatDetails.data);

  // console.log("oldMessageChunk", oldMessagesChunk.data);
  const members = chatDetails?.data?.chat?.members;

  const attatchFileMEnuHanlder=(e)=>{
    dispatch(setIsFileMenu(true));
    setFileMenuAnchor(e.currentTarget)
  }
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(message);
    if (!message.trim()) return;

    socket.emit(NEW_MESSAGE, { chatId, message, members });
    console.log(chatId,message.sender);
    setMessage("");
  };

  useEffect(()=>{
    dispatch(removeNewMessageAlert(chatId));
    return ()=>{
      setMessage("");
      setMessages([]);
      setOldMessages([]);
      setPage(1);
    }
  },[chatId])

  const newMessagesHandler = useCallback((data) => {
    console.log(data);
    if(data.chatId!==chatId) return ;
    setMessages((prev) => [...prev, data.message]);
  }, [chatId]);

  const eventArr = { [NEW_MESSAGE]: newMessagesHandler };

  useSocketEvents(socket, eventArr);

  useErrors(errors);

  const allMessages=[...oldMessages,...messages];
  // console.log(allMessages);


  return chatDetails.isLoading ? (
    <Skeleton />
  ) : (
    <Fragment>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"1rem"}
        spacing={"1rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* <ChatHeader /> */}
        
        {allMessages.map((i) => (
          <MessageComponent key={i._id} message={i} user={user} />
        ))}
      </Stack>
      <form
        style={{
          height: "10%",
        }}
        onSubmit={submitHandler}
      >
        <Stack
          direction={"row"}
          height={"100%"}
          padding={"1rem"}
          alignItems={"center"}
          position={"relative"}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "1rem",
              rotate: "30deg",
            }}
            onClick={attatchFileMEnuHanlder}
            // ref={fileMenuRef}
          >
            <AttachFileIcon />
          </IconButton>
          <InputBox
            placeholder="type massege here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <IconButton
            type="submit"
            sx={{
              bgcolor: orange,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem ",
              "&:hover": {
                bgcolor: "error.dark",
              },
            }}
          >
            <SendIcon />
          </IconButton>
        </Stack>
      </form>
      <FileMenu anchorE1={fileMenuAnchor} chatId={chatId}/>
    </Fragment>
  );
};

const EnhancedChat = Applayout()(Chat);
export default EnhancedChat;
