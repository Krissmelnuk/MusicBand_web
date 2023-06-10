import React from "react";
import {Box} from "@mui/material";
import {HeaderComponent} from "../header/header.component";
import {MenuItemType} from "../../enums/menuItemType";
import {SideBarMenuComponent} from "../sideBarMenu/sideBarMenu.component";
import {MenuItemModel} from "../../models/menuItem.model";

interface LayoutWithMenuComponentProps {
    title: string;
    menuItem: MenuItemType;
    menuItems: MenuItemModel[];
    children: React.ReactNode;
}

export const LayoutWithMenuComponent: React.FC<LayoutWithMenuComponentProps> = (props: LayoutWithMenuComponentProps) => {
    const {
        title,
        menuItem,
        menuItems,
        children
    } = props;

    return (
        <Box display="flex">
            <title>{title}</title>
            <HeaderComponent currentPage={menuItem}/>
            <SideBarMenuComponent menuItems={menuItems}/>
            <Box
                minHeight="100vh"
                component="main"
                sx={theme => ({
                    flexGrow: 1,
                    p: {
                        xs: 0,
                        sm: 2
                    },
                    pt: {
                        xs: 9,
                        sm: 10
                    },
                    pb: {
                        xs: 2,
                        sm: 5
                    },
                    background: theme.palette.background.default
                })}
            >
                {children}
            </Box>
        </Box>
    );
}