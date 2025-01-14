import api from "../../services/api";
import { message } from "antd";

export const UpdateUserEmail = async (usuId,email) => {

    try {
  
      const response = await api.User.UpdateUserEmail(usuId,email)
      return response;
  
    } catch (error) {
      message.error(error.message);
    }
  };
  