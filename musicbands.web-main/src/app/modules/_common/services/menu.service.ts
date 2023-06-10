import {MenuItemModel} from "../models/menuItem.model";
import {navigationService} from "./navigation.service";
import {authQuery} from "../../auth/stores/auth";
import {MenuItemType} from "../enums/menuItemType";


export class MenuService {
    public get(navigate): MenuItemModel[] {
        const menuItems: MenuItemModel[] = [
            {
                type: MenuItemType.Home,
                name: 'menuItems.home',
                action: () => navigationService.toHome(navigate)
            }
        ];

        if (authQuery.isAuthorized()) {
            menuItems.push({
                type: MenuItemType.Dashboard,
                name: 'menuItems.dashboard',
                action: () => navigationService.toDashboard(navigate)
            })
        }

       return menuItems;
    }
}

export const menuService = new MenuService();