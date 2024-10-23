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

export const setClasesDocEntrada = data => ({
    type: types.clasesDocEntrada,
    payload: data,
});

export const setClasesDocSalida = data => ({
    type: types.clasesDocSalida,
    payload: data,
});

export const setTiposDanio = data => ({
    type: types.tiposDanio,
    payload: data,
});

export const setDependenciasMininter = data => ({
    type: types.dependenciasMininter,
    payload: data,
});

export const setProcuradores = data => ({
    type: types.procuradores,
    payload: data,
});

export const setDepartamentos = data => ({
    type: types.departamentos,
    payload: data,
});