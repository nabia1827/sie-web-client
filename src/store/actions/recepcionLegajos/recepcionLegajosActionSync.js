import { types } from "../../types";

export const setRecepcionEnProgreso = data => ({
    type: types.recepcionEnProgreso,
    payload: data,
});
