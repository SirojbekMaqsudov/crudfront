import {Navigate, Outlet} from "react-router-dom";
import useAuth from "../utils/useAuth";

const RequireAuth = ({allowRole}) => {
    const {auth} = useAuth()

    return (
        auth?.user?.role === allowRole ? <Outlet /> : auth?.user ? <div className='Forbidden'><a href='/logout'>Forbidden</a></h1>: <Navigate to={'/login'} />
    )
}

export default RequireAuth
