import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import {authQuery} from "../../../auth/stores/auth";
import {AccountButtonComponent} from "../../../auth/components/accountButton/accountButton.component";
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import {useFacade} from "./header.hooks";
import MenuItem from "@mui/material/MenuItem";
import {useTranslation} from "react-i18next";
import {LanguageSelectComponent} from "../languageSelect/languageSelect.component";
import {MenuItemType} from "../../enums/menuItemType";

interface HeaderComponentProps {
    currentPage: MenuItemType
}

export const HeaderComponent: React.FC<HeaderComponentProps> = (props: HeaderComponentProps) => {
    const {currentPage} = props;
    const [
        menuAnchor,
        handleOpenMenu,
        handleCloseMenu,
        menuItems
    ] = useFacade();

    const {t} = useTranslation();

    return (
        <AppBar position="fixed" sx={{zIndex: 9999}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LibraryMusicIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Music Bands
                    </Typography>

                    <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={(e) => handleOpenMenu(e)}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            anchorEl={menuAnchor}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(menuAnchor)}
                            onClose={() => handleCloseMenu()}
                            sx={{
                                mt: '15px', display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {
                                menuItems.map((menuItem, index) => {
                                    return (
                                        <MenuItem
                                            sx={{
                                                width: {
                                                    xs: '100vh',
                                                    sm: '250px',
                                                    md: '250px'
                                                }
                                            }}
                                            key={index}
                                            onClick={() => menuItem.action()}>
                                            <Typography textAlign="center">{t(menuItem.name)}</Typography>
                                        </MenuItem>
                                    )
                                })
                            }
                            <LanguageSelectComponent/>
                        </Menu>
                    </Box>
                    <LibraryMusicIcon sx={{display: {xs: 'flex', md: 'none'}, mr: 1}}/>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: {xs: 'flex', md: 'none'},
                            flexGrow: 1,
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Music Bands
                    </Typography>
                    <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}, width: {xs: '100%', sm: 'auto'}}}>
                        {
                            menuItems.map((menuItem, index) => {
                                return (
                                    <MenuItem
                                        sx={theme => ({
                                            "&.Mui-selected": {
                                                backgroundColor: theme.palette.secondary.main,
                                                color:  theme.palette.primary.light
                                            }
                                        })}
                                        selected={currentPage == menuItem.type}
                                        key={index}
                                        onClick={() => menuItem.action()}
                                    >
                                        <Typography textAlign="center">{t(menuItem.name)}</Typography>
                                    </MenuItem>
                                )
                            })
                        }
                        <LanguageSelectComponent/>
                    </Box>

                    {
                        authQuery.isAuthorized() &&
                        <>
                            <Box sx={{flexGrow: 0}}>
                                <AccountButtonComponent/>
                            </Box>
                        </>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    )
}