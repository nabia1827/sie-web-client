import api from "../../services/api";
import { message } from "antd";
import { ClaseDoc } from "../constants";
import { DSGenerarArchivo } from "./dinamicCalls";

export const crearDocEstandar = async (claseDocId,legajoId,usuId) => {
    switch (claseDocId) {
      case ClaseDoc.ARCHIVO:
        return await DSGenerarArchivo(legajoId,usuId);
      default:
        return message.error("Documento no válido.")
    }
};