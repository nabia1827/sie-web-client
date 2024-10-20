import api from "../../services/api";
import { message } from "antd";

export const UpdateEstadoLegajo = async (params) => {

  try {

    const response = await api.ListaLegajos.UpdateEstadoLegajo(params);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const onDownloadLegajoPDF = async (legajoId) => {

  try {

    const response = await api.GenerarPDF.DownloadLegajoPDF(legajoId);

    const contentDisposition = response.headers["content-disposition"];
    const fname = contentDisposition
      .split("filename=")[1]
      .split(".")[0]
      .replace('"', "");
    const ext = contentDisposition.split(".")[1].split(";")[0].replace('"', "");
    const filename = `${fname}.${ext}`;

    const url = window.URL.createObjectURL(new Blob([response.data]), {
      type: `application/${ext}`,
    });
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    message.error(error.message);
  }
};

export const onDownloadExcel = async (originalRequest,paginador,usuId,allLegajos) => {
 
  try {
    
    const request = { ...originalRequest };

    request.cantidadRegistrosPorPagina = paginador?.count;

    const filteredRequest = Object.fromEntries(
      Object.entries(request).filter(([key, value]) => {
        if (key === "fechaRegistro") {
          return value.fechaRegistroInicio !== "" && value.fechaRegistroFin !== "";
        } else {
          return value !== "" && value !== null && value !== 0;
        }
      })
    );

    if (filteredRequest.fechaRegistro) {
      const { fechaRegistroInicio, fechaRegistroFin } = filteredRequest.fechaRegistro;
      filteredRequest.fechaRegistroInicio = fechaRegistroInicio;
      filteredRequest.fechaRegistroFin = fechaRegistroFin;
      delete filteredRequest.fechaRegistro;
    }


    if (!allLegajos) {
      filteredRequest.abogadoId = usuId;
    }

    const response = await api.ListaLegajos.DownloadExcelLegajos(filteredRequest);
    
    // Get the filename from the response header
    const contentDisposition = response.headers["content-disposition"];
    const fname = contentDisposition
      .split("filename=")[1]
      .split(".")[0]
      .replace('"', "");
    const ext = contentDisposition
      .split(".")[1]
      .split(";")[0]
      .replace('"', "");
    const filename = `${fname}.${ext}`;

    const url = window.URL.createObjectURL(new Blob([response.data]), {
      type: `application/${ext}`,
    });
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    message.success("Reporte descargado correctamente");

  } catch (error) {
    message.error("Ocurrió un error al descargar el reporte");
  } 
};