/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();


export const useAuthContext = () => {
    return useContext(AuthContext)
}
export const AuthContextProvider = ({children}) => {
const [authUser, setAuthUser] = useState(localStorage.getItem("chat-app-user") || null)
return <AuthContext.Provider value={{authUser, setAuthUser}}>
{children}
</AuthContext.Provider>
}