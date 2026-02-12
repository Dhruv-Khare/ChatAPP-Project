import { useFetchData } from "6pp";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import AdminLayout from "../../componenets/layout/AdminLayout";
import RenderAttachment from "../../componenets/shared/RenderAttachment";
import Table from "../../componenets/shared/Table";
import { server } from "../../contants/config";
import { useErrors } from "../../hooks/hook";
import { fileFormate, TransformImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachment",
    headerClassName: "table-header",
    width: 200,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i) => {
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
                  {RenderAttachment(file, url)}
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
  const { loading, data, error } = useFetchData({
    url: `${server}/api/v1/admin/messages`,
    key: "message-stats",
    credentials: "include",
  });
  console.log("data", data);
  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
   if(data){
     setRows(
      data?.messages?.map((i) => ({
        ...i,
        id: i._id,
        sender: {
          name: i.sender.name,
          avatar: TransformImage(i.sender.avatar, 50),
        },
        createdAt: moment(i.createdAt).format("MMMM Do YYYY"),
      })),
    );
   }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"}/>
      ) : (
        <Table
          heading="All Messages"
          columns={columns}
          rows={rows}
          rowHeight={200}
        />
      )}
    </AdminLayout>
  );
};

export default MessageManagement;
