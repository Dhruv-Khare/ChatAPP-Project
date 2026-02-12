import {
  Box,
  Container,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import AdminLayout from "../../componenets/layout/AdminLayout";
import {
  AdminPanelSettings,
  Group as GroupIcon,
  Message as MessageIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import moment from "moment";
import {
  CurveButton,
  SearchField,
} from "../../componenets/styled/StyledComponent";
import { DoughnutCharts, LineCharts } from "../../componenets/specific/Charts";
import { useErrors, useMutationHokk } from "../../hooks/hook";
import { useGetAdminDashboardStatsMutation } from "../../redux/api/api";
import { useFetchData } from "6pp";
import { server } from "../../contants/config";
import { LayoutLoader } from "../../componenets/layout/Loaders";

const Dashboard = () => {
  const { loading, data, error } = useFetchData({
    url: `${server}/api/v1/admin/stats`,
    key: "dashboard-stats",
    credentials: "include",
  });

  useErrors([
    {
      isError: error,
      error: error,
    },
  ]);

  const {
    totalUsers,
    totalMessages,
    totalGroups,
    totalChats,
    messagesLast7Days,
  } = data?.stats || {};

  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings
          sx={{
            fontSize: "3rem",
          }}
        />
        <SearchField placeholder="Search..." />
        <CurveButton> Search</CurveButton>
        <Box flexGrow={"1"} />
        <Typography
          display={{
            xs: "none",
            lg: "block",
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("dddd ,D MMMM YYYY")}
        </Typography>
        <NotificationsIcon />
      </Stack>
    </Paper>
  );
  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={totalUsers || 0} Icon={<PersonIcon />} />
      <Widget title={"Chats"} value={totalChats || 0} Icon={<GroupIcon />} />
      <Widget
        title={"Messages"}
        value={totalMessages || 0}
        Icon={<MessageIcon />}
      />
    </Stack>
  );
  return (
    <AdminLayout>
      {loading ? (
        <Skeleton height={"100vh"}/>
      ) : (
        <Container component={"main"}>
          {Appbar}
          <Stack
            direction={{
              xs: "column",
              lg: "row",
            }}
            flexWrap={"wrap"}
            justifyContent={"center"}
            alignItems={{
              xs: "center",
              lg: "stretch",
            }}
            sx={{
              gap: "2rem",
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: "2rem 3.5rem",
                borderRadius: "1rem",
                width: "100%",
                maxWidth: "40rem",
              }}
            >
              <Typography variant="h4" margin={"2rem 0"}>
                Last Messages
              </Typography>
              <LineCharts value={messagesLast7Days || []} />
            </Paper>
            <Paper
              elevation={3}
              sx={{
                padding: "1rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: {
                  xs: "100%",
                  lg: "50%",
                },
                position: "relative",
                maxWidth: "25rem",
              }}
            >
              <DoughnutCharts
                labels={["Single Chat", "Group Chat"]}
                value={[totalChats || 0, totalGroups || 0]}
              />
              <Stack
                position={"absolute"}
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={"0.5rem"}
                width={"100%"}
                height={"100%"}
              >
                <GroupIcon />
                <Typography>Vs</Typography>
                <PersonIcon />
              </Stack>
            </Paper>
          </Stack>
          {Widgets}
        </Container>
      )}
    </AdminLayout>
  );
};
const Widget = ({ title, value, Icon }) => (
  <Paper
    elevation={3}
    sx={{
      padding: "2rem",
      margin: "2rem 0",
      borderRadius: "1rem",
      width: "20rem",
    }}
  >
    <Stack alignItems={"center"} spacing={"1rem"}>
      <Typography
        sx={{
          color: "rgba(0,0,0,0.7)",
          borderRadius: "50%",
          border: "5px solid rgba(0,0,0,0.9)",
          width: "5rem",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {value}
      </Typography>
      <Stack>
        {Icon}
        <Typography>{title}</Typography>
      </Stack>
    </Stack>
  </Paper>
);

export default Dashboard;
