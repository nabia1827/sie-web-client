export const endpoints = {
    LOGIN:"/login",
    FORGOT_PASSWORD:"/forgot-password",
    RESET_PASSWORD: "/reset-password",
    VERIFY_CODE: "/verify-code",
    ROOT:"/", //No tocar
    HOME: "home", 

    //Consultas Legajos
    CONSULTA_LEGAJOS:"consulta-legajos",
    MIS_LEGAJOS:"mis-legajos",
    TODOS_LEGAJOS:"todos",
    DETALLE_LEGAJO:"detalle",
    DOCS_INGRESO_LEGAJO:"documentos-entrada",
    DOCS_SALIDA_LEGAJO:"documentos-salida",
    CREAR_DOC:"crear-doc",

    //Audiencias
    AUDIENCIAS:"audiencias",
    MIS_AUDIENCIAS:"mis-audiencias",
    TODAS_AUDIENCIAS:"todas-audiencias",

    //Reporte Legajos
    REPORTE_LEGAJOS:"reporte-legajos",
    REPORTE_GENERAL:"reporte-general",
    SEGUIMIENTO:"seguimiento",

    //Recepcion Legajos
    RECEPCION_LEGAJOS:"recepcion-legajos",
    NUEVO_LEGAJO:"nuevo-legajo",
    ADICIONAR_LEGAJO:"adicionar-documentos",
}

export const paths = {
    LOGIN: `${endpoints.LOGIN}`,
    FORGOT_PASSWORD: `${endpoints.FORGOT_PASSWORD}`,
    RESET_PASSWORD: `${endpoints.RESET_PASSWORD}`,
    VERIFY_CODE: `${endpoints.VERIFY_CODE}`,
    ROOT:`/`,//No tocar
    HOME: `/${endpoints.HOME}`, 

    //Consulta Legajos
    MIS_LEGAJOS: `/${endpoints.CONSULTA_LEGAJOS}/${endpoints.MIS_LEGAJOS}`, 
    TODOS_LEGAJOS: `/${endpoints.CONSULTA_LEGAJOS}/${endpoints.TODOS_LEGAJOS}`, 
    DETALLE_LEGAJO:(id) => `${id}/${endpoints.DETALLE_LEGAJO}`,
    DOCS_INGRESO_LEGAJO:(id) => `${id}/${endpoints.DOCS_INGRESO_LEGAJO}`,
    DOCS_SALIDA_LEGAJO:(id) => `${id}/${endpoints.DOCS_SALIDA_LEGAJO}`,
    CREAR_DOC:(param) =>`${endpoints.CREAR_DOC}/${param}`,
    
    //Audiencias
    MIS_AUDIENCIAS: `/${endpoints.AUDIENCIAS}/${endpoints.MIS_AUDIENCIAS}`, 
    TODAS_AUDIENCIAS: `/${endpoints.AUDIENCIAS}/${endpoints.TODAS_AUDIENCIAS}`,

    //Reporte Legajos
    REPORTE_GENERAL: `/${endpoints.REPORTE_LEGAJOS}/${endpoints.REPORTE_GENERAL}`, 
    SEGUIMIENTO: `/${endpoints.REPORTE_LEGAJOS}/${endpoints.SEGUIMIENTO}`, 

    //Recepcion Legajos
    RECEPCION_LEGAJOS:`/${endpoints.RECEPCION_LEGAJOS}`,
    NUEVO_LEGAJO:(legajoId,docId,audienciaId) =>`${endpoints.RECEPCION_LEGAJOS}/${endpoints.NUEVO_LEGAJO}/${legajoId}/${docId}/${audienciaId}`,
    ADICIONAR_LEGAJO:(legajoId,docId,audienciaId) =>`${endpoints.RECEPCION_LEGAJOS}/${endpoints.ADICIONAR_LEGAJO}/${legajoId}/${docId}/${audienciaId}`,
    NOT_FOUND: "*",
};