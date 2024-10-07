import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAccessToken } from "../utils/cookie";
import { paths } from "../utils/paths";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token) => {
  const { exp } = jwtDecode(token);
  const currentTime = Date.now() / 1000; // En segundos
  return exp < currentTime;
};


function PrivateRoute({ children, isAuthenticated, pathToRedirectOnFail = paths.LOGIN }) {
  const tok = getAccessToken();
  const location = useLocation();


  // Si no está autenticado, redirige al login o a la ruta de fallback
  if (tok && !isTokenExpired(tok)) {
    // Si está autenticado, renderiza los children (el contenido protegido)
    return children;
    
  } else {
    return (
      <Navigate to={pathToRedirectOnFail} state={{ from: location }} replace />
    );
  }


}

export default PrivateRoute;