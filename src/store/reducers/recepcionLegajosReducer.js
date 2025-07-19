import { types } from "../types";

const initialValues = {
  recepcionEnprogreso: false,
  notiRecepcionFinalizada: null,
};

export const recepcionLegajosReducer = (state = initialValues, action) => {
  switch (action.type) {
    case types.recepcionEnProgreso:
      return {
        ...state,
        recepcionEnprogreso: action.payload.inProgress,
        notiRecepcionFinalizada: action.payload.notificacion,
      };
    
    default:
      return state;
  }
};
