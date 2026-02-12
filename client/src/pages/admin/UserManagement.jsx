import React, { useEffect, useState } from "react";
import AdminLayout from "../../componenets/layout/AdminLayout";
import Table from "../../componenets/shared/Table";
import { Avatar, Skeleton } from "@mui/material";
import { dashboardData } from "../../contants/sampleData";
import { TransformImage } from "../../lib/features";
import { useFetchData } from "6pp";
import { server } from "../../contants/config";
import { useErrors } from "../../hooks/hook";
import { LayoutLoader } from "../../componenets/layout/Loaders";
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
    renderCell: (params) => (
      <Avatar alt={params.row.name} src={params.row.avatar} />
    ),
  },
  {
    field: "name",
    headerName: "Name",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "userName",
    headerName: "UserName",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "friends",
    headerName: "Friends",
    headerClassName: "table-header",
    width: 150,
  },
  {
    field: "groups",
    headerName: "Groups",
    headerClassName: "table-header",
    width: 200,
  },
];
const UserManagement = () => {
  const { loading, data, error } = useFetchData({
    url: `${server}/api/v1/admin/users`,
    key: "users-stats",
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
    if (data) {
      setRows(
        data?.users?.map((i) => ({
          ...i,
          id: i._id,
          avatar: TransformImage(i.avatar, 50),
        })),
      );
    }
  }, [data]);

  return (
    <AdminLayout>
      {loading ? (
       <Skeleton height={"100vh"}/>
      ) : (
        <Table heading={"All Users"} columns={columns} rows={rows} />
      )}
    </AdminLayout>
  );
};

export default UserManagement;
