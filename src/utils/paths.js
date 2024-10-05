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
    
    //Audiencias
    MIS_AUDIENCIAS: `/${endpoints.AUDIENCIAS}/${endpoints.MIS_AUDIENCIAS}`, 
    TODAS_AUDIENCIAS: `/${endpoints.AUDIENCIAS}/${endpoints.TODAS_AUDIENCIAS}`,

    //Reporte Legajos
    REPORTE_GENERAL: `/${endpoints.REPORTE_LEGAJOS}/${endpoints.REPORTE_GENERAL}`, 
    SEGUIMIENTO: `/${endpoints.REPORTE_LEGAJOS}/${endpoints.SEGUIMIENTO}`, 

    //Recepcion Legajos
    RECEPCION_LEGAJOS:`/${endpoints.RECEPCION_LEGAJOS}`,
    NOT_FOUND: "*",
};