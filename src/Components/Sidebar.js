import React, {useContext, useState} from 'react';
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    Typography
} from "@mui/material";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import Avatar from './Assets/user.png'
import AuthContext from "../context/AuthContext";
import {Link} from "react-router-dom";

const Sidebar = () => {
    const {auth: {user}} = useContext(AuthContext)

    const [open, setOpen] = useState(false)

    const toggle = () => setOpen(prev => !prev)

    return (
        <>
            <div className="SidebarToggle">
                <button onClick={() => setOpen(true)}><FontAwesomeIcon icon={faBars} fontSize={22} /></button>
            </div>
            <Drawer open={open} onClose={toggle}>
                <Box sx={{width: 300, height: '100vh', padding: '40px 0'}}>
                    <List sx={{height: '100%', position: 'relative'}}>
                        <ListItem>
                            <Box className="Avatar" sx={{width: '100%', textAlign: 'center'}}>
                                <img src={Avatar} alt="" loading={'lazy'} width={80}/>
                                <Typography>{user.name}</Typography>
                            </Box>
                        </ListItem>
                        <Divider/>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <Typography><Link to={'/'} style={{textDecoration: 'none', color: '#000'}}>Dashboard</Link></Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <Typography><Link to={'/'} style={{textDecoration: 'none', color: '#000'}}>Page</Link></Typography>
                            </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding sx={{position: 'absolute', bottom: 0}}>
                            <ListItemButton>
                                <Typography><Link to={'/logout'} style={{textDecoration: 'none', color: '#000'}}>Log Out &nbsp; <FontAwesomeIcon icon={faRightFromBracket} /></Link></Typography>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar;