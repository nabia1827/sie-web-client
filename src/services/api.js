import { axiosDotNet, axiosPython } from "./axios";


const responseBody = res => {
    if (res != undefined) return res.data;
    return null;
};

const requests = {
    get: url => axiosDotNet.get(url).then(responseBody),
    post: (url, body) => axiosDotNet.post(url, body).then(responseBody),
    put: (url, body) => axiosDotNet.put(url, body).then(responseBody),
    delete: url => axiosDotNet.delete(url).then(responseBody),
    patch: (url, body) => axiosDotNet.patch(url, body).then(responseBody),
};

const requestsPython = {
    get: url => axiosPython.get(url).then(responseBody),
    post: (url, body) => axiosPython.post(url, body).then(responseBody),
    put: (url, body) => axiosPython.put(url, body).then(responseBody),
    delete: url => axiosPython.delete(url).then(responseBody),
    patch: (url, body) => axiosPython.patch(url, body).then(responseBody),
};

const Auth = {
    loginApp: body => requests.post('/Auth/Authenticate', body),
    logOutApp: (body) => requests.post('/Auth/Logout', body),
    renewToken: (body) => requests.post('/Auth/RenewToken', body),
};

const ListaLegajos = {
    ListarAbogados: () => requests.get('/ListaLegajos/ListarAbogados'),
    ListarSubfases: () => requests.get('/ListaLegajos/ListarSubfases'),
    ListarLegajos: (filter) => axiosDotNet.get('/ListaLegajos/ListarLegajos', { params: filter }).then(responseBody),
    DownloadExcelLegajos: (filter) => axiosDotNet.get("/ListaLegajos/DownloadExcelLegajos", {
        params: filter,
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/octet-stream',
            Accept: 'application/octet-stream',
        },
    }),
    UpdateEstadoLegajo: (params) => requests.patch(`/ListaLegajos/UpdateEstadoLegajo?estadoId=${params.estadoId}&subfaseId=${params.subfaseId}&legajoId=${params.legajoId}`),
};

const GenerarPDF = {
    DownloadLegajoPDF: (legajoId) => axiosDotNet.get(`/GenerarPdf/DownloadLegajoPDF?legajoId=${legajoId}`, {
        responseType: 'blob',
        headers: {
            'Content-Type': 'application/pdf',
            Accept: 'application/pdf',
        },
    }),
}

const DataLegajo ={
    GetAgraviadosByLegajoId: (legajoId) => requests.get(`/DataLegajo/GetAgraviadosByLegajoId?legajoId=${legajoId}`),
    GetImputadosByLegajoId: (legajoId) => requests.get(`/DataLegajo/GetImputadosByLegajoId?legajoId=${legajoId}`),
    ListTipoDoc: (esRecursoLegal) => requests.get(`/DataLegajo/ListTipoDoc?esRecursoLegal=${esRecursoLegal}`),
    GetAudienciasByLegajoId: (legajoId) => requests.get(`/DataLegajo/GetAudienciasByLegajoId?legajoId=${legajoId}`),
    GetInfoLegajoById: (legajoId) => requests.get(`/DataLegajo/GetInfoLegajoById?legajoId=${legajoId}`),
    GetResultadosByLegajoId: (legajoId) => requests.get(`/DataLegajo/GetResultadosByLegajoId?legajoId=${legajoId}`),
    UpdateDelegado: (legajoId,delegadoId) => requests.patch(`/DataLegajo/UpdateDelegado?legajoId=${legajoId}&delegadoId=${delegadoId}`),
    UpdateHecho: (body) => requests.patch(`/DataLegajo/UpdateHecho`,body),
    UpdateObservacionesAudiencia: (body) => requests.patch(`/DataLegajo/UpdateObservacionesAudiencia`,body),
    UpdateEstadoAsistencia: (audienciaId) => requests.patch(`/DataLegajo/UpdateEstadoAsistencia?audienciaId=${audienciaId}`),
    UpdateTipoProceso: (legajoId,esProcesoInmediato) => requests.patch(`/DataLegajo/UpdateTipoProceso?legajoId=${legajoId}&esProcesoInmediato=${esProcesoInmediato}`),
    ListarDelegados: () => requests.get(`/DataLegajo/ListarDelegado`),
    GetDelitosByLegajoId: (legajoId) => requests.get(`/DataLegajo/GetDelitosByLegajoId?legajoId=${legajoId}`),
}

const DocumentosLegajo = {
    ListarDocsEntrada: (legajoId) => requests.get(`/DocumentosLegajo/ListarDocsEntrada?legajoId=${legajoId}`),
    ListarDocsSalida: (legajoId) => requests.get(`/DocumentosLegajo/ListarDocsSalida?legajoId=${legajoId}`),
    ListSubtipoDanio: () => requests.get(`/DocumentosLegajo/ListSubtipoDanio`),
    ListDependenciaMininter: () => requests.get(`/DocumentosLegajo/ListDependenciaMininter`),
    ListProcuradores: () => requests.get(`/DocumentosLegajo/ListProcuradores`),
    ListDestinatariosPosibles: (legajoId) => requests.get(`/DocumentosLegajo/ListDestinatariosPosibles?legajoId=${legajoId}`),
}

const GenerarWord ={
    SendDocSalida: (body) => requests.post(`/GenerarWord/SendDocSalida`, body),
    DownloadDoc: (docId,tipoDocId) => axiosDotNet.get(`/GenerarWord/DownloadDoc?docId=${docId}&tipoDocId=${tipoDocId}`, {    
        responseType: 'blob',
        headers: {
          'Content-Type': 'application/pdf',
          Accept: 'application/pdf',
        },
    }),
    DSGenerarActorCivil: (body) => requests.post(`/GenerarWord/DSGenerarActorCivil`, body),
    DSGenerarArchivo: (body) => requests.post(`/GenerarWord/DSGenerarArchivo`, body),
    DSGenerarQueja: (body) => requests.post(`/GenerarWord/DSGenerarQueja`, body),
    DSGenerarDenuncia: (body) => requests.post(`/GenerarWord/DSGenerarDenuncia`, body),
}

const RecepcionLegajos = {
    ListarLugarByTipo: (tipoLugarId,antecesorId) => requests.get(`/RecepcionLegajos/ListarLugarByTipo?tipoLugarId=${tipoLugarId}&antecesorId=${antecesorId}`),
    ListarTipoRemitente: () => requests.get(`/RecepcionLegajos/ListarTipoRemitente`),
    ListarTipoPena:() => requests.get(`/RecepcionLegajos/ListarTipoPena`),
    ListarTipoSentencia: () => requests.get(`/RecepcionLegajos/ListarTipoSentencia`),
    SearchFiscalia: (nombreCompleto) => requests.get(`/RecepcionLegajos/SearchFiscalia?nombreCompleto=${nombreCompleto}`),
    SearchJuzgado: (nombreCompleto) => requests.get(`/RecepcionLegajos/SearchJuzgado?nombreCompleto=${nombreCompleto}`),
    GetDatosGeneralesTemp: (legajoId) => requests.get(`/RecepcionLegajos/GetDatosGeneralesTemp?legajoId=${legajoId}`),
    GetDatosGenerales: (legajoId) => requests.get(`/RecepcionLegajos/GetDatosGenerales?legajoId=${legajoId}`),
    GetDocumento: (documentoId) => requests.get(`/RecepcionLegajos/GetDocumento?documentoId=${documentoId}`),
    GetAudiencia: (audienciaId) =>requests.get(`/RecepcionLegajos/GetAudiencia?audienciaId=${audienciaId}`),
    ListarTipoAudiencia: () => requests.get(`/RecepcionLegajos/ListarTipoAudiencia`), 
    ListarDelito: () => requests.get(`/RecepcionLegajos/ListarDelito`),
    ListarTipoRemitente: () => requests.get(`/RecepcionLegajos/ListarTipoRemitente`),
    UpdateImputadoById: (body) => requests.patch(`/RecepcionLegajos/UpdateImputadoById`, body),
    DeleteImputado: (imputadoId) =>requests.patch(`/RecepcionLegajos/DeleteImputado?imputadoId=${imputadoId}`),
    UpdateImputadoDelito: (body) => requests.patch(`/RecepcionLegajos/UpdateImputadoDelito`, body),
    DeleteImputadoDelito: (imputadoDelitoId) =>requests.patch(`/RecepcionLegajos/DeleteImputadoDelito?imputadoDelitoId=${imputadoDelitoId}`),
    UpdateAudiencia: (audienciaId, fecha,hora,tipoAudienciaId,link,legajoId)=>requests.patch(`/RecepcionLegajos/UpdateAudiencia?audienciaId=${audienciaId}&fecha=${fecha}&hora=${hora}&tipoAudienciaId=${tipoAudienciaId}&link=${link}&legajoId=${legajoId}`),
    UpdateDatosGeneralesTemp: (body) => requests.patch(`/RecepcionLegajos/UpdateDatosGeneralesTemp`, body),
    UpdateDatosGenerales: (body) => requests.patch(`/RecepcionLegajos/UpdateDatosGenerales`, body),
    UpdateDatosDocumento: (body) => requests.patch(`/RecepcionLegajos/UpdateDatosDocumento`, body),
    ListarDisJudicial: ()=> requests.get(`/RecepcionLegajos/ListarDisJudicial`),
    DeleteAgraviado: (agraviadoId) =>requests.patch(`/RecepcionLegajos/DeleteAgraviado?agraviadoId=${agraviadoId}`),
    UpdateAgraviadoById: (body) => requests.patch(`/RecepcionLegajos/UpdateAgraviadoById`, body),
    GetLegajoIdByCarpetaOrExpediente: (tipoDestinatario,nroDocumento) => requests.get(`/RecepcionLegajos/GetLegajoIdByCarpetaOrExpediente?tipoDestinatario=${tipoDestinatario}&nroDocumento=${nroDocumento}`),
}

const Audiencia = {
    EditAudienciaDetail: (body) => requests.patch(`/Audiencia/EditAudienciaDetail`,body),
    EditAudiencias: (body) => requests.patch(`/Audiencia/EditAudiencias`,body),
    GetAudienciaDetail: audienciaId => requests.get(`/Audiencia/GetAudienciaDetail?audienciaId=${audienciaId}`),
    GetAudienciasByWeek: (fecha,daysToAdd,usuId) => requests.get(`/Audiencia/GetAudienciasByWeek?fecha=${fecha}&daysToAdd=${daysToAdd}&usuId=${usuId}`),
    InsertNuevasAudiencias: audiencias => requests.post('/Audiencia/InsertNuevasAudiencias', audiencias),
    RemoveAudiencias: dataIds => requests.patch('/Audiencia/RemoveAudiencias', dataIds),
    ListLegajosByTermino: (terminoBusqueda) => requests.get(`/Audiencia/ListLegajosByTermino?terminoBusqueda=${terminoBusqueda}`),
}

const Reporte = {
    GetCantidadAudiencias: (anio,mes,delitoId) => requests.get(`/Reporte/GetCantidadAudiencias?anio=${anio}&mes=${mes}&delitoId=${delitoId}`),
    GetCantidadLegajos: (anio,mes,delitoId) => requests.get(`/Reporte/GetCantidadLegajos?anio=${anio}&mes=${mes}&delitoId=${delitoId}`),
    GetChartBarsData: (anio,mes,delitoId) => requests.get(`/Reporte/GetChartBarsData?anio=${anio}&mes=${mes}&delitoId=${delitoId}`),
    GetChartLineData: (anio,mes,delitoId) => requests.get(`/Reporte/GetChartLineData?anio=${anio}&mes=${mes}&delitoId=${delitoId}`),
    GetChartMapData: (anio,mes,delitoId) => requests.get(`/Reporte/GetChartMapData?anio=${anio}&mes=${mes}&delitoId=${delitoId}`),
    GetChartPieData: (anio,mes,delitoId) => requests.get(`/Reporte/GetChartPieData?anio=${anio}&mes=${mes}&delitoId=${delitoId}`),
    GetChartStackedBarsData: (anio,mes,delitoId) => requests.get(`/Reporte/GetChartStackedBarsData?anio=${anio}&mes=${mes}&delitoId=${delitoId}`),
    GetLugarMasComun: (anio,mes,delitoId) => requests.get(`/Reporte/GetLugarMasComun?anio=${anio}&mes=${mes}&delitoId=${delitoId}`),
}

const Seguimiento = {
    GetSeguimientoAudiencias: () => requests.get(`/Seguimiento/GetSeguimientoAudiencias`),
    GetSeguimientoLegajos: () => requests.get(`/Seguimiento/GetSeguimientoLegajos`),
    GetSeguimientoRecursosLegales: () => requests.get(`/Seguimiento/GetSeguimientoRecursosLegales`),
}


const PythonService = {
    //(usuId, formData) => requestsPython.post(`/text-processing-first/?usuId=${usuId}`, formData),
    CrearLegajo: (usuId, formData) => axiosPython.post(`/text-processing-first?usuId=${usuId}`,formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    }), // Ejemplo de endpoint en tu API de Python
    AdicionarDocumento: (legajoId, usuId, formData) => requestsPython.post(`/text-processing-others?legajoId=${legajoId}&usuId=${usuId}`, formData),
}

const MisAudiencias = {
    GetMisAudienciasByWeek: (startDateTime,endDateTime,usuId) => requests.get(`/MisAudiencias/GetMisAudienciasByWeek?startDateTime=${startDateTime}&endDateTime=${endDateTime}&usuId=${usuId}`),
    EditMiAudiencia: (body) => requests.patch(`/MisAudiencias/EditMiAudiencia`,body),
    NewMiAudiencia: (body) => requests.post(`/MisAudiencias/NewMiAudiencia`,body),
    DeleteMiAudiencia: (id) => requests.post(`/MisAudiencias/DeleteMiAudiencia?id=${id}`),
}

const User = {
    UpdateUserEmail: (usuId,email) => requests.patch(`/User/UpdateUserEmail?usuId=${usuId}&email=${email}`),
}

const Notification = {
    GetNotificacionesUser: (usuId) => requests.get(`/Notification/GetNotificacionesUser?usuId=${usuId}`),
    MarkNotificationsAsRead: (notificationIds) => requests.patch(`/Notification/MarkNotificationsAsRead`,notificationIds),
    MarkNotificationAsReceived: (notificationId) => requests.patch(`/Notification/MarkNotificationAsReceived?notificationId=${notificationId}`),
}

export default { 
    Auth, 
    ListaLegajos,
    GenerarPDF,
    DataLegajo,
    DocumentosLegajo,
    GenerarWord,
    RecepcionLegajos, 
    Audiencia,
    PythonService, 
    Reporte,
    Seguimiento,
    MisAudiencias,
    User,
    Notification,
};