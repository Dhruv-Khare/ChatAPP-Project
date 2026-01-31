import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { server } from "../../contants/config.js";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
  }),
  tagTypes: ["Chats", "User","Message"],

  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/my",
        credentials: "include",
      }),
      providesTags: ["Chats"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    getNotification: builder.query({
      query: () => ({
        url: `user/allNotifications`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    sendFriendReq: builder.mutation({
      query: (data) => ({
        url: "user/send-request",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    acceptFriendReq: builder.mutation({
      query: (data) => ({
        url: "user/accept-request",
        method: "PUT",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Chats"],
    }),
    getChatDetails: builder.query({
      query: ({chatId,populate=false}) => {
        let url=`chat/${chatId}`;
        if(populate) url+="?populate=true";

        return {
          url,
          credentials:"include"
        }
      },
      providesTags: ["Chat"],
    }),
    getMyMessages: builder.query({
      query: ({chatId,page}) =>({
          url:`chat/message/${chatId}?page=${page}`,
          credentials:"include"
        }),
      // providesTags: ["Message"],
      keepUnusedDataFor:0,
    }),
    sendAttatchement: builder.mutation({
      query: (data) => ({
        url: "chat/message",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendReqMutation,
  useGetNotificationQuery,
  useAcceptFriendReqMutation,
  useGetChatDetailsQuery,
  useGetMyMessagesQuery,
  useSendAttatchementMutation
} = api;
