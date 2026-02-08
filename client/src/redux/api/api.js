import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { server } from "../../contants/config.js";
import { CardMembership } from "@mui/icons-material";
import { chatIdValidator } from "../../../../server/lib/validators.js";

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
    getMyGroups: builder.query({
      query: () => ({
        url: "chat/my/groups",
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
    updateGroupName:builder.mutation({
      query:({chatId,name})=>({
        url:`chat/${chatId}`,
        method:"PUT",
        credentials:"include",
        body:{name},
      }),
      invalidatesTags:["Chat"],
    }),
    availableFriends: builder.query({
      query: (chatId) => {
        let url=`user/friends`;
        if(chatId) url+=`chatId=${chatId}`;

        return {
          url,
          credentials:"include"
        }
      },
      providesTags: ["User"],
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
    newGroup: builder.mutation({
      query: ({name,members}) => ({
        url: "chat/new",
        method: "POST",
        credentials: "include",
        body: {name,members},
      }),
      providesTags:["Chat"]
    }),
    removeGroupMember: builder.mutation({
      query: ({chatId,userId}) => ({
        url: "chat/removeMembers",
        method: "PUT",
        credentials: "include",
        body: {chatId,userId},
      }),
      providesTags:["Chat"]
    }),
    addGroupMember: builder.mutation({
      query: ({chatId,members}) => ({
        url: "chat/addMembers",
        method: "PUT",
        credentials: "include",
        body: {chatId,members},
      }),
      providesTags:["Chat"]
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
        
      }),
      invalidatesTags:["Chat"]
    }),
    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
        
      }),
      invalidatesTags:["Chat"]
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
  useSendAttatchementMutation,
  useGetMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
  useUpdateGroupNameMutation,
  useRemoveGroupMemberMutation,
  useAddGroupMemberMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation
} = api;

