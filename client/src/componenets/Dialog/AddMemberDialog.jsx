import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../contants/sampleData";

import USerItem from "../shared/USerItem";

const AddMemberDialog = ({ addMember, isLoadingAddMember, chatID }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  // const groupName = useInputValidation("");
  //this is not woring

  const selectMemberHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
  };
  const closeHandler = () => {
    setSelectedMembers([]);
    setMembers([]);
  };
  return (
    <Dialog open onClose={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"1rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((user) => (
              <USerItem
                key={user._id}
                user={user}
                handler={selectMemberHandler}
                handlerIsLoading={isLoadingAddMember}
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
            disabled={isLoadingAddMember}
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
