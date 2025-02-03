import api from "../../services/api";
import { message } from "antd";

export const CreateOTPCode = async (email) => {
    try {
        console.log("Ahhhh create otp code:", email)
        const body = {
            ToEmail: email,
        }
        const response = await api.ForgotPassword.CreateOTPCode(body)
        return response;

    } catch (error) {
        message.error(error.message);
    }
};

export const VerifyOTP = async (otp) => {
    try {
        const body = {
            otp: otp,
        }
        const response = await api.ForgotPassword.VerifyOTP(body)
        return response;

    } catch (error) {
        message.error(error.message);
    }
};

export const ResetPassword = async (otp,password,email) => {
    try {
        const body = {
            otp: otp,
            password:password,
            email: email,
        }
        const response = await api.ForgotPassword.ResetPassword(body)
        return response;

    } catch (error) {
        message.error(error.message);
    }
};