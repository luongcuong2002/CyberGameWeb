import { createContext, useState } from "react";
import ROLE from '../enums/role.enum';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        userName: "LUONGCUONG",
        hideUserName: false,
        fakeName: null,
        coins: 1000,
        dollars: 10000,
        refeshToken: null,
        role: ROLE.admin,
        enable: true,
    });

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;