import api from "../../services/api";
import { message } from "antd";

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