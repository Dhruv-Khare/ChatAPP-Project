import { createApi,fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { server } from "../../contants/config.js";

const api=createApi({
    reducerPath:"api",
    baseQuery:fetchBaseQuery({
        baseUrl:`${server}/api/v1/`
    }),
    tagTypes:["Chats","User"],

    endpoints:builder=>({
        myChats:builder.query({
            query:()=>({
                url:"chat/my",
                credentials:"include",
            }),
            providesTags:["Chats"]
        }),
        searchUser:builder.query({
            query:(name)=>({
                url:`user/search?name=${name}`,
                credentials:"include",
            }),
            providesTags:["User"]

        }),
        sendFriendReq:builder.mutation({
            query:(data)=>({
                url:"user/send-request",
                method:"PUT",
                credentials:"include",
                body:data,
            }),
            invalidatesTags:["User"]
            })
        })
    })


export default api;
export const {useMyChatsQuery,useLazySearchUserQuery,useSendFriendReqMutation}=api;