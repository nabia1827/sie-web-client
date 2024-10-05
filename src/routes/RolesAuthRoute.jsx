import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { paths } from "../utils/paths";

const RolesAuthRoute = ({ children, perfilesAutorizados }) => {
  const perfilId = useSelector((state) => state.auth.user.userPerfilId);
  
  if (perfilesAutorizados.length === 0) return <>{children}</>;

  const canAccess = perfilesAutorizados.includes(Number(perfilId));

  if (canAccess) return <>{children}</>;

  return <Navigate to={paths.HOME} />;
};

export default RolesAuthRoute;
