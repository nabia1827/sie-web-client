import axios from "axios";
import store from "../store/store";
import { getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from "../utils/cookie";
import { removeExpiredRefreshToken,startLogout } from "../store/actions/authActionAsync";

axios.defaults.baseURL = `https://localhost:44393/api`;

let isRefreshing = false; // Variable para rastrear si ya se está actualizando el token
const subscribers = []; // Almacena las solicitudes pendientes que esperan la actualización del token

const onAccessTokenRefreshed = (newAccessToken) => {
  subscribers.forEach((callback) => callback(newAccessToken));
  subscribers.length = 0; // Limpiar la lista de suscriptores
};

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config;

    if (err.message === "Network Error" && !err.response) {
      //console.log("Network Error - Asegúrese de que la API se esté ejecutando");
      return Promise.reject(err);
    }

    if (err.response) {
      // Acces token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            const rs = await axios.post("/Auth/RefreshToken", {
              tokenExpirado: getAccessToken(),
              refreshToken: getRefreshToken(),
            });
            const newAccessToken = rs.data.reftokenToken;
            const refreshToken = rs.data.reftokenRefreshToken;

            // Actualizar los tokens en las cookies
            setAccessToken(newAccessToken);
            setRefreshToken(refreshToken);            

            originalConfig.headers.authorization = `Bearer ${newAccessToken}`;
            onAccessTokenRefreshed(newAccessToken); // Notificar a las solicitudes pendientes que el token ha sido actualizado
            return axios(originalConfig);
          } catch (e) {
            if (e.response && e.response.status === 400) {
              store.dispatch(removeExpiredRefreshToken());
            }
            return Promise.reject(err);
          } finally {
            isRefreshing = false; // Restablecer la variable de control
          }
        } else {
          // Si ya se está actualizando el token, espera a que se complete
          return new Promise((resolve) => {
            subscribers.push((newAccessToken) => {
              originalConfig.headers.authorization = `Bearer ${newAccessToken}`;
              resolve(axios(originalConfig));
            });
          });
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);

axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) config.headers.authorization = `Bearer ${token}`;

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (res) => res,
  async (err) => {    
    if (err.response.status === 403) {
      store.dispatch(startLogout());
      //console.log("err 403");
      // redirect to 403 page
      // window.location = '/403' 
    }
  });

export default axios;




