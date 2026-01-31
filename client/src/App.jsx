import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Chat from "./pages/Chat";
// import Groups from "./pages/Groups";
import ProtectedRoute from "./componenets/auth/ProtectRout";
import { lazy, Suspense, useEffect } from "react";
import { LayoutLoader } from "./componenets/layout/Loaders";

import axios from "axios";
import { server } from "./contants/config.js";
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducer/auth.js";
import { Toaster } from "react-hot-toast";
import { SocketProvider } from "./socket.jsx";

const Home = lazy(() => import("./pages/Home"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const Login = lazy(() => import("./pages/Login"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatsManagement = lazy(() => import("./pages/admin/ChatsManagement"));
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"));

let user = true;
const App = () => {
  const { user,loader } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(server);
    axios
      .get(`${server}/api/v1/user/me`,{withCredentials:true})
      .then(({data}) => dispatch(userExists(data.user)))
      .catch((err)=>dispatch(userNotExists()));
  }, [dispatch]);
  return loader?<LayoutLoader />:(
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={<SocketProvider><ProtectedRoute user={user} /></SocketProvider>}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatID" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users-management" element={<UserManagement />} />
          <Route path="/admin/chats-management" element={<ChatsManagement />} />
          <Route
            path="/admin/messages-management"
            element={<MessageManagement />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
};

export default App;
