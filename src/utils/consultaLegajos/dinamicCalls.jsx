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

export const GetInfoLegajoById = async (legajoId) => {

  try {

    const response = await api.DataLegajo.GetInfoLegajoById(legajoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const GetImputadosByLegajoId = async (legajoId) => {

  try {

    const response = await api.DataLegajo.GetImputadosByLegajoId(legajoId)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const GetAgraviadosByLegajoId = async (legajoId) => {

  try {

    const response = await api.DataLegajo.GetAgraviadosByLegajoId(legajoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const GetAudienciasByLegajoId = async (legajoId) => {

  try {

    const response = await api.DataLegajo.GetAudienciasByLegajoId(legajoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const GetResultadosByLegajoId = async (legajoId) => {

  try {

    const response = await api.DataLegajo.GetResultadosByLegajoId(legajoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateDelegado = async (legajoId,delegadoId) => {

  try {

    const response = await api.DataLegajo.UpdateDelegado(legajoId,delegadoId)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateHecho = async (legajoHechoId,hecho) => {

  try {
    const body = {
      legajoHechoId:legajoHechoId,
      hecho:hecho
    }

    const response = await api.DataLegajo.UpdateHecho(body)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateObservacionesAudiencia = async (audienciaId,observacion) => {

  try {
    const body = {
      audienciaId:audienciaId,
      observacion:observacion
    }

    const response = await api.DataLegajo.UpdateObservacionesAudiencia(body)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateEstadoAsistencia = async (audienciaId) => {

  try {

    const response = await api.DataLegajo.UpdateEstadoAsistencia(audienciaId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const ListarDocsEntrada = async (legajoId) => {

  try {

    const response = await api.DocumentosLegajo.ListarDocsEntrada(legajoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const ListarDocsSalida = async (legajoId) => {

  try {

    const response = await api.DocumentosLegajo.ListarDocsSalida(legajoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const onDownloadDocPDF = async (docId,tipoDocId) => {

  try {

    const response = await api.GenerarWord.DownloadDoc(docId,tipoDocId);

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

export const SendDocSalida = async (docId,usuId,usuCorreo,contenidoCorreo,autogenerar,destinatarios) => {

  try {
    const body = {
      docId:docId,
      usuId:usuId,
      usuCorreo:usuCorreo,
      contenidoCorreo:contenidoCorreo,
      autogenerar:autogenerar,
      destinatarios:destinatarios
    }
    const response = await api.GenerarWord.SendDocSalida(body);
    message.success(response.message);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const ListDestinatariosPosibles = async (legajoId) => {

  try {

    const response = await api.DocumentosLegajo.ListDestinatariosPosibles(legajoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const DSGenerarActorCivil = async (legajoId,usuId,procuradorId,dependenciaAfectadaId,tipoDanioId,especialistaLegal) => {

  try {
    const body = {
      legajoId:legajoId,
      usuId:usuId,
      procuradorId:procuradorId,
      dependenciaAfectadaId:dependenciaAfectadaId,
      tipoDanioId:tipoDanioId,
      especialistaLegal:especialistaLegal,
    }
    const response = await api.GenerarWord.DSGenerarActorCivil(body);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const DSGenerarArchivo = async (legajoId,usuId) => {

  try {
    const body = {
      legajoId:legajoId,
      usuId:usuId,
    }

    const response = await api.GenerarWord.DSGenerarArchivo(body);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const DSGenerarQueja = async (legajoId,usuId,procuradorId,fechaArchivo,fundDispImpugnada,fundPretImpug) => {

  try {
    const body = {
      legajoId:legajoId,
      usuId:usuId,
      procuradorId:procuradorId,
      fechaArchivo:fechaArchivo,
      fundDispImpugnada:fundDispImpugnada,
      fundPretImpug:fundPretImpug
    }

    const response = await api.GenerarWord.DSGenerarQueja(body);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const DSGenerarDenuncia = async (legajoId,usuId,procuradorId,provinciaId,dependenciaAfectadaId,anexos,analisis) => {

  try {
    const body = {
      legajoId:legajoId,
      usuId:usuId,
      procuradorId:procuradorId,
      provinciaId:provinciaId,
      dependenciaAfectadaId:dependenciaAfectadaId,
      anexos:anexos,
      analisis:analisis
    }

    const response = await api.GenerarWord.DSGenerarDenuncia(body);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const ListarDepartamentos = async () => {

  try {

    const response = await api.RecepcionLegajos.ListarLugarByTipo(1,0);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const ListarProvincias = async (departamentoId) => {

  try {

    const response = await api.RecepcionLegajos.ListarLugarByTipo(2,departamentoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const ListarDistritos = async (provinciaId) => {

  try {

    const response = await api.RecepcionLegajos.ListarLugarByTipo(3,provinciaId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const GetDelitosByLegajoId = async (legajoId) => {

  try {

    const response = await api.DataLegajo.GetDelitosByLegajoId(legajoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const GetDocumento = async (documentoId) => {
  try {

    const response = await api.RecepcionLegajos.GetDocumento(documentoId);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const GetDatosGeneralesTemp = async (legajoId) => {
  try {

    const response = await api.RecepcionLegajos.GetDatosGeneralesTemp(legajoId);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const GetAudiencia = async (audienciaId) => {
  try {

    const response = await api.RecepcionLegajos.GetAudiencia(audienciaId);
    return response;
    
  } catch (error) {
    message.error(error.message);
  }
};

export const SearchJuzgado = async (nombreCompleto) => {
  try {

    const response = await api.RecepcionLegajos.SearchJuzgado(nombreCompleto);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};


export const SearchFiscalia = async (nombreCompleto) => {
  try {

    const response = await api.RecepcionLegajos.SearchFiscalia(nombreCompleto);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};
