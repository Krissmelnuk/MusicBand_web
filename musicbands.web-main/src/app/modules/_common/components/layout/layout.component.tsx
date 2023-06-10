import React from "react";
import {Box} from "@mui/material";
import {FooterComponent} from "../footer/footer.component";
import {HeaderComponent} from "../header/header.component";
import {MenuItemType} from "../../enums/menuItemType";

interface LayoutComponentProps {
    title: string;
    menuItem: MenuItemType;
    children: React.ReactNode;
}

export const LayoutComponent: React.FC<LayoutComponentProps> = (props: LayoutComponentProps) => {
    const {
        title,
        menuItem,
        children
    } = props;

    return (
        <Box position="relative">
            <HeaderComponent currentPage={menuItem}/>
            <div key={title}>
                <title>{title}</title>
                <Box
                    minHeight="100vh"
                    sx={theme => ({
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
            </div>
            <FooterComponent/>
        </Box>
    );
}