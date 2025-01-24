import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { notification } from 'antd';
import { getAccessToken } from '../utils/cookie';
import { markNotificationAsReceived, markNotificationsAsRead } from '../utils/notifications/dinamicCalls';

let connection = null;

const setupSignalRConnection = async (api) => {
  // Si ya existe una conexión activa, no volver a crearla
  if (connection && connection.state === "Connected") {
    console.log("La conexión SignalR ya está activa.");
    return;
  }

  connection = new HubConnectionBuilder()
    .withUrl("https://localhost:44393/hubs/notifications", {
      accessTokenFactory: () => {
        const token = getAccessToken();
        console.log("Token enviado:", token);
        return token;
      },
    })
    .withAutomaticReconnect()
    .configureLogging(LogLevel.Information)
    .build();

  // Configurar el manejador de notificaciones
  connection.on("ReceiveNotification", (notificationData) => {
    console.log("Notificacion recibida: ", notificationData)
    markNotificationAsReceived(notificationData.NotificacionId);
    api.info({
      message: notificationData.Titulo,
      description: notificationData.Mensaje,
      placement: 'topRight',
      duration: 0, // No desaparece automáticamente
      onClose: () => markNotificationsAsRead([notificationData.NotificacionId]),
    });
  });

  // Manejar el cierre de la ventana/pestaña
  window.addEventListener('beforeunload', async () => {
    if (connection) {
      await connection.stop();
    }
  });

  try {
    await connection.start();
    console.log("Conexión SignalR establecida");
  } catch (err) {
    console.error("Error al conectar con SignalR:", err);
  }
};

export const initializeNotifications = (api) => {
  setupSignalRConnection(api);
};

export const closeConnection = async () => {
  if (connection) {
    try {
      await connection.stop();
      console.log("Conexión SignalR cerrada");
    } catch (err) {
      console.error("Error al cerrar la conexión:", err);
    } finally {
      connection = null; // Asegurarse de limpiar la referencia
    }
  }
};
