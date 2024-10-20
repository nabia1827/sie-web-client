import { message } from "antd";
import { setAbogados,setSubfases } from "./appActionSync";
import api from "../../../services/api";

export const cargarAbogados = () => async (dispatch) => {
    try {
      const resp = await api.ListaLegajos.ListarAbogados();
      dispatch(setAbogados(resp.data));
    } catch (error) {
      message.error(error.message);
    }
};

export const cargarSubfases = () => async (dispatch) => {
    try {
      const resp = await api.ListaLegajos.ListarSubfases();
      dispatch(setSubfases(resp.data));
    } catch (error) {
      message.error(error.message);
    }
};
  