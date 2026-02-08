import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
  KeyboardBackspace as KeyboardBackspaceIcon,
  Menu as MenuIcon,
} from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Drawer,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from "../componenets/styled/StyledComponent";
import AvatarCard from "../componenets/shared/AvatarCard";
import { sampleChats, sampleUsers } from "../contants/sampleData";
import { lazy } from "react";
import { Suspense } from "react";
import USerItem from "../componenets/shared/USerItem";
import {
  useAddGroupMemberMutation,
  useDeleteChatMutation,
  useGetChatDetailsQuery,
  useGetMyGroupsQuery,
  useRemoveGroupMemberMutation,
  useUpdateGroupNameMutation,
} from "../redux/api/api";
import { useErrors, useMutationHokk } from "../hooks/hook";
import { LayoutLoader } from "../componenets/layout/Loaders";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../redux/reducer/msc";
// import AddMemberDialog from "../componenets/Dialog/AddMemberDialog";
// import ConfirmDeleteDialog from "../componenets/Dialog/ConfirmDeleteDialog";

const ConfirmDeleteDialog = lazy(
  () => import("../componenets/Dialog/ConfirmDeleteDialog"),
);
const AddMemberDialog = lazy(
  () => import("../componenets/Dialog/AddMemberDialog"),
);

// const isAddMember = false;

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const myGroups = useGetMyGroupsQuery();
  const navigate=useNavigate();
  console.log("Group:", myGroups.data);
  const groupDetails = useGetChatDetailsQuery(
    { chatId: chatId, populate: true },
    { skip: !chatId },
  );
  console.log("Group Details:", groupDetails.data);
  const [updateGroupName, isLoadingUpdategroupName] = useMutationHokk(
    useUpdateGroupNameMutation,
  );
  const [removeGroupMember, isLoadingRemoveGroupMember] = useMutationHokk(
    useRemoveGroupMemberMutation,
  );

  const [deleteGroup,isLoadingDeleteGroup]=useMutationHokk(useDeleteChatMutation,);

  const chatID = useSearchParams()[0].get("group");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNmaeUpdatedValue] = useState("");
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const [members, setMembers] = useState([]);
  const { isAddMember } = useSelector((state) => state.msc);

  const errors = [
    {
      isError: myGroups.isError,
      error: myGroups.error,
    },
    {
      isError: groupDetails.isError,
      error: groupDetails.error,
    },
  ];
  useErrors(errors);
  useEffect(() => {
    if (groupDetails.data) {
      setGroupName(groupDetails?.data?.chat?.name);
      setGroupNmaeUpdatedValue(groupDetails?.data?.chat?.name);
      setMembers(groupDetails?.data?.chat?.members);
    }
    return () => {
      setGroupName("");
      setGroupNmaeUpdatedValue("");
      setMembers([]);
      setIsEdit(false);
    };
  }, [groupDetails?.data]);

  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/");
  };
  const handleMobile = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleCloseMobile = () => {
    setIsMobileMenuOpen(false);
  };
  const updateGroupNameHandler = () => {
    setIsEdit(false);
    updateGroupName(`Update GroupName...`, {
      chatId: chatId,
      name: groupNameUpdatedValue,
    });
    console.log("Group name Updated ");
  };
  const openAddMemberHandler = () => {
    console.log("Add  member");
    dispatch(setIsAddMember(true));
  };
  const openConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(true);
    // console.log("Dlete Member");

  };
  const closeConfirmDeleteHandler = () => {
    setConfirmDeleteDialog(false);
  };
  const deleteHandler = () => {
    deleteGroup("Deleting Group...",chatId);
    closeConfirmDeleteHandler();
    navigate("/groups");
  };
  const removeMemberHandler = (userId) => {
    console.log(userId);
    removeGroupMember(`Removing Group Member...`, { chatId, userId });
  };
  // useEffect(() => {
  //   if (chatID) {
  //     setGroupName(`Group Name ${chatID}`);
  //     setGroupNmaeUpdatedValue(`Group Name ${chatID}`);
  //   }

  //   return () => {
  //     setGroupName("");
  //     setGroupNmaeUpdatedValue("");
  //     setIsEdit(false);
  //   };
  // }, [chatID]);

  const IconBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block ",
            sm: "none ",
            position: "fixed",
            top: "2rem",
            right: "2rem",
            padding: "",
          },
        }}
      >
        <IconButton onClick={handleMobile}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            top: "2rem",
            left: "2rem",
            bgcolor: "rgba(0,0,0,0.8)",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.9)",
            },
          }}
          onClick={navigateBack}
        >
          <KeyboardBackspaceIcon />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={"1rem"}
      padding={"3rem"}
    >
      {isEdit ? (
        <>
          <TextField
            value={groupNameUpdatedValue}
            onChange={(e) => setGroupNmaeUpdatedValue(e.target.value)}
          />
          <IconButton
            onClick={updateGroupNameHandler}
            disabled={isLoadingUpdategroupName}
          >
            <DoneIcon />
          </IconButton>
        </>
      ) : (
        <>
          <Typography variant={"h4"}>{groupName}</Typography>
          <IconButton
            onClick={() => setIsEdit(true)}
            disabled={isLoadingUpdategroupName}
          >
            <EditIcon />
          </IconButton>
        </>
      )}
    </Stack>
  );
  const ButtonGroup = (
    <Stack
      direction={{
        xs: "column-reverse",
        sm: "row",
      }}
      spacing={"1rem"}
      p={{
        xs: "0",
        sm: "1rem",
        md: "1rem 4rem",
      }}
    >
      <Button
        size="large"
        variant="contained"
        startIcon={<AddIcon />}
        onClick={openAddMemberHandler}
      >
        Add Member
      </Button>
      <Button
        size="large"
        variant="contained"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={openConfirmDeleteHandler}
      >
        Delete Group
      </Button>
    </Stack>
  );
  return myGroups.isLoading ? (
    <LayoutLoader />
  ) : (
    <Grid container height={"100vh"}>
      <Grid
        item
        sm={4}
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        bgcolor={"bisque"}
      >
        <GroupList myGroups={myGroups?.data?.groups} chatID={chatID} />
      </Grid>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem ",
        }}
      >
        {IconBtns}
        {groupName && (
          <>
            {GroupName}

            <Typography
              margin={"2rem"}
              alignSelf={"flex-start"}
              variant={"body1"}
            >
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              height={"50vh"}
              boxSizing={"border-box"}
              overflow={"auto"}
              spacing={"2rem"}
              padding={{
                xs: "1rem",
                sm: "0",
                md: "1rem 4rem",
              }}
            >
              {/* */}
              {isLoadingRemoveGroupMember ? (
                <CircularProgress />
              ) : (
                members.map((user) => (
                  <USerItem
                    key={user._id}
                    user={user}
                    isAdded
                    styling={{
                      boxShadow: "0 0 0.5rem rgba(0,0,0,0.2)",
                      padding: "1rem 2rem",
                      borderRadius: "1rem",
                    }}
                    handler={removeMemberHandler}
                  />
                ))
              )}
            </Stack>
            {ButtonGroup}
          </>
        )}
      </Grid>
      {isAddMember && (
        <Suspense fallback={<Backdrop open />}>
          <AddMemberDialog chatId={chatId} />
        </Suspense>
      )}
      {confirmDeleteDialog && (
        <>
          <Suspense fallback={<Backdrop open />}>
            <ConfirmDeleteDialog
              open={confirmDeleteDialog}
              handleClose={closeConfirmDeleteHandler}
              deleteHandler={deleteHandler}
            />
          </Suspense>
        </>
      )}
      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleCloseMobile}
      >
        <GroupList
          w={"50vw"}
          myGroups={myGroups?.data?.groups}
          chatID={chatID}
        />
      </Drawer>
    </Grid>
  );
};
const GroupList = ({ w = "100%", myGroups = [], chatID }) => (
  <Stack w={w}>
    {myGroups.length > 0 ? (
      myGroups.map((i) => (
        <GroupListItem key={i._id} group={i} chatID={chatID} />
      ))
    ) : (
      <Typography textAlign={"center"} padding={"1rem "}>
        No Group
      </Typography>
    )}
  </Stack>
);
const GroupListItem = ({ group, chatID }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatID == _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
};

export default Groups;
