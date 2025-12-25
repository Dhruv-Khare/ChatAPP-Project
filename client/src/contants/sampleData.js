// (avtar = []),
//   name,
//   _id,
//   (groupChat = false),
//   sameSender,
//   isOnline,
//   newMessageAlert,
//   (index = 0),
//   handleDeleteChatOpen;

export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Dhruv Khare ",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Sumit Kumar ",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
];
export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Dhruv Khare ",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Dhruv Khare ",
    _id: "2",
  },
];
export const smapleNotification = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dhruv Khare ",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dhruv Khare ",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attatchements: [],
    content: "hello this is me  ",
    _id: " 2fhj22fh28",
    sender: {
      _id: "user._id",
      name: "Sumit Kumar ",
    },
    chat: "chatID",
    createdAt: " 2022-01-01T00:00:00.000Z",
  },
  {
    attatchements: [
      {
        public_id: "hwhhs22",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    content: "",
    _id: " 2fhj22fh282",
    sender: {
      _id: "1",
      name: "Dhruv khare",
    },
    chat: "chatID",
    createdAt: " 2022-01-01T00:00:00.000Z",
  },
];

export const dashboardData = {
  users: [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dhruv Khare ",
      _id: "1",
      username: "Dhruv Khare",
      friends: 20,
      groups: 5,
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dhruv Khare ",
      _id: "1",
      username: "Dhruv Khare",
      friends: 20,
      groups: 5,
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dhruv Khare ",
      _id: "1",
      username: "Dhruv Khare",
      friends: 20,
      groups: 5,
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dhruv Khare ",
      _id: "1",
      username: "Dhruv Khare",
      friends: 20,
      groups: 5,
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dhruv Khare ",
      _id: "1",
      username: "Dhruv Khare",
      friends: 20,
      groups: 5,
    },
  ],
  chats: [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
      name: "John Doe Group ",
      _id: "3",
      groupChat: true,
      members: [
        {
          _id: "1",
          avatar: "https://www.w3schools.com/howto/img_avatar2.png",
        },
        {
          _id: "2",
          avatar: "https://www.w3schools.com/howto/img_avatar2.png",
        },
      ],
      totalMembers: 3,
      totalMessages: 30,
      creator: {
        name: "John Doe",
        avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
      },
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
      name: "Jane Doe Group ",
      _id: "4",
      groupChat: true,
      members: [
        {
          _id: "1",
          avatar: "https://www.w3schools.com/howto/img_avatar2.png",
        },
        {
          _id: "2",
          avatar: "https://www.w3schools.com/howto/img_avatar2.png",
        },
      ],
      totalMembers: 4,
      totalMessages: 40,
      creator: {
        name: "Jane Doe",
        avatar: ["https://www.w3schools.com/howto/img_avatar2.png"],
      },
    },
  ],
  messages: [
    {
      attatchments: [],
      content: "L ka Message hai",
      _id: "1",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar2.png",
        _id: "user._id",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: " 2022-01-01T00:00:00.000Z",
    },
    {
      attatchments: [
        {
          public_id: "939uiw",
          url: "https://www.w3schools.com/howto/img_avatar2.png",
        },
      ],
      content: "",
      _id: "2",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar2.png",
        _id: "user._id",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2022-01-01T00:00:00.000Z",
    },
  ],
};
