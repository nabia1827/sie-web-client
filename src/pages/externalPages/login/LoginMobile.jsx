import React, { useState, useEffect } from "react";
import { Flex, Button, Input, Typography, ConfigProvider, Switch } from "antd";
import { colors } from "../../../utils/colors";
import { Lightning, User, LockKey, WarningCircle } from "@phosphor-icons/react";
import { enableButtonStyle, hoverButtonStyle } from "../../../utils/styles";
import BannerLogo from "../../../components/general/BannerLogo";
import login from "../../../assets/images/secureLogin.svg"

const { Text } = Typography

function LoginMobile(props){
    const { username, password, onLogin, onChangeUsername, onChangePassword, onClickForgotPassword,
        textError, status, loading
    } = props;

    return (
        <>
            <Flex justify="center" align="center" style={{ width: "100%", height: "100vh"}}>
                <Flex gap={"large"} vertical justify="center" align="flex-start" style={{ width: "100%",backgroundColor: colors.white, height: "100vh", padding:"4em"}}>
                    <Flex vertical justify="center" align="center" >
                        <img src={login} alt="Imagen Ingreso Sesion" style={{ maxWidth: '40%', minWidth: '35%', maxHeight: 'auto' }} />
                    </Flex>

                    <Flex gap={"small"} vertical justify="center" align="flex-center" style={{ width: "100%" }}>
                        <Text className="sie-login-title">¡Bienvenido!</Text>
                        <Text className="sie-login-subtitle">Ingresa tu usuario y password para iniciar sesión.</Text>
                    </Flex>
                    <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>
                        <Text>Nombre de Usuario:</Text>
                        <Input status={status} placeholder="Usuario" size="large" onChange={onChangeUsername}
                            prefix={<User size={24} color={colors.gray} />} style={{ width: "100%" }} />
                    </Flex>

                    <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>
                        <Text>Contraseña:</Text>
                        <Input.Password status={status} placeholder="Contraseña" size="large" onChange={onChangePassword}
                            prefix={<LockKey size={24} color={colors.gray} />} style={{ width: "100%" }} />
                    </Flex>
                    {
                        textError !== '' && (
                            <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                <WarningCircle size={24} color={colors.red} />
                                <Text>{textError}</Text>
                            </Flex>
                        )
                    }


                    <Button style={enableButtonStyle} key="submit" type="primary" loading={loading} onClick={() => onLogin(username, password)}>
                        Iniciar Sesión
                    </Button>
                    <Flex gap={"small"} justify="center" align="center" style={{ width: "100%" }}>
                        <a onClick={onClickForgotPassword}><Text style={{color:colors.blue}}>¿Olvidaste tu contraseña?</Text></a>
                        
                    </Flex>
                </Flex>
            </Flex>
            
        </>
    );


}

export default LoginMobile;