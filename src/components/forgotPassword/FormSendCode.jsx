import React, { useState, useEffect } from "react";
import { Flex, Button, Input, Typography, ConfigProvider, Switch, Form } from "antd";
import { colors } from "../../utils/colors";
import { Lightning, User, EnvelopeSimple, WarningCircle } from "@phosphor-icons/react";
import { enableButtonStyle, hoverButtonStyle } from "../../utils/styles";
const {Text} = Typography;

function FormSendCode(props) {
    const {sendCodeForm,onSendCode,loading} = props;

    return (
        <>
            <Form
                form={sendCodeForm}
                style={{ width: "60%" }}
                labelWrap={true}
                labelCol={{
                    xxl: 24,
                    xl: 24,
                    lg: 24,
                    md: 24,
                    sm: 24,
                    xs: 24,
                }}
                wrapperCol={{
                    xxl: 24,
                    xl: 24,
                    lg: 24,
                    md: 24,
                    sm: 24,
                    xs: 24,
                }}
            >
                <Flex gap={"large"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>

                    <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>
                        <Text className="sie-login-title">Olvidé mi contraseña</Text>
                        <Text className="sie-login-subtitle" style={{textAlign:"left"}}>Ingresa tu email para restablecer tu contraseña. Te enviaremos un código de seguridad.</Text>
                    </Flex>

                    <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>
                        <Form.Item
                            style={{ width: "100%", marginBottom: "0" }}
                            name='email'
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese un email.',
                                },
                                {
                                    type: 'email',
                                    message: "No es un email válido",
                                },
                            ]}
                        >
                            <Input placeholder="Usuario" size="large"
                                prefix={<EnvelopeSimple size={24} color={colors.gray} />} style={{ width: "100%" }} />
                        </Form.Item>

                    </Flex>
                    <Button loading={loading} onClick={onSendCode} style={enableButtonStyle} type="primary" >
                        Enviar código
                    </Button>
                </Flex>
            </Form>
        </>
    );

}

export default FormSendCode;