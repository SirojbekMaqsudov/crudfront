import {createContext, useEffect, useState} from "react";
import jwtDecode from "jwt-decode";
import {$host} from "../utils/api";
import {Navigate} from "react-router-dom";

const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    const [persist, setPersist] = useState(localStorage.getItem('token') || false)
    const [auth, setAuth] = useState(persist ? {user: jwtDecode(persist), token: persist} : {})

    useEffect(() => {
        $host.get(`${process.env.REACT_APP_API_URL}/users/refresh`).then(({data}) => {
            const {token} = data
            if (!token) {
                setAuth({})
                return <Navigate to={'/login'}/>
            }
            setPersist(token)
            if (persist) {
                return setAuth({user: jwtDecode(token), token})
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext