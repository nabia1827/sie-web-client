import React from "react";
import { items } from "./menuItems";

export const getMenuItemsForUser = (perfilId) => {
    // Filtra los items principales
    return items
        .filter(item => item.profiles.includes(perfilId))
        .map(item => ({
            ...item,
            // Filtra los children de cada item según perfil
            children: item.children?.filter(child => child.profiles.includes(perfilId)) || undefined
        }));
};