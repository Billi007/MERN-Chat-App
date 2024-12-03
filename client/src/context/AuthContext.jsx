/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import Cookies from 'js-cookie'


export const AuthContext = createContext();
export const useAuthContext = () => {
    return useContext(AuthContext)
}
export const AuthContextProvider = ({children}) => {
    const initialUserState =
    Cookies.get("jwt") || localStorage.getItem("chat-app-user");
    
    const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined);
return <AuthContext.Provider value={{authUser, setAuthUser}}>
{children}
</AuthContext.Provider>
}