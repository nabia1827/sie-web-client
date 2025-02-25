import React, { useState, useEffect } from "react";
import { Flex, Button, Input, Typography, ConfigProvider, Switch, Form } from "antd";
import { colors } from "../../utils/colors";
import { LockKey } from "@phosphor-icons/react";
import { enableButtonStyle, hoverButtonStyle } from "../../utils/styles";
import PasswordStrengthChecker from "./PasswordStrengthChecker";
const {Text} = Typography;
function FormResetPassword(props) {
    const { passwordForm, onResetPassword,loading } = props;
    const [password, setPassword] = useState("");

    const onFieldsChange = (changeFields, allFields) => {
        const campo = changeFields[0].name[0];
        const valor = changeFields[0].value
        setPassword(valor);
    }

    return (
        <>
            <Form
                form={passwordForm}
                onFinish={onResetPassword}
                onFieldsChange={onFieldsChange}
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
                        <Text className="sie-login-title">Cambiar Contraseña</Text>
                        <Text className="sie-login-subtitle">Estimado usuario, reestablezca su contraseña por una nueva.</Text>
                    </Flex>

                    <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>
                        <Form.Item
                            style={{ width: "100%", marginBottom: "0" }}
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },
                            ]}
                        >
                            <Input.Password placeholder="Contraseña" size="large"
                                prefix={<LockKey size={24} color={colors.gray} />} style={{ width: "100%" }} />
                        </Form.Item>
                        <PasswordStrengthChecker password={password}/>
                        


                    </Flex>
                    <Button loading={loading} style={enableButtonStyle} htmlType="submit" key="submit" type="primary" >
                        Cambiar
                    </Button>
                </Flex>
            </Form>
        </>
    );

}

export default FormResetPassword;