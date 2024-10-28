import api from "../../services/api";
import { message } from "antd";

export const UpdateImputadoById = async (tipoCaso,nroCaso) => {

  try {

    const response = await api.RecepcionLegajos.UpdateImputadoById(tipoCaso,nroCaso);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};