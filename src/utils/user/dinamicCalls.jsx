import api from "../../services/api";
import { message } from "antd";

export const UpdateUserEmail = async (usuId, email) => {

  try {

    const response = await api.User.UpdateUserEmail(usuId, email)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const UpdateUserImage = async (usuId, file) => {

  try {

    const response = await api.User.UpdateUserImage(usuId, file);
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const GetUserImageUrl = async (usuId) => {

  try {

    const response = await api.User.GetUserImageUrl(usuId)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};

export const RemoveUserImage = async (usuId) => {

  try {

    const response = await api.User.RemoveUserImage(usuId)
    return response;

  } catch (error) {
    message.error(error.message);
  }
};