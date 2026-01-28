import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import USerItem from "../shared/USerItem";
import { sampleUsers } from "../../contants/sampleData";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducer/msc";
import { useLazySearchUserQuery, useSendFriendReqMutation } from "../../redux/api/api";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const Search = () => {
  const search = useInputValidation("");
  let isLoadingSendFriendRequest = false;
  const [users, setUsers] = useState([]);

  const {isSearch}=useSelector((state)=>state.msc);
  const dispatch=useDispatch();

  const [searchUser]=useLazySearchUserQuery();
  const [sendFriendReq]=useSendFriendReqMutation();

  const addFriendHandler = async(id) => {
    // console.log("Add Friend Handler ", id);
    try {
      const res=await sendFriendReq({ userId:id });
      if(res.data){
        toast.success("Friend Request Sent");
      }else{
        toast.error(res?.error?.data?.message||"something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const searchCloseHandler = () =>dispatch(setIsSearch(false));
  
  useEffect(() => {
    const timeOutId=setTimeout(()=>{
      // console.log("Search Value ",search.value);
      searchUser(search.value).then(({data})=>{
        console.log(data);
        setUsers(data?.users);
      }).catch((err)=>{
        console.log(err);
      });
    },1000);
  
    return () => {
      clearTimeout(timeOutId);
    }
  }, [search.value])
  

  return (
    <Dialog open={isSearch} onClose={searchCloseHandler}>
      <Stack p={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <List>
          
          
          {users.map((user) => (
            // console.log(user),
            <USerItem
              key={user._id}
              user={user}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
