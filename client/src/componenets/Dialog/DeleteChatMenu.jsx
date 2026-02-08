import { Menu, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setIsDeleteMenu } from "../../redux/reducer/msc";
import { Delete as DeleteIcon, ExitToApp as ExitToAppIcon } from "@mui/icons-material";
import { useMutationHokk } from "../../hooks/hook";
import { useDeleteChatMutation, useLeaveGroupMutation } from "../../redux/api/api";
import { useNavigate } from "react-router-dom";

const DeleteChatMenu = ({ dispatch, deleteOptionAnchor }) => {
    const {isDeleteMenu,selectedDeleteChats}=useSelector(state=>state.msc);
    const [deleteChat,_,deleteChatData]=useMutationHokk(useDeleteChatMutation);
    const [leaveGroup,__,leaveGroupData]=useMutationHokk(useLeaveGroupMutation);
    const navigate=useNavigate();
    const closeHandler=()=>{
        dispatch(setIsDeleteMenu(false));
    };
    const isGroup=selectedDeleteChats.groupChat;
    const deleteChatHandler=()=>{
        closeHandler();
        deleteChat("Deleting Chat...",selectedDeleteChats.chatId);
    };
    const leaveGroupHandler=()=>{
        closeHandler();
        leaveGroup("Leaving Group...",selectedDeleteChats.chatId);
    }
    useEffect(()=>{
        if(deleteChatData||leaveGroupData) navigate("/");
    },[deleteChatData,leaveGroupData])
  return (
    
    <Menu open={isDeleteMenu} onClose={closeHandler} anchorEl={deleteOptionAnchor} anchorOrigin={{
        vertical:"center",
        horizontal:"center"
    }}>
      <Stack
        sx={{
          width: "10rem",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        direction={"row"}
        alignItems={"center"}
        spacing={"0.5rem"}
        onClick={isGroup?leaveGroupHandler:deleteChatHandler}
      >
        {isGroup?<><ExitToAppIcon/> Leave Group</>:<><DeleteIcon/> Delete Chat</>}
      </Stack>
    </Menu>
  );
};

export default DeleteChatMenu;
