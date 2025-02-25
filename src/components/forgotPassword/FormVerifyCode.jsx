import React, { useState, useEffect } from "react";
import { Flex, Button, Input, Typography, ConfigProvider, Switch, Form } from "antd";
import { colors } from "../../utils/colors";
import { Lightning, User, EnvelopeSimple, WarningCircle } from "@phosphor-icons/react";
import { enableButtonStyle, hoverButtonStyle } from "../../utils/styles";
const {Text} = Typography;
function FormVerifyCode(props) {
    const { otpForm, onValidateOTP,loading } = props;

    const onValuesChange = (changedValues, allValues) =>{
        
        console.log("El valor cambiante", changedValues);
    }

    return (
        <>
            <Form
                form={otpForm}
                onFinish={onValidateOTP}
                onValuesChange={onValuesChange}                
                style={{ width: "100%", paddingLeft: "4em", paddingRight: "4em"}}
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
                        <Text className="sie-login-title">Código de Seguridad</Text>
                        <Text className="sie-login-subtitle" style={{textAlign:"left"}}>En caso el email ingresado sea correcto, se le enviará un correo con un código de seguridad.</Text>
                    </Flex>

                    <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>
                        <Form.Item
                            style={{ width: "100%", marginBottom: "0" }}
                            name='otp'
                            rules={[
                                {
                                    required: true,
                                    message: 'Por favor ingrese el código',
                                },
                            ]}
                        >
                            <Input.OTP  size="large" length={6} />
                        </Form.Item>

                    </Flex>
                    <Button loading={loading} style={enableButtonStyle} htmlType="submit" key="submit" type="primary" >
                        Verificar
                    </Button>
                </Flex>
            </Form>
        </>
    );

}

export default FormVerifyCode;