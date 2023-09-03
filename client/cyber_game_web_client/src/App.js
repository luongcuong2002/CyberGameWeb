import { useState, useEffect, useContext } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import AuthService from './services/auth.service';
import AuthContext from './context/AuthProvider';
import SignIn from './pages/SignIn';

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
          })
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
      {
        render && (
          <Routes>
            <Route path='/' element={<SignIn />} />
            <Route path='/trang-chu' element={<SignIn />} />
          </Routes>
        )
      }
    </>
  );
}

export default App;
