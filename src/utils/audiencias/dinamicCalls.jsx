import api from "../../services/api";
import { message } from "antd";
import dayjs from "dayjs";
import { DATETIME_FORMAT } from "./default";
export const InsertNuevasAudiencias = async (events) => {

    try {
        const audiencias = events.map(event => {
            // Extraer la información necesaria de cada evento
            const { start, end, resourceId, audienciaTipoId, legajoId, audienciaLink, 
                audienciaObservaciones, audienciaColor } = event;

            // Crear un objeto de audiencia
            return {
                startTime: start,
                endTime: end,
                abogadoId: resourceId,
                audienciaTipoId: audienciaTipoId,
                legajoId: legajoId,
                audienciaLink: audienciaLink,
                audienciaObservaciones: audienciaObservaciones,
                audienciaColor: audienciaColor
            };
        });
        console.log("ENVIANDO GANT A API ", audiencias);

        const response = await api.Audiencia.InsertNuevasAudiencias(audiencias);
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

export const RemoveAudiencias = async (dataIds) => {

    try {
        const response = await api.Audiencia.RemoveAudiencias(dataIds);
        return response;

    } catch (error) {
        message.error(error.message);
    }
};

export const EditAudiencias = async (events) => {

    try {
        const audiencias = events
        .filter(event => event.id !== undefined && event.id !== 0)
        .map(event => {
            const { start, end, resourceId,id } = event;

            return {
                audienciaId:id,
                startTime: dayjs(start).format(),
                endTime: dayjs(end).format(),
                abogadoId: resourceId,
                audienciaTitle:"",
                audienciaSubTitleHour:"",
                codigoLegajo:""
            };
        });
        console.log("ENVIANDO EDIT A API ", audiencias);

        const response = await api.Audiencia.EditAudiencias(audiencias);
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

export const EditAudienciaDetail = async (audienciaId,color,link, obs) => {

    try {
        const body = {
            audienciaId:audienciaId,
            audienciaTitle:"",
            audienciaSubTitleDate:"",
            audienciaSubTitleHour:"",
            audienciaColor:color,
            audienciaLink:link,
            audienciaObservaciones:obs,
            audienciaEstado:"",
            codigoLegajo:"",
        }

        const response = await api.Audiencia.EditAudienciaDetail(body);
        return response;

    } catch (error) {
        message.error(error.message);
    }
};