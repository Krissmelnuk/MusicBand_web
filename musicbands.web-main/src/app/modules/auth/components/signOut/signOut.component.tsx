import React from "react";
import {useFacade} from "./signOut.hooks";
import MenuItem from "@mui/material/MenuItem";
import {Box} from "@mui/material";
import {useTranslation} from "react-i18next";

export const SignOutComponent: React.FC = () => {
    const [handleSignOut] = useFacade();
    const {t} = useTranslation();

    return (
        <MenuItem onClick={() => handleSignOut()}>
            <Box display="flex">
                {t('SignOutComponent.signOut')}
            </Box>
        </MenuItem>
    )
}