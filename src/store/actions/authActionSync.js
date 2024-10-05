import { types } from "../types";

export const login = (user) => ({
    type: types.login,
    payload: { user, isAuthenticated: true, refreshTokenExpire: false },
});

export const logout = () => ({
    type: types.logout,
    payload: { user: {}, isAuthenticated: false },
});

export const refreshTokenExpired = () => ({
    type: types.refreshTokenExpired,
    payload: { refreshTokenExpire: true, isAuthenticated: false },
});


