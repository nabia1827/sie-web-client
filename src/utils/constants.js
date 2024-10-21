//Constantes
export const Perfiles = {
    ABOGADO: 1,
    MESA_PARTES: 2,
    PROCURADOR: 3,
    ADMIN: 4,
};

export const PerfilesNombre = ["Abogado","Mesa Partes","Procurador","Admin"]

export const EstadosAudiencia = {
    ASISTIO: "Asistió",
    PENDIENTE: "Pendiente",
    EN_CURSO: "En Curso",
    NO_ASISTIO: "No asistió",
};

export const TipoDoc = {
    DOCUMENTO_INGRESO:1,
    DOCUMENTO_SALIDA:2,
}


//APIS estaticas
export const ListTipoCaso =[
    {
        tipoCasoId:1,
        tipoCasoNombre:"Carpeta Fiscal"
    },
    {
        tipoCasoId:2,
        tipoCasoNombre:"Expediente Judicial"
    },
];

export const ListResultadoApelacion=[
    {
        resApelacionId:1,
        resApelacionNombre:"Sentencia Ratificada"
    },
    {
        resApelacionId:2,
        resApelacionNombre:"Sentencia Anulada"
    },
];

export const ListEstado=[
    {
        estadoId:1,
        estadoNombre:"En trámite"
    },
    {
        estadoId:2,
        estadoNombre:"Archivado"
    },
];

export const ListTipoDocIdentidad=[
    {
        tipoDocId:1,
        tipoDocNombre:"DNI"
    },
    {
        tipoDocId:2,
        tipoDocNombre:"Carnet Extranjería"
    },
];
  
  