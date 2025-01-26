import { ViewType } from "./audiencias/default";
//Constantes
export const Perfiles = {
    ABOGADO: 1,
    MESA_PARTES: 2,
    PROCURADOR: 3,
    ADMIN: 4,
};

export const PerfilesNombre = ["Abogado", "Mesa Partes", "Procurador", "Admin"]

export const EstadosAudiencia = {
    ASISTIO: "Asistió",
    PENDIENTE: "Pendiente",
    EN_CURSO: "En Curso",
    NO_ASISTIO: "No asistió",
};

export const TipoCantidad = {
    SOLES: 4,
};

export const TipoDestinatario = {
    FISCALIA: 1,
    JUZGADO: 2,
    EXTRA: 3
}

export const TipoDoc = {
    DOCUMENTO_INGRESO: 1,
    DOCUMENTO_SALIDA: 2,
}

export const FaseJuzgado = {
    INVESTIGACION_PREPARATORIA: 2,
    ENJUICIAMIENTO: 3,
}

export const ClaseDocPath = ["actor-civil", "archivo", "denuncia", "queja"]
export const ClaseDoc = {
    ACTOR_CIVIL: 10,
    ARCHIVO: 9,
    DENUNCIA: 8,
    QUEJA: 7
}

//APIS estaticas
export const ListTipoCaso = [
    {
        tipoCasoId: 1,
        tipoCasoNombre: "Carpeta Fiscal"
    },
    {
        tipoCasoId: 2,
        tipoCasoNombre: "Expediente Judicial"
    },
];

export const ListResultadoApelacion = [
    {
        resApelacionId: 1,
        resApelacionNombre: "Sentencia Ratificada"
    },
    {
        resApelacionId: 2,
        resApelacionNombre: "Sentencia Anulada"
    },
];

export const ListEstado = [
    {
        estadoId: 1,
        estadoNombre: "En trámite"
    },
    {
        estadoId: 2,
        
        estadoNombre: "Archivado"
    },
];


export const ListRemitente = [
    {
        estadoId: 1,
        estadoNombre: "fiscalia"
    },
    {
        estadoId: 2,
        
        estadoNombre: "juzgado"
    },
];


export const ListTipoProceso=[
    {
        procesoId:1,
        procesoNombre:"Proceso Común"
    },
    {
        procesoId:2,
        procesoNombre:"Proceso Inmediato"
    },
];

export const ListTipoDocIdentidad = [
    {
        tipoDocId: 1,
        tipoDocNombre: "DNI"
    },
    {
        tipoDocId: 2,
        tipoDocNombre: "Carnet Extranjeria o Pasaporte"
    }
];

export const BotonesVistasGantt = [
    { id: 1, viewName: "Día", viewType: ViewType.Day },
    {
        id: 2,
        viewName: "Semanal",
        viewType: ViewType.Custom2,
    },
    { id: 3, viewName: "Mensual", viewType: ViewType.Month },
];

export const ListAnios = [
    {
        anioId: 2024,
        anioDescripcion: "2024"
    },
    {
        anioId: 2023,
        anioDescripcion: "2023"
    }
];

export const ListMeses = [
    {
        mesId: 1,
        mesDescripcion: "Enero"
    },
    {
        mesId: 2,
        mesDescripcion: "Febrero"
    },
    {
        mesId: 3,
        mesDescripcion: "Marzo"
    },
    {
        mesId: 4,
        mesDescripcion: "Abril"
    },
    {
        mesId: 5,
        mesDescripcion: "Mayo"
    },
    {
        mesId: 6,
        mesDescripcion: "Junio"
    },
    {
        mesId: 7,
        mesDescripcion: "Julio"
    },
    {
        mesId: 8,
        mesDescripcion: "Agosto"
    },
    {
        mesId: 9,
        mesDescripcion: "Septiembre"
    },
    {
        mesId: 10,
        mesDescripcion: "Octubre"
    },
    {
        mesId: 11,
        mesDescripcion: "Noviembre"
    },
    {
        mesId: 12,
        mesDescripcion: "Diciembre"
    },
];

export const OperationType = {
    CREAR:1,
    EDITAR:2,
}

export const OperationTypeName = {
    1:'Crear',
    2: 'Editar'
}