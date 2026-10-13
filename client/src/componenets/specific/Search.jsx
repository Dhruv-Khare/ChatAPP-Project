import {
  Dialog,
  DialogTitle,
  InputAdornment,
  List,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useInputValidation } from "6pp";
import { Search as SearchIcon } from "@mui/icons-material";
import USerItem from "../shared/USerItem";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearch } from "../../redux/reducer/msc";
import { useLazySearchUserQuery, useSendFriendReqMutation } from "../../redux/api/api";
import { useMutationHokk } from "../../hooks/hook";

const Search = () => {
  const search = useInputValidation("");
  const [users, setUsers] = useState([]);

  const { isSearch } = useSelector((state) => state.msc);
  const dispatch = useDispatch();

  const [searchUser] = useLazySearchUserQuery();
  const [sendFriendReq, isLoadingSendFriendRequest] = useMutationHokk(useSendFriendReqMutation);

  const addFriendHandler = async (id) => {
    sendFriendReq("Sending Friend Request...", { userId: id });
  };

  const searchCloseHandler = () => dispatch(setIsSearch(false));

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      searchUser(search.value)
        .then(({ data }) => {
          setUsers(data?.users || []);
        })
        .catch((err) => {
          console.error(err);
          setUsers([]);
        });
    }, 1000);

    return () => {
      clearTimeout(timeOutId);
    };
  }, [search.value, searchUser]);

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
          {(users || []).length > 0 ? (
            users.map((user) => (
              <USerItem
                key={user._id}
                user={user}
                handler={addFriendHandler}
                handlerIsLoading={isLoadingSendFriendRequest}
              />
            ))
          ) : (
            search.value.trim() && (
              <Typography textAlign={"center"} color="text.secondary" p={"1rem"}>
                No users found
              </Typography>
            )
          )}
        </List>
      </Stack>
    </Dialog>
  );
};

export default Search;
