import api from "../../services/api";
import { message } from "antd";

export const AnclarDesanclarLegajo = async (usuId,legajoId) => {

  try {
    const response = await api.Home.AnclarDesanclarLegajo(usuId,legajoId);
    return response;
  } catch (error) {
    message.error(error.message);
  }
};

export const GetLegajosAnclados = async (usuId) => {

    try {
      const response = await api.Home.GetLegajosAnclados(usuId);
      return response;
    } catch (error) {
      message.error(error.message);
    }
};

export const GetMetricasMesActual = async (usuId) => {

    try {
      const response = await api.Home.GetMetricasMesActual(usuId);
      return response;
    } catch (error) {
      message.error(error.message);
    }
};

export const GetMisAudienciasByDate = async (usuId,fecha) => {

    try {
      const response = await api.Home.GetMisAudienciasByDate(usuId,fecha);
      return response;
    } catch (error) {
      message.error(error.message);
    }
};

