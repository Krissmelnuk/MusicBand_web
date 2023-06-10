import * as React from "react";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import {SignOutComponent} from "../signOut/signOut.component";
import {authQuery} from "../../stores/auth";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router";
import {navigationService} from "../../../_common/services/navigation.service";

export function useFacade(): [string, HTMLElement, Function, Function, JSX.Element[]] {
    const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const name = authQuery.getName();
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchor(null);
    };

    const menuItems = [
        <MenuItem onClick={() => navigationService.toAccount(navigate)}>
            <Typography textAlign="center">{t('AccountButtonComponent.account')}</Typography>
        </MenuItem>,
        <SignOutComponent/>
    ]

    return [
        name,
        menuAnchor,
        handleOpenMenu,
        handleCloseMenu,
        menuItems
    ]
}