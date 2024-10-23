import { message } from "antd";
import { setAbogados,setSubfases,setDelegados,setClasesDocEntrada,setClasesDocSalida,
  setTiposDanio,setDependenciasMininter,setProcuradores, setDepartamentos } from "./appActionSync";
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
    if(esRecursoLegal==1){
      dispatch(setClasesDocSalida(resp.data));
    }else{
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
    const resp = await api.RecepcionLegajos.ListarLugarByTipo(1,0);

    dispatch(setDepartamentos(resp.data));
  } catch (error) {
    message.error(error.message);
  }
};