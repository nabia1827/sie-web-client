import api from "../../services/api";
import { message } from "antd";
import dayjs from "dayjs";
import { DATETIME_FORMAT } from "./default";
export const InsertNuevasAudiencias = async (events, usuarioId) => {

    try {
        const audiencias = events.map(event => {
            // Extraer la información necesaria de cada evento
            const { start, end, resourceId, audienciaTipoId, legajoId, audienciaLink, 
                audienciaObservaciones, audienciaColor } = event;


            // Crear un objeto de audiencia
            return {
                startTime: start,//dayjs(start).utc().toISOString(),
                endTime: end,//dayjs(end).utc().toISOString(),
                abogadoId: resourceId,
                audienciaTipoId: audienciaTipoId,
                legajoId: legajoId,
                audienciaLink: audienciaLink,
                audienciaObservaciones: audienciaObservaciones,
                audienciaColor: audienciaColor
            };
        });
        console.log("ENVIANDO GANT A API ", audiencias);

        const response = await api.Audiencia.InsertNuevasAudiencias(audiencias,usuarioId);
        return response;

    } catch (error) {
        message.error(error.message);
    }
};

export const ListLegajosByTermino = async (termino) => {

    try {
        

        const response = await api.Audiencia.ListLegajosByTermino(termino);
        return response;

    } catch (error) {
        message.error(error.message);
    }
};

export const RemoveAudiencias = async (dataIds, usuarioId) => {

    try {
        const response = await api.Audiencia.RemoveAudiencias(dataIds,usuarioId);
        return response;

    } catch (error) {
        message.error(error.message);
    }
};

export const EditAudiencias = async (events,usuarioId) => {

    try {
        const audiencias = events
        .filter(event => event.id !== undefined && event.id !== 0)
        .map(event => {
            const { start, end, resourceId,id } = event;

            return {
                audienciaId:id,
                startTime: dayjs(start).utc().toISOString(),
                endTime: dayjs(end).utc().toISOString(),
                abogadoId: resourceId,
                audienciaTitle:"",
                audienciaSubTitleHour:"",
                codigoLegajo:""
            };
        });
        console.log("ENVIANDO EDIT A API ", audiencias);

        const response = await api.Audiencia.EditAudiencias(audiencias, usuarioId);
        return response;

    } catch (error) {
        message.error(error.message);
    }
};

export const GetAudienciaDetail = async (audienciaId) => {

    try {
        const response = await api.Audiencia.GetAudienciaDetail(audienciaId);
        return response;

    } catch (error) {
        message.error(error.message);
    }
};

export const EditAudienciaDetail = async (audienciaId,color,link, obs,usuarioId) => {

    try {
        const body = {
            audienciaId:audienciaId,
            audienciaTitle:"",
            audienciaSubTitleDate:"",
            audienciaSubTitleHour:"",
            audienciaColor:color,
            audienciaLink:link?link:"",
            audienciaObservaciones:obs!=null && obs!=undefined?obs:"",
            audienciaEstado:"",
            codigoLegajo:"",
        }

        const response = await api.Audiencia.EditAudienciaDetail(body,usuarioId);
        return response;

    } catch (error) {
        message.error(error.message);
    }
};