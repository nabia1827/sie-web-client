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

export default { Auth, ListaLegajos,GenerarPDF };