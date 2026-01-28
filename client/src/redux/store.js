import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/auth";
import  mscSlice  from "./reducer/msc";
import api from "./api/api";

const store=configureStore({
    reducer:{
        //add reducers here
        [authSlice.name]:authSlice.reducer,
        [api.reducerPath]:api.reducer,
        [mscSlice.name]:mscSlice.reducer,
    },
    middleware:(defaultMiddleWare)=>[...defaultMiddleWare(),api.middleware]
});





export default store;