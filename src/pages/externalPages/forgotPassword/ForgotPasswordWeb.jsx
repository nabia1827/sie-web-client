import React, { useState, useEffect } from "react";
import { Flex, Button, Input, Typography, ConfigProvider, Switch, Form } from "antd";
import { colors } from "../../../utils/colors";
import { Lightning, User, EnvelopeSimple, WarningCircle } from "@phosphor-icons/react";
import { enableButtonStyle, hoverButtonStyle } from "../../../utils/styles";
import BannerLogo from "../../../components/general/BannerLogo";
import FormSendCode from "../../../components/forgotPassword/FormSendCode";
import FormVerifyCode from "../../../components/forgotPassword/FormVerifyCode";
import FormResetPassword from "../../../components/forgotPassword/FormResetPassword";

function ForgotPasswordWeb(props) {
    const { isSent, isValidated, sendCodeForm, otpForm, passwordForm,
        onSendCode, onValidateOTP, onResetPassword,loading } = props;

    return (
        <>
            <BannerLogo>
                {isSent ? (
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

            </BannerLogo>
        </>
    );

}

export default ForgotPasswordWeb;