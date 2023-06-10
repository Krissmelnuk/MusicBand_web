import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import React from "react";
import {CSSObject, styled, Theme} from "@mui/material";
import {useFacade} from "./sideBarMenu.hooks";
import MuiDrawer from "@mui/material/Drawer";
import {MenuItemModel} from "../../models/menuItem.model";
import {useTranslation} from "react-i18next";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

interface SideBarMenuComponentProps {
    menuItems: MenuItemModel[];
}

export const SideBarMenuComponent: React.FC<SideBarMenuComponentProps> = (props: SideBarMenuComponentProps) => {
    const [
        {
            isOpen
        },
        handleMenuToggle
    ] = useFacade();

    const {t} = useTranslation();

    return (
        <Drawer variant="permanent" open={isOpen}>
            <DrawerHeader>

            </DrawerHeader>
            <Divider/>
            <List>
                {props.menuItems.map((menuItem, index) => (
                    <ListItem key={index} disablePadding sx={{display: 'block'}}>
                        <ListItemButton
                            onClick={() => menuItem.action()}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                {menuItem.icon}
                            </ListItemIcon>
                            <ListItemText primary={t(menuItem.name)} sx={{opacity: open ? 1 : 0}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding sx={{display: 'block'}}>
                    <ListItemButton
                        onClick={() => handleMenuToggle()}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            {isOpen ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    )
}