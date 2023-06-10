import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import {useFacade} from "./accountButton.hooks";
import {MenuItem} from "@mui/material";

export const AccountButtonComponent: React.FC = () => {
    const [
        name,
        menuAnchor,
        handleOpenMenu,
        handleCloseMenu,
        menuItems
    ] = useFacade();

    return (
        <>
            <Box sx={{flexGrow: 0}}>
                <MenuItem onClick={(e) => handleOpenMenu(e)}>
                    <Box display="flex" alignItems="center">
                        <Box mr={1} sx={{display: {xs: 'none', sm: 'block'}}}>
                            <span>{name}</span>
                        </Box>
                        <Avatar sx={theme => ({
                            background: theme.palette.primary.contrastText
                        })} alt={name}/>
                    </Box>
                </MenuItem>
                <Menu
                    sx={{mt: '50px'}}
                    anchorEl={menuAnchor}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(menuAnchor)}
                    onClose={() => handleCloseMenu()}
                >
                    {
                        menuItems.map((menuItem, index) => {
                            return (
                                <Box
                                    sx={{
                                        width: {
                                            xs: '100vh',
                                            sm: '250px',
                                            md: '250px'
                                        }
                                    }}
                                    key={index}>
                                    {menuItem}
                                </Box>
                            )
                        })
                    }
                </Menu>
            </Box>
        </>
    )
}