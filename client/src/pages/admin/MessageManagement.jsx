import React, { useEffect, useState } from "react";
import AdminLayout from "../../componenets/layout/AdminLayout";
import Table from "../../componenets/shared/Table";
import { dashboardData } from "../../contants/sampleData";
import { fileFormate, TransformImage } from "../../lib/features";
import { Avatar } from "@mui/material";
import { Box, Stack } from "@mui/material";
import moment from "moment";
import RenderAttatchment from "../../componenets/shared/RenderAttatchment";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attatchments",
    headerName: "Attatchment",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      debugger;
      const { attatchments } = params.row;

      return attatchments?.length > 0
        ? attatchments.map((i) => {
            const url = i.url;
            const file = fileFormate(url);
            return (
              <Box key={url}>
                <a
                  href={i.url}
                  download
                  target="_blank"
                  style={{ color: "black" }}
                >
                  {RenderAttatchment(file, url)}
                </a>
              </Box>
            );
          })
        : "No attachments";
    },
  },
  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },
  {
    field: "sender",
    headerName: "Send By",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => (
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },
  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 220,
  },
  {
    field: "groupChat",
    headerName: "Group Chats",
    headerClassName: "table-header",
    width: 100,
  },
  {
    field: "createdAt",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];
const MessageManagement = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(
      dashboardData.messages.map((i) => ({
        ...i,
        id: i._id,
        sender: {
          name: i.sender.name,
          avatar: TransformImage(i.sender.avatar, 50),
        },
        createdAt: moment(i.createdAt).format("MMMM Do YYYY"),
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table
        heading="All Messages"
        columns={columns}
        rows={rows}
        rowHeight={200}
      />
    </AdminLayout>
  );
};

export default MessageManagement;
