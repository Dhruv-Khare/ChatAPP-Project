import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isNewGroup:false,
    isAddMember:false,
    isNotifications:false,
    isMobile:false,
    isSearch:false,
    isFileMenu:false,
    isDeleteMenu:false,
    uploadingLoader:false,
    selectedDeleteChats:{
        chatId:"",
        groupChat:false,
    }
}


const mscSlice=createSlice({
    name:'msc',
    initialState:initialState,
    reducers:{
        setIsNewGroup:(state,action)=>{
            state.isNewGroup=action.payload;
        },
        setIsAddMember:(state,action)=>{
            state.isAddMember=action.payload;
        },
        setIsNotifications:(state,action)=>{
            state.isNotifications=action.payload;
        },
        setIsMobile:(state,action)=>{
            state.isMobile=action.payload;
        },
        setIsSearch:(state,action)=>{
            state.isSearch=action.payload;
        },
        setIsFileMenu:(state,action)=>{
            state.isFileMenu=action.payload;
        },
        setIsDeleteMenu:(state,action)=>{
            state.isDeleteMenu=action.payload;
        },
        setUploadingLoader:(state,action)=>{
            state.uploadingLoader=action.payload;
        },
        setSelectedDeleteChats:(state,action)=>{
            state.selectedDeleteChats=action.payload;
        }
    }
});



export default mscSlice;
export const {
    setIsNewGroup,
    setIsAddMember,
    setIsNotifications,
    setIsMobile,
    setIsSearch,
    setIsFileMenu,
    setIsDeleteMenu,
    setUploadingLoader,
    setSelectedDeleteChats
}=mscSlice.actions;