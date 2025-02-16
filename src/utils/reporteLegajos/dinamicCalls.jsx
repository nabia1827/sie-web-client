import api from "../../services/api";
import { message } from "antd";


export const GetMesesbyAnio = async (anio) => {

  try {

    const response = await api.Reporte.GetMesesbyAnio(anio);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};


export const GetCantidadLegajos = async (anio,mes,delitoId) => {

    try {
  
      const response = await api.Reporte.GetCantidadLegajos(anio, mes, delitoId);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const GetCantidadAudiencias = async (anio,mes,delitoId) => {

    try {
  
      const response = await api.Reporte.GetCantidadAudiencias(anio, mes, delitoId);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const GetLugarMasComun = async (anio,mes,delitoId) => {

    try {
  
      const response = await api.Reporte.GetLugarMasComun(anio, mes, delitoId);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const GetChartBarsData = async (anio,mes,delitoId) => {

    try {
  
      const response = await api.Reporte.GetChartBarsData(anio,mes,delitoId);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const GetChartLineData = async (anio,mes,delitoId) => {

    try {
  
      const response = await api.Reporte.GetChartLineData(anio, mes, delitoId);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const GetChartMapData = async (anio,mes,delitoId) => {

    try {
  
      const response = await api.Reporte.GetChartMapData(anio, mes, delitoId);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const GetChartPieData = async (anio,mes,delitoId) => {

    try {
  
      const response = await api.Reporte.GetChartPieData(anio, mes, delitoId);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const GetChartStackedBarsData = async (anio,mes,delitoId) => {

    try {
  
      const response = await api.Reporte.GetChartStackedBarsData(anio,mes,delitoId);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const GetSeguimientoAudiencias = async (anio, mes) => {

  try {

    const response = await api.Seguimiento.GetSeguimientoAudiencias(anio, mes)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const GetSeguimientoLegajos = async (anio, mes) => {

  try {

    const response = await api.Seguimiento.GetSeguimientoLegajos(anio, mes)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const GetSeguimientoRecursosLegales = async (anio, mes) => {

  try {

    const response = await api.Seguimiento.GetSeguimientoRecursosLegales(anio, mes)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};