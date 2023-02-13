import React, {useEffect, useState} from 'react';
import {
    Box,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem, Modal,
    Select,
    TextField,
    Typography
} from "@mui/material";
import {useMutation, useQuery} from "react-query";
import {$host} from "../../utils/api";
import {ToastOption} from "../../utils/ToastOptions";
import {toast} from "react-toastify";

const Roles = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    WAITER: 'WAITER',
    CASHIER: 'CASHIER'
}
const IUser = {
    name: '',
    email: '',
    password: '',
    phone_number: '',
    role: 'USER'
}

const style = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    background: '#fff',
    boxShadow: 24,
    p: 4,
};

const EditUser = ({open, handleClose, selection, setSelection}) => {
    const id = selection[0]
    const [user, setUser] = useState({...IUser})
    const {data, refetch, isLoading: getUserLoading} = useQuery('user', () => $host.get(`${process.env.REACT_APP_API_URL}/users/${id}`), {
        onSuccess: ({data}) =>  {
            const {error} = data
            if (error) {
                return toast.error(error, ToastOption)
            }

            setUser({...data})
        }
    })
    const mutation = useMutation(() => $host.put(`${process.env.REACT_APP_API_URL}/users/update/${id}`, user), {
        onSuccess: ({data}) => {
            const {error} = data
            if (error) {
                return toast.error(error, ToastOption)
            }

            setSelection([])
            return handleClose(false)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        mutation.mutate()
    }

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    return (
        <div className='EditUser'>
            <Modal open={open} onClose={() => {
                setUser({...IUser})
                handleClose(false)
            }}>
                <Box sx={style}>
                    <Typography>Edit User</Typography>
                    {
                        getUserLoading ? <CircularProgress /> : (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="name"
                                    label="Name"
                                    type="text"
                                    id="name"
                                    value={user.name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="email"
                                    label="Email"
                                    type="text"
                                    id="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="text"
                                    id="password"
                                    value={user.password}
                                    onChange={handleChange}
                                />
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    name="phone_number"
                                    label="Phone number"
                                    type="text"
                                    id="phone_number"
                                    value={user.phone_number}
                                    onChange={handleChange}
                                />

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                                    <Select labelId="demo-simple-select-label" id="demo-simple-select" name={'role'} value={user.role} label="Role" onChange={handleChange}>
                                        <MenuItem value={Roles.USER}>USER</MenuItem>
                                        <MenuItem value={Roles.ADMIN}>ADMIN</MenuItem>
                                        <MenuItem value={Roles.WAITER}>WAITER</MenuItem>
                                        <MenuItem value={Roles.CASHIER}>CASHIER</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button fullWidth variant={'contained'} sx={{mt: 2}} type={'submit'}>{mutation.isLoading ? <CircularProgress size={25} color={'inherit'} /> : 'Submit'}</Button>
                            </form>
                        )
                    }
                </Box>
            </Modal>
        </div>
    );
};

export default EditUser;