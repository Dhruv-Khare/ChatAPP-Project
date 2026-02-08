import { Button, Dialog, DialogTitle, Skeleton, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../contants/sampleData";

import USerItem from "../shared/USerItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddMember } from "../../redux/reducer/msc";
import { useErrors, useMutationHokk } from "../../hooks/hook";
import {
  useAddGroupMemberMutation,
  useAvailableFriendsQuery,
} from "../../redux/api/api";

const AddMemberDialog = ({ chatId }) => {
  // const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  // const groupName = useInputValidation("");
  //this is not woring

  const [addGroupMember, isLoadingAddGroupMember] = useMutationHokk(
    useAddGroupMemberMutation,
  );
  const { isAddMember } = useSelector((state) => state.msc);

  const { isError, error, isLoading, data,refetch } = useAvailableFriendsQuery();

  console.log(data);

  const dispatch = useDispatch();

  const errors = [{ isError, error }];
  useErrors(errors);
  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id],
    );
  };

  const addMemberSubmitHandler = () => {
    addGroupMember("Adding Members To Group...", {
      chatId,
      members: selectedMembers,
    });
    refetch();
    closeHandler();
  };
  const closeHandler = () => {
    dispatch(setIsAddMember(false));
    // setSelectedMembers([]);
    // setMembers([]);
  };
  return (
    <Dialog open={isAddMember} onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {isLoading?<Skeleton/>:data?.friends?.length > 0 ? (
            data?.friends?.map((user) => (
              <USerItem
                key={user._id}
                user={user}
                handler={selectMemberHandler}
                handlerIsLoading={isLoadingAddGroupMember}
                isAdded={selectedMembers.includes(user._id)}
              />
            ))
          ) : (
            <Typography textAlign={"center"}>No Friends</Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignSelf={"center"}
          justifyContent={"space-evenly"}
        >
          <Button variant="text" color="error" onClick={closeHandler}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isLoadingAddGroupMember}
            onClick={addMemberSubmitHandler}
          >
            Add Member
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
