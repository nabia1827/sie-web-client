import { types } from "../types";

const initialValues = {
  user: {
    usuId: 0,
    usuUsername: "",
    usuNombre: "",
    usuApellidoPat: "",
    usuApellidoMat: "",
    perfilId: 0,
    usuEmail: "",
    usuImage: "",
  },
  isAuthenticated: false,
  refreshTokenExpire: false,
};

export const authReducer = (state = initialValues, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...action.payload,
        refreshTokenExpire: false,
        isAuthenticated: true,
      };
    case types.logout:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    case types.refreshTokenExpired:
      return {
        ...state,
        isAuthenticated: false,
        refreshTokenExpire: true,
      };
    case types.updateUserEmail:
      return {
        ...state,
        user: {
          ...state.user,
          usuEmail: action.payload,
        },
      };
    default:
      return state;
  }
};
