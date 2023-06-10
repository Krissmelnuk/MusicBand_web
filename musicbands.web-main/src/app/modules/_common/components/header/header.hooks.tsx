import * as React from "react";
import {useNavigate} from "react-router";
import {MenuItemModel} from "../../models/menuItem.model";
import {menuService} from "../../services/menu.service";

export function useFacade(): [HTMLElement, Function, Function, MenuItemModel[]] {
    const navigate = useNavigate();
    const [menuAnchor, setMenuAnchor] = React.useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setMenuAnchor(null);
    };

    return [
        menuAnchor,
        handleOpenMenu,
        handleCloseMenu,
        menuService.get(navigate)
    ]
}

