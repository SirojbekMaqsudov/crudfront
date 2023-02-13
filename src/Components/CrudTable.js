import React, {useEffect, useState} from 'react';
import {DataGrid} from "@mui/x-data-grid";
import {Box, Button, CircularProgress, Container} from "@mui/material";
import {useQuery} from "react-query";
import {$host} from "../utils/api";
import {ToastOption} from "../utils/ToastOptions";
import {toast, ToastContainer} from "react-toastify";
import CreateUser from "./Modals/CreateUser";
import EditUser from "./Modals/EditUser";
import Sidebar from "./Sidebar";

const columns = [
    { field: 'id', headerName: '#', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'phone_number', headerName: 'Phone number', width: 150 },
    { field: 'role', headerName: 'Role', width: 100 }
];

const CrudTable = () => {
    const {data, isLoading, refetch} = useQuery('users', () => $host.get(`${process.env.REACT_APP_API_URL}/users`), {onSuccess: (data) => {
            const {error} = data
            if (error) {
                return toast.error(error, ToastOption)
            }
    }})

    const [createVisible, setCreateVisible] = useState(false)
    const [editVisible, setEditVisible] = useState(false)
    const [selection, setSelection] = useState([])

    useEffect(() => {
        refetch().then(() => {})
    }, [selection])

    const handleDelete = async () => {
        if (selection.length > 1) {
            await Promise.all([
                selection.map((id) => {return $host.delete(`${process.env.REACT_APP_API_URL}/users/delete/${id}`)})
            ])

            return setSelection([])
        }

        if (selection.length !== 0) {
            const {data} = await $host.delete(`${process.env.REACT_APP_API_URL}/users/delete/${selection[0]}`)
            const {error} = data
            if (error) {
                return toast.error(error, ToastOption)
            }

            return setSelection([])
        }
    }

    return (
        <div className='CrudTable' >

            <Container>
                <div style={{ height: 600, width: '100%', marginTop: 130}}>
                    <Box className="crudHeader" sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                        {selection.length < 1 ? null : (
                            <>
                                <Button sx={{m: 1}} size={'small'} color={'error'} variant={'contained'} onClick={() => window.confirm('Really ?') && handleDelete()}>{selection.length > 1 ? 'Delete Users' : 'Delete User'}</Button>
                                {
                                    selection.length > 1 ? null : <Button variant='contained' size={'small'} onClick={() => setEditVisible(true)}>Edit User</Button>
                                }
                            </>
                        )}
                        <Button sx={{m: 1}} variant='contained' size={'small'} onClick={() => setCreateVisible(true)}>Add User</Button>
                    </Box>
                    {isLoading ? <CircularProgress /> : (
                        <DataGrid
                            rows={data.data}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            checkboxSelection
                            onSelectionModelChange={(newSelection) => {
                                setSelection(newSelection)
                            }}
                            selectionModel={selection}
                        />
                    )}
                </div>
            </Container>
            <ToastContainer />
            <Sidebar />
            {editVisible ? <EditUser open={editVisible} handleClose={setEditVisible} selection={selection} setSelection={setSelection}/> : null}
            <CreateUser open={createVisible} handleClose={setCreateVisible} selection={selection} setSelection={setSelection} />
        </div>
    );
};

export default CrudTable;