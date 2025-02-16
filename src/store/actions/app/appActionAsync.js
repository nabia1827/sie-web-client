import { message } from "antd";
import {
  setAbogados, setSubfases, setDelegados, setClasesDocEntrada, setClasesDocSalida,
  setTiposDanio, setDependenciasMininter, setProcuradores, setDepartamentos,
  setDelitos,
  setTiposAudiencia,
  setTiposRemitente,
  setTiposPena,
  setTiposSentencia,
  setDistritosJudicial,
  setNotificaciones,
  setAnios
} from "./appActionSync";
import api from "../../../services/api";


export const cargarAnios = () => async (dispatch) => {
  try {
    const resp = await api.Reporte.ListarAnios();
    dispatch(setAnios(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};


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

export const cargarDelegados = () => async (dispatch) => {
  try {
    const resp = await api.DataLegajo.ListarDelegados();
    dispatch(setDelegados(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};

export const cargarClasesDoc = (esRecursoLegal) => async (dispatch) => {
  try {
    const resp = await api.DataLegajo.ListTipoDoc(esRecursoLegal);
    if (esRecursoLegal == 1) {
      dispatch(setClasesDocSalida(resp.data));
    } else {
      dispatch(setClasesDocEntrada(resp.data));
    }

  } catch (error) {
    message.error(error.message);
  }
};

export const CargarSubtipoDanio = () => async (dispatch) => {
  try {
    const resp = await api.DocumentosLegajo.ListSubtipoDanio();
    dispatch(setTiposDanio(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};

export const CargarDependenciaMininter = () => async (dispatch) => {
  try {
    const resp = await api.DocumentosLegajo.ListDependenciaMininter();
    dispatch(setDependenciasMininter(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};

export const CargarProcuradores = () => async (dispatch) => {
  try {
    const resp = await api.DocumentosLegajo.ListProcuradores();
    console.log(resp.data)
    dispatch(setProcuradores(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};

export const CargarDepartamentos = () => async (dispatch) => {
  try {
    const resp = await api.RecepcionLegajos.ListarLugarByTipo(1, 0);

    dispatch(setDepartamentos(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};


export const cargarDelitos = () => async (dispatch) => {
  try {
    const resp = await api.RecepcionLegajos.ListarDelito();
    dispatch(setDelitos(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};

export const cargarTiposAudiencia = () => async (dispatch) => {
  try {
    const resp = await api.RecepcionLegajos.ListarTipoAudiencia();
    dispatch(setTiposAudiencia(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};

export const cargarTiposRemitente = () => async (dispatch) => {
  try {
    const resp = await api.RecepcionLegajos.ListarTipoRemitente();
    dispatch(setTiposRemitente(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};

export const cargarTiposPena = () => async (dispatch) => {
  try {
    const resp = await api.RecepcionLegajos.ListarTipoPena();
    dispatch(setTiposPena(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};
export const cargarTiposSentencia = () => async (dispatch) => {
  try {
    const resp = await api.RecepcionLegajos.ListarTipoSentencia();
    dispatch(setTiposSentencia(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};


export const cargarDistritosJudicial = () => async (dispatch) => {
  try {
    const resp = await api.RecepcionLegajos.ListarDisJudicial();
    dispatch(setDistritosJudicial(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};


export const cargarNotificaciones = (usuId) => async (dispatch) => {
  try {
    const resp = await api.Notification.GetNotificacionesUser(usuId)
    dispatch(setNotificaciones(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};
