import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";
import { paths } from "../../utils/paths";

function NotFoundPage() {
  return (
    <Result
      status="404"
      title="404 - Not Found"
      subTitle="La página que buscas no existe."
      extra={
        <Link to={paths.CONSULTA_LEGAJOS}>
          <Button type="primary">Volver al inicio</Button>
        </Link>
      }
    />
  );
}

export default NotFoundPage;