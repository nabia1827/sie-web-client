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
    GetLegajoIdByCarpetaOrExpediente: (tipoDestinatario,nroDocumento) => requests.get(`/RecepcionLegajos/GetLegajoIdByCarpetaOrExpediente?tipoDestinatario=${tipoDestinatario}&nroDocumento=${nroDocumento}`),
}
/* 
const PythonService = {
    CrearLegajo: (usuId, formData) => requestsPython.get(`/text-processing-first?usuId=${usuId}`, formData), // Ejemplo de endpoint en tu API de Python
    AdicionarDocumento: (legajoId, usuId, formData) => requestsPython.post(`/text-processing-others?legajoId=${legajoId}&usuId=${usuId}`, formData),
};*/


export default { Auth, ListaLegajos,GenerarPDF,DataLegajo,DocumentosLegajo,GenerarWord,RecepcionLegajos,/*PythonService*/ };