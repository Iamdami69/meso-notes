import { useContext } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar/Sidebar";
import { UserContext } from "../Context/UserContext/UserContext";
import { useAuth } from "../Hooks/useAuth/useAuth";
import { FourOFour } from "../Pages/404/FourOFour";
import { ForgotPassword } from "../Pages/Authentication/ForgotPassword";
import { Signin } from "../Pages/Authentication/Signin";
import { Signup } from "../Pages/Authentication/Signup";
import { CreateNote } from "../Pages/CreateNote/CreateNote";
import { EditNote } from "../Pages/EditNote/EditNote";
import Homepage from "../Pages/Homepage/Homepage";
import { ReadNote } from "../Pages/ReadNote/ReadNote";
export default function AppRoutes() {
  const { user } = useContext(UserContext);
  const { checkAuth } = useAuth(user);
  function ProtectRoute() {
    return checkAuth ? <Outlet /> : <Signup />;
  }
  function UnProtectRoute() {
    return !checkAuth ? <Outlet /> : <Homepage />;
  }
  return (
    <BrowserRouter>
      <Sidebar />
      <Routes>
        <Route path="/*" element={<FourOFour />} />
        <Route element={<UnProtectRoute />}>
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route element={<ProtectRoute />}>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/create-note" element={<CreateNote />} />
          <Route path="/read-note/:noteId" element={<ReadNote />} />
          <Route path="/edit-note/:noteId" element={<EditNote />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
