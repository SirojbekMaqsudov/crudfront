import React, {useState} from 'react';
import {$host} from "../utils/api";
import {toast, ToastContainer} from "react-toastify";
import {ToastOption} from "../utils/ToastOptions";
import useAuth from "../utils/useAuth";
import {useNavigate} from 'react-router-dom'
import {Avatar, Box, Button, Container, FormControlLabel, Grid, Link, TextField, Typography} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLock} from "@fortawesome/free-solid-svg-icons";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const {setAuth} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            $host.post(`${process.env.REACT_APP_API_URL}/users/login`, {email, password}).then(({data}) => {
                const {error} = data
                if (error) {
                    setLoading(false)
                    return toast.error(error, ToastOption)
                }

                const token = data?.token
                const user = data?.user

                setAuth({token, user})
                localStorage.setItem('token', token)
                setLoading(false)
                return navigate('/')
            })
        }catch (e) {
            if (!e.response) {
                return toast.error('No Server Response!')
            }

            return toast.error('Login failed!', ToastOption)
        }
    }

    return (
        <div className='Login'>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 15,
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background:"#fff",
                        padding: '10px 20px',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <FontAwesomeIcon icon={faLock} />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
            <ToastContainer/>
        </div>
    );
};

export default Login;