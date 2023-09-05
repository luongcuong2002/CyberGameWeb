import { useState, useEffect, useContext } from "react";
import "./App.css";
import AuthService from "./services/auth.service";
import AuthContext from "./context/AuthProvider";
import MainRouting from "./routing/MainRouting";

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

  return <>{render && <MainRouting />}</>;
}

export default App;
