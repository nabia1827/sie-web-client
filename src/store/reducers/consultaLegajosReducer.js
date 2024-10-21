import { types } from "../types";

const initialValues = {
  currentLegajoCod:""
};

export const consultaLegajosReducer = (state = initialValues, action) => {
  switch (action.type) {
    case types.currentLegajoCod:
      return {
        ...state,
        currentLegajoCod: action.payload,
      };
    
    default:
      return state;
  }
};
