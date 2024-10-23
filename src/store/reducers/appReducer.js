import { types } from "../types";

const initialValues = {
    abogados: [],
    subfases: [],
    delegados: [],
    clasesDocEntrada: [],
    clasesDocSalida: [],
    tiposDanio: [],
    dependenciasMininter: [],
    procuradores: [],
    departamentos: []
};

export const appReducer = (state = initialValues, action) => {
    switch (action.type) {
        case types.abogados:
            return {
                ...state,
                abogados: [...action.payload],

            };
        case types.subfases:
            return {
                ...state,
                subfases: [...action.payload],

            };
        case types.delegados:
            return {
                ...state,
                delegados: [...action.payload],

            };
        case types.clasesDocEntrada:
            return {
                ...state,
                clasesDocEntrada: [...action.payload],

            };
        case types.clasesDocSalida:
            return {
                ...state,
                clasesDocSalida: [...action.payload],

            };
        case types.tiposDanio:
            return {
                ...state,
                tiposDanio: [...action.payload],

            };
        case types.dependenciasMininter:
            return {
                ...state,
                dependenciasMininter: [...action.payload],

            };
        case types.procuradores:
            return {
                ...state,
                procuradores: [...action.payload],

            };
        case types.departamentos:
            return {
                ...state,
                departamentos: [...action.payload],

            };
        default:
            return state;
    }
};