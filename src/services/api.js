import axios from "./axios";

const responseBody = res => {
    if (res != undefined) return res.data;
    return null;
};

const requests = {
    get: url => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    delete: url => axios.delete(url).then(responseBody),
    patch: (url, body) => axios.patch(url, body).then(responseBody),
};


const Auth = {
    loginApp: body => requests.post('/Auth/Authenticate', body),
    logOutApp: (body) => requests.post('/Auth/Logout', body),
};

const ListaLegajos = {
    ListarAbogados: () => requests.get('/ListaLegajos/ListarAbogados'),
    ListarSubfases: () => requests.get('/ListaLegajos/ListarSubfases'),
    ListarLegajos: (filter) => axios.get('/ListaLegajos/ListarLegajos', { params: filter }).then(responseBody),
    DownloadExcelLegajos: (filter) => axios.get("/ListaLegajos/DownloadExcelLegajos", {
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
    DownloadLegajoPDF: (legajoId) => axios.get(`/GenerarPdf/DownloadLegajoPDF?legajoId=${legajoId}`, {
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
}

export default { Auth, ListaLegajos,GenerarPDF,DataLegajo };