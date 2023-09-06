import React, { useState, useEffect, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./pages/SignIn";
import PATH from "./enums/path.enum";
import ModeratorPages from "./pages/ModeratorPages";
import AdminPages from "./pages/AdminPages";
import UserPages from "./pages/UserPages";
import AuthService from "./services/auth.service";
import AuthContext from "./context/AuthProvider";
import "./App.css";

function App() {
  const { setAuth } = useContext(AuthContext);
  const [render, setRender] = useState(false);

  useEffect(() => {
    AuthService.getCurrentUser()
      .then(async (data) => {
        if (data) {
          await setAuth({
            user: data.userName,
            roles: [data.role],
          });
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
        <Routes>
          <Route path={`${PATH.root}*`} element={<UserPages />} />
          <Route path={`${PATH.moderator}/*`} element={<ModeratorPages />} />
          <Route path={`${PATH.admin}/*`} element={<AdminPages />} />
          <Route path={PATH.signIn} element={<SignInPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
