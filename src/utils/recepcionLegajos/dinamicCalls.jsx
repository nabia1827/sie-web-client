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


export const DeleteImputado = async (imputadoId) => {

  try {

    const response = await api.RecepcionLegajos.DeleteImputado(imputadoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const UpdateImputadoDelito = async (imputadoDelito) => {

  try {

    const response = await api.RecepcionLegajos.UpdateImputadoDelito(imputadoDelito);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const DeleteImputadoDelito = async (imputadoDelitoId) => {

  try {

    const response = await api.RecepcionLegajos.DeleteImputadoDelito(imputadoDelitoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const UpdateAudiencia = async (audienciaId, fecha,hora,tipoAudienciaId,link, legajoId) => {

  try {

    const response = await api.RecepcionLegajos.UpdateAudiencia(audienciaId, fecha,hora,tipoAudienciaId,link, legajoId);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};


export const UpdateDatosGeneralesTemp = async (datosGeneralesTemp) => {

  try {

    const response = await api.RecepcionLegajos.UpdateDatosGeneralesTemp(datosGeneralesTemp);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateDatosGenerales = async (datosGenerales) => {

  try {

    const response = await api.RecepcionLegajos.UpdateDatosGenerales(datosGenerales);
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



export const DeleteAgraviado = async (agraviadoId) => {

  try {

    const response = await api.RecepcionLegajos.DeleteAgraviado(agraviadoId);
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
    return response.data.data;
    

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