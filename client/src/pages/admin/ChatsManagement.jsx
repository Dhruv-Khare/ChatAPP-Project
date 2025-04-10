import React, { useEffect, useState } from "react";
import AdminLayout from "../../componenets/layout/AdminLayout";
import Table from "../../componenets/shared/Table";
import { Avatar, Stack } from "@mui/material";
import { dashboardData } from "../../contants/sampleData";
import { TransformImage } from "../../lib/features";
import AvatarCard from "../../componenets/shared/AvatarCard";
const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "avatar",
    headerName: "Avatar",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => <AvatarCard avatar={params.row.avatar} />,
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 300,
  },
  {
    field: "totalMembers",
    headerName: "Total Members",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "members",
    headerName: "Mebers",
    headerClassName: "table-header",
    width: 400,
    renderCell: (params) => (
      <AvatarCard max={100} avatar={params.row.members} />
    ),
  },
  {
    field: "totalMessages",
    headerName: "Total Messages",
    headerClassName: "table-header",
    width: 120,
  },
  {
    field: "creator",
    headerName: "Created By",
    headerClassName: "table-header",
    width: 250,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.creator.name} src={params.row.creator.avatar} />
        <span>{params.row.creator.name}</span>
      </Stack>
    ),
  },
];
const ChatsManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dashboardData.chats.map((i) => ({
        ...i,
        id: i._id,
        avatar: i.avatar.map((i) => TransformImage(i, 50)),
        members: i.members.map((i) => TransformImage(i.avatar, 50)),
        creator: {
          name: i.creator.name,
          avatar: TransformImage(i.creator.avatar, 50),
        },
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table heading={"All Chats"} columns={columns} rows={rows} />
    </AdminLayout>
  );
};

export default ChatsManagement;
