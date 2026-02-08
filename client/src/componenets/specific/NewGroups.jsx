import { useInputValidation } from "6pp";
import {
  Button,
  Dialog,
  DialogTitle,
  Skeleton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../contants/sampleData";
import USerItem from "../shared/USerItem";
import { useAvailableFriendsQuery, useNewGroupMutation } from "../../redux/api/api";
import { useErrors, useMutationHokk } from "../../hooks/hook";
import { useDispatch, useSelector } from "react-redux";
import { setIsNewGroup } from "../../redux/reducer/msc";
import toast from "react-hot-toast";

const NewGroups = () => {

  const dispatch=useDispatch();

  const {isNewGroup}=useSelector(state=>state.msc);

  const {isError,error,isLoading,data}=useAvailableFriendsQuery();
  const [newGroup,isLoadingNewgroup]= useMutationHokk(useNewGroupMutation);

  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const groupName = useInputValidation("");

  console.log("availabe friends:",data)

  const errors=[{
    isError,
    error,
  }]
  useErrors(errors);

  const selectMemnerHandler = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id)
        ? prev.filter((currElement) => currElement !== id)
        : [...prev, id]
    );
  };
  // console.log(selectedMembers);
  const submitHandler = () => {
    if(!groupName.value)return  toast.error("Please Enter Group Name");

    if(selectedMembers.length<2)return  toast.error("Please Select atlest 3 members");
    console.log("submit",selectedMembers,groupName.value);



    newGroup("Creating New Group...",{name:groupName.value,members:selectedMembers});


    closeHandler();
  };

  const closeHandler=()=>{
    dispatch(setIsNewGroup(false));
  }
  return (
    <Dialog open={isNewGroup} onClose={closeHandler}>
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
          {isLoading?<Skeleton/>: data?.friends?.map((user) => (
            <USerItem
              key={user._id}
              user={user}
              handler={selectMemnerHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>
        <Stack spacing={"0.5rem "}>
          <Button variant={"outlined"} onClick={closeHandler}>Cancel</Button>
          <Button variant={"contained"} onClick={submitHandler} disabled={isLoadingNewgroup}>
            Create Group{" "}
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroups;
