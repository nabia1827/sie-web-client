import api from "../../services/api";
import { message } from "antd";

export const GetMisAudienciasByWeek = async (start,end,usuId) => {
    try {
  
      const response = await api.MisAudiencias.GetMisAudienciasByWeek(start,end,usuId)
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const EditMiAudiencia = async (id,start,end,title,description,color,link,observaciones) => {
    try {
      const body = {
        id:id,
        start:start,
        end:end,
        title:title,
        description:description,
        color:color,
        link:link,
        observaciones:observaciones
      }
      const response = await api.MisAudiencias.EditMiAudiencia(body);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const NewMiAudiencia = async (body) => {
    try {
      
      const response = await api.MisAudiencias.NewMiAudiencia(body);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};

export const DeleteMiAudiencia = async (id) => {
    try {
  
      const response = await api.MisAudiencias.DeleteMiAudiencia(id);
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
};