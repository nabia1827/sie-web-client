import secureLocalStorage from "react-secure-storage";
import api from "../../services/api";
import store from "../store";
import {
    getAccessToken,
    getRefreshToken,
    removeAccessToken,
    removeRefreshToken,
    setAccessToken,
    setRefreshToken,
} from "../../utils/cookie";

import { login, logout, refreshTokenExpired } from "./authActionSync";

export const startLogin = (usuUsername, usuPassword) => async (dispatch) => {
    //dispatch(setLoading(true));
    try {
        console.log("AABN: ", usuUsername, " - ", usuPassword)
        const response = await api.Auth.loginApp({
            usuUsername,
            usuPassword,
        });

        console.log(response)
        if (response.isSuccess) {
            const { data } = response;
            console.log("Usuario Logeado: ", data);
            const { token, refreshToken } = data;
            dispatch(login(data));
            setAccessToken(token);
            setRefreshToken(refreshToken);
            return response;
        } else {
            return Promise.reject(response.message);
        }
    } catch (error) {
        const errorMessage = error.message || 'Error desconocido';
        return Promise.reject(errorMessage);
    } finally {
        //dispatch(setLoading(false));
    }
};

export const startLogout = () => async (dispatch) => {
    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();
    const usuarioId = store.getState().auth.user.usuId;
    try {
        await api.Auth.logOutApp({
            usuarioId: usuarioId,
            tokenExpirado: accessToken,
            refreshToken: refreshToken,
        });
    } catch (error) {
    } finally {
        dispatch(logout());
        removeAccessToken();
        removeRefreshToken();
        secureLocalStorage.clear();
    }
};

export const removeExpiredRefreshToken = () => async (dispatch) => {
    removeAccessToken();
    removeRefreshToken();
    secureLocalStorage.clear();
    dispatch(refreshTokenExpired());
};



export const renewToken = () => async (dispatch) => {
    try {
        const response = await api.Auth.renewToken({
            tokenExpirado: getAccessToken(),
            refreshToken: getRefreshToken(),
        });

        console.log("Response to RenewToken: ",response)
        if (response.isSuccess) {
            const { token, refreshToken } = response;
            setAccessToken(token);
            setRefreshToken(refreshToken);
            return response;
        } else {
            return Promise.reject(response.message);
        }
    } catch (error) {
        const errorMessage = error.message || 'Error in Renew Token';
        return Promise.reject(errorMessage);
    } finally {
        //dispatch(setLoading(false));
    }
}