import {MenuItemType} from "../enums/menuItemType";

export interface MenuItemModel {
    type: MenuItemType
    name: string,
    icon?: JSX.Element,
    action: Function
}