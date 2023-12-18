import React, { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignIn";
import PATH from "./enums/path.enum";
import ModeratorPages from "./pages/ModeratorPages";
import AdminPages from "./pages/AdminPages";
import UserPages from "./pages/UserPages";
import userService from "./services/user.service";
import "./App.css";
import { setUser } from "./slices/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { selectModalAppearance } from "./slices/modal_appearance.slice";
import { setSignOutDialogShowing } from "./slices/modal_appearance.slice";
import AlertDialog from "./components/AlertDialog";

function App() {
  const dispatch = useDispatch();

  const modalAppearance = useSelector(selectModalAppearance);

  const [render, setRender] = useState(false);

  useEffect(() => {
    userService
      .getCurrentUser()
      .then(async (data) => {
        if (data) {
          dispatch(setUser(data));
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setRender(true);
      });
  }, []);

  return (
    <>
      {render && (
        <>
          <AlertDialog
            title={"Thông báo"}
            message={"Phiên đăng nhập hết hạn. Đăng nhập lại để tiếp tục!"}
            isOpen={modalAppearance.isSignOutDialogShowing}
            onClick={() => {
              window.location.href = PATH.signIn;
              dispatch(setSignOutDialogShowing(false))
            }}
            closeWhenClickOutside={false}
          />

          <Routes>
            <Route path={`${PATH.root}*`} element={<UserPages />} />
            <Route path={`${PATH.moderator}/*`} element={<ModeratorPages />} />
            <Route path={`${PATH.admin}/*`} element={<AdminPages />} />
            <Route path={PATH.signIn} element={<SignInPage />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
