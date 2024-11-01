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

export const setDelitos = data => ({
    type: types.delitos,
    payload: data,
});

export const setTiposAudiencia = data => ({
    type: types.tiposAudiencia,
    payload: data,
});

export const setTiposRemitente = data => ({
    type: types.tiposRemitente,
    payload: data,
});

export const setTiposPena = data => ({
    type: types.tiposPena,
    payload: data,
});


export const setTiposSentencia = data => ({
    type: types.tiposSentencia,
    payload: data,
});


export const setDistritosJudicial = data => ({
    type: types.distritosJudicial,
    payload: data,
});



