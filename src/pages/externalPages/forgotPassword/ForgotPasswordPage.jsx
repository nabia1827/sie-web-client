import React, { useState, useEffect } from "react";
import { Flex, Grid, Form, message } from "antd";
import ForgotPasswordMobile from "./ForgotPasswordMobile";
import ForgotPasswordWeb from "./ForgotPasswordWeb";
import { useNavigate } from 'react-router-dom';
import { VerifyOTP, CreateOTPCode, ResetPassword } from "../../../utils/resetPassword/dinamicCalls";
import { paths } from "../../../utils/paths";
const { useBreakpoint } = Grid;

function ForgotPasswordPage() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    //Forms
    const [sendCodeForm] = Form.useForm();
    const [otpForm] = Form.useForm();
    const [passwordForm] = Form.useForm();

    //Local variables
    const [isSent, setIsSent] = useState(false);
    const [isValidated, setIsValidated] = useState(false);
    const [currentEmail, setCurrentEmail] = useState("");
    const [currentOtp, setCurrentOtp] = useState("");
    const [loading, setLoading] = useState(false);

    const onSendCode = async () => {
        setLoading(true);
        try {
            console.log("AHHHHH SEND CODE")
            const values = await sendCodeForm.validateFields();
            CreateOTPCode(values.email).then((response) => {
                setIsSent(true);
                setCurrentEmail(values.email);
                sendCodeForm.resetFields();
                setLoading(false);
            });
        } catch (error) {
            message.error("Por favor completar todos los campos.");
        }
    }

    const onValidateOTP = async () => {
        setLoading(true);
        try {
            const values = await otpForm.validateFields();
            console.log("OTP: ",values.otp)
            VerifyOTP(values.otp).then((response) => {
                setLoading(false);
                if (response.isSuccess) {
                    setIsValidated(true);
                    setCurrentOtp(values.otp);
                    otpForm.resetFields();
                }else{
                    message.error("El código no es válido.")
                }

            });

        } catch (error) {
            message.error("Por favor completar todos los campos.");
        }
    }


    const onResetPassword = async () => {
        setLoading(true);
        try {
            const values = await passwordForm.validateFields();

            ResetPassword(currentOtp, values.password,currentEmail).then((response) => {
                setLoading(false);
                if (response.isSuccess) {
                    navigate(paths.LOGIN)
                    passwordForm.resetFields();
                    setIsSent(false);
                    setIsValidated(false);
                    setCurrentEmail("");
                    setCurrentOtp("");
                }
            });
        }
        catch (error) {
            message.error("Por favor completar todos los campos.");
        }
    }



    return <>{isXsScreen ?
        <ForgotPasswordMobile
        /> :
        <ForgotPasswordWeb
            loading={loading}
            isSent={isSent}
            isValidated={isValidated}
            sendCodeForm={sendCodeForm}
            otpForm={otpForm}
            passwordForm={passwordForm}
            onSendCode={onSendCode}
            onValidateOTP={onValidateOTP}
            onResetPassword={onResetPassword}
        />
    }
    </>;
}

export default ForgotPasswordPage;