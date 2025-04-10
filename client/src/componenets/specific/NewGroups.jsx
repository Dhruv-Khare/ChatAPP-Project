import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../contants/SampleData";
import USerItem from "../shared/USerItem";

const NewGroups = () => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const groupName = useInputValidation("");

  const selectMemnerHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  console.log(selectedMembers);
  const submitHandler = () => {
    console.log("submit");
  };

  return (
    <Dialog open>
      <Stack p={{ xs: "1rem", sm: "3rem" }} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New Group
        </DialogTitle>
        <TextField
          label="Group Name "
          value={groupName.value}
          onChange={groupName.changeHandler}
        />
        <Typography variant={"body1"}>Select Members</Typography>
        <Stack>
          {members.map((user) => (
            <USerItem
              key={user._id}
              user={user}
              handler={selectMemnerHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>
        <Stack spacing={"0.5rem "}>
          <Button variant={"outlined"}>Cancel</Button>
          <Button variant={"contained"} onClick={submitHandler}>
            Create Group{" "}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
