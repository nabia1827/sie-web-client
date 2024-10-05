import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { paths } from "../utils/paths";

function PrivateRoute({ children, isAuthenticated, pathToRedirectOnFail = paths.LOGIN }) {
  const location = useLocation();

  // Si no está autenticado, redirige al login o a la ruta de fallback
  if (!isAuthenticated) {
    return (
      <Navigate to={pathToRedirectOnFail} state={{ from: location }} replace />
    );
  }

  // Si está autenticado, renderiza los children (el contenido protegido)
  return children;
}

export default PrivateRoute;