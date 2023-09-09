import { createContext, useState } from "react";
import ROLE from "../enums/role.enum";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    userId: "CUONG",
    name: "Nguyễn Lương Cường",
    role: ROLE.admin,
    avatar: null,
    hasVerified: false,
    money: 30000,
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
