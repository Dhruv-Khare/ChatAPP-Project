import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/auth";
import  mscSlice  from "./reducer/msc";
import api from "./api/api";
import chatSlice from "./reducer/chat";

const store=configureStore({
    reducer:{
        //add reducers here
        [authSlice.name]:authSlice.reducer,
        [api.reducerPath]:api.reducer,
        [mscSlice.name]:mscSlice.reducer,
        [chatSlice.name]:chatSlice.reducer,
    },
    middleware:(defaultMiddleWare)=>[...defaultMiddleWare(),api.middleware]
});





export default store;