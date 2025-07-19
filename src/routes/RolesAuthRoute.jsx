import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { paths } from "../utils/paths";

const RolesAuthRoute = ({ children, perfilesAutorizados }) => {
  const perfilId = useSelector((state) => state.auth.user.perfilId);
  
  if (perfilesAutorizados.length === 0) return <>{children}</>;

  const canAccess = perfilesAutorizados.includes(Number(perfilId));
  console.log("canAccess: ", canAccess)
  console.log("perfilesAutorizados: ", perfilesAutorizados)
  console.log("perfilId: ", perfilId)

  if (canAccess) return <>{children}</>;

  return <Navigate to={paths.TODOS_LEGAJOS} />;
};

export default RolesAuthRoute;
