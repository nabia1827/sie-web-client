import api from "../../services/api";
export const markNotificationsAsRead = async (ids) => {

    try {
        const response = await api.Notification.MarkNotificationsAsRead(ids);
        return response;

    } catch (error) {
        message.error(error.message);
    }
};

export const markNotificationAsReceived = async (id) => {

    try {
        const response = await api.Notification.MarkNotificationAsReceived(id)
        return response;

    } catch (error) {
        message.error(error.message);
    }
};