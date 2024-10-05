import { types } from "../types";

const initialValues = {
  user: {
    userId: 0,
    username: "",
    userNombre: "",
    userPerfilId: 0,
    userEmail: "",
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
    default:
      return state;
  }
};
