import api from "../../services/api";
import { message } from "antd";

export const UpdateImputadoById = async (imputado) => {

  try {

    const response = await api.RecepcionLegajos.UpdateImputadoById(imputado);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const DeleteImputado = async (imputadoId,usuarioId) => {

  try {

    const response = await api.RecepcionLegajos.DeleteImputado(imputadoId, usuarioId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const UpdateImputadoDelito = async (imputadoDelito, usuarioId) => {

  try {

    const response = await api.RecepcionLegajos.UpdateImputadoDelito(imputadoDelito,usuarioId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const DeleteImputadoDelito = async (imputadoDelitoId,usuarioId) => {

  try {

    const response = await api.RecepcionLegajos.DeleteImputadoDelito(imputadoDelitoId, usuarioId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const UpdateAudiencia = async (audienciaId, fecha,hora,tipoAudienciaId,link, legajoId,usuarioId) => {

  try {

    const response = await api.RecepcionLegajos.UpdateAudiencia(audienciaId, fecha,hora,tipoAudienciaId,link, legajoId,usuarioId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const UpdateDatosGeneralesTemp = async (datosGeneralesTemp, usuarioId) => {

  try {

    const response = await api.RecepcionLegajos.UpdateDatosGeneralesTemp(datosGeneralesTemp, usuarioId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateDatosGenerales = async (datosGenerales, usuarioId) => {

  try {

    const response = await api.RecepcionLegajos.UpdateDatosGenerales(datosGenerales, usuarioId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateDatosDocumento = async (datosDocumento) => {

  try {

    const response = await api.RecepcionLegajos.UpdateDatosDocumento(datosDocumento);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const GetDatosGenerales = async (legajoId) => {

  try {

    const response = await api.RecepcionLegajos.GetDatosGenerales(legajoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};



export const DeleteAgraviado = async (agraviadoId, usuarioId) => {

  try {

    const response = await api.RecepcionLegajos.DeleteAgraviado(agraviadoId, usuarioId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const UpdateAgraviadoById = async (agraviado) => {

  try {

    const response = await api.RecepcionLegajos.UpdateAgraviadoById(agraviado);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const CrearLegajo = async (usuId, file) => {

  try {
    const response = await api.PythonService.CrearLegajo(usuId, file);
    console.log("prueba crear",response)
    return response.data;
    

  } catch (error) {
    message.error(error.message);
  }
};


export const AdicionarDocumento = async (legajoId,usuId, file) => {

  try {

    const response = await api.PythonService.AdicionarDocumento(legajoId,usuId, file);
    console.log("prueba adicionar",response)
    return response.data;

  } catch (error) {
    message.error(error.message);
  }
};


export const InsertImputado = async (legajoId,nombre,tipoDocId,nroDoc,delitosIds, usuId) => {

  try {
    const body = {
      imputadoId:0,
      legajoId:legajoId,
      nombre:nombre,
      tipoDocId:tipoDocId?tipoDocId:"",
      nroDoc:nroDoc?nroDoc:"",
      delitosIds:delitosIds,
      usuarioId: usuId,
    }

    const response = await api.RecepcionLegajos.InsertImputado(body)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const InsertAgraviado = async (legajoId,nombre,tipoDocId,nroDoc, usuId) => {

  try {
    const body = {
      agraviadoId:0,
      legajoId:legajoId,
      nombre:nombre,
      tipoDocId:tipoDocId?tipoDocId:"",
      nroDoc:nroDoc?nroDoc:"",
      usuarioId:usuId
    }

    const response = await api.RecepcionLegajos.InsertAgraviado(body);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};
