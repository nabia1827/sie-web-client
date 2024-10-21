import { types } from "../../types";

export const setAbogados = data => ({
    type: types.abogados,
    payload: data,
});

export const setSubfases = data => ({
    type: types.subfases,
    payload: data,
});

export const setDelegados = data => ({
    type: types.delegados,
    payload: data,
});