import { types } from "../types";

const initialValues = {
    abogados: [],
    subfases: [],
    delegados: []
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
        default:
            return state;
    }
};