import React, { useState, useEffect } from "react";
import { Flex, Button, Input, Typography, ConfigProvider, Switch, Form } from "antd";
import { colors } from "../../../utils/colors";
import { Lightning, User, EnvelopeSimple, WarningCircle } from "@phosphor-icons/react";
import { enableButtonStyle, hoverButtonStyle } from "../../../utils/styles";
import BannerLogo from "../../../components/general/BannerLogo";
import FormSendCode from "../../../components/forgotPassword/FormSendCode";
import FormVerifyCode from "../../../components/forgotPassword/FormVerifyCode";
import FormResetPassword from "../../../components/forgotPassword/FormResetPassword";
import forgotPassword from "../../../assets/images/forgotPassword.svg"

function ForgotPasswordMobile(props){
    const { isSent, isValidated, sendCodeForm, otpForm, passwordForm,
        onSendCode, onValidateOTP, onResetPassword,loading } = props;

    return (
        <>
            <Flex justify="center" align="center" style={{ width: "100%", height: "100vh"}}>
                <Flex gap={"2em"} vertical justify="center" align="flex-start" style={{ width: "100%",backgroundColor: colors.white, height: "100vh", padding:"1em"}}>
                    <Flex vertical justify="center" align="center" >
                        <img src={forgotPassword} alt="Imagen de recuperacion de cuenta" style={{ maxWidth: '85%', maxHeight: 'auto' }} />
                    </Flex>
                    
                    {
                        isSent ? (
                            <>
                                {isValidated ? (
                                    <FormResetPassword loading={loading} passwordForm={passwordForm} onResetPassword={onResetPassword} />
                                ) : (
                                    <FormVerifyCode loading={loading} otpForm={otpForm} onValidateOTP={onValidateOTP} />
                                )

                                }
                            </>
                        ) : (
                            <FormSendCode loading={loading} sendCodeForm={sendCodeForm} onSendCode={onSendCode} />
                        )

                        
                    }
                    
                
                </Flex>
            </Flex>
        </>
    );

}

export default ForgotPasswordMobile;