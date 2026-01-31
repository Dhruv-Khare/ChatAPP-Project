import { createSlice } from "@reduxjs/toolkit";
import { getorSaveLocalstorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../contants/event";

const initialState={
    notificationCount:0,
    newMessageAlert:getorSaveLocalstorage({key:NEW_MESSAGE_ALERT,get:true})||[{
        chatId:"",
        count:0,
    }]
}


const chatSlice=createSlice({
    name:'chat',
    initialState:initialState,
    reducers:{
        incrementNotification:(state)=>{
            state.notificationCount=state.notificationCount+1;
        },
        resetNotificationCount:(state)=>{
            state.notificationCount=0;
        },
        setNewMessageAlert:(state,action)=>{
            
            const index=state.newMessageAlert.findIndex(item=>item.chatId===action.payload.chatId);

            if(index!==-1)
            {
                state.newMessageAlert[index].count+=1;
            }else{
                state.newMessageAlert.push({
                    chatId:action.payload.chatId,
                    count:1
                })
            }


        },

        removeNewMessageAlert:(state,action)=>{
            state.newMessageAlert=state.newMessageAlert.filter(item=>item.chatId!==action.payload);
        }
   
    }
});



export default chatSlice;
export const {
    incrementNotification,
    resetNotificationCount,
    setNewMessageAlert,
    removeNewMessageAlert
  
}=chatSlice.actions;