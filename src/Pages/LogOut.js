import React, {useContext, useEffect} from 'react';
import AuthContext from "../context/AuthContext";
import {useNavigate} from "react-router-dom";

const LogOut = () => {
    const navigate = useNavigate()
    const {setAuth} = useContext(AuthContext)

    useEffect(() => {
        setAuth({})
        localStorage.clear()
        navigate('/login')
    }, [])

    return (
        <div className='Logout'>

        </div>
    );
};

export default LogOut;