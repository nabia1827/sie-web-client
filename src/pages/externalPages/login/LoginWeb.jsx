import React, { useState, useEffect } from "react";
import { Flex, Button, Input, Typography, ConfigProvider, Switch } from "antd";
import { colors } from "../../../utils/colors";
import { motion } from "framer-motion";

import { Lightning, User, LockKey } from "@phosphor-icons/react";
import { enableButtonStyle,hoverButtonStyle } from "../../../utils/styles";


const { Text } = Typography

function LoginWeb(props) {
    const {username, password, onLogin,onChangeUsername,onChangePassword,onSwitchRemember} = props;
    const [trail, setTrail] = useState([]);
    

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const newTrail = { x: clientX, y: clientY, id: Math.random() };
        setTrail((prevTrail) => [...prevTrail, newTrail].slice(-10)); // Mantiene solo las últimas 10 posiciones
    };

    return (
        <>
            <Flex justify="center" align="center" style={{ width: "100%", height: "100vh" }}>
                <Flex vertical justify="center" align="center" style={{ width: "50%", height: "100vh", backgroundColor: colors.white }}>
                    <Flex gap={"large"} vertical justify="center" align="flex-start" style={{ width: "60%" }}>

                        <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>
                            <Text className="sie-login-title">¡Bienvenido!</Text>
                            <Text className="sie-login-subtitle">Ingresa tu email y password para iniciar sesión.</Text>
                        </Flex>
                        <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>
                            <Text>Nombre de Usuario:</Text>
                            <Input placeholder="example@mininter.gob.pe" size="large" onChange={onChangeUsername}
                                prefix={<User size={24} color={colors.gray} />} style={{ width: "100%" }} />
                        </Flex>

                        <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "100%" }}>
                            <Text>Contraseña:</Text>
                            <Input.Password placeholder="Contraseña" size="large" onChange={onChangePassword}
                                prefix={<LockKey size={24} color={colors.gray} />} style={{ width: "100%" }} />
                        </Flex>
                        <Flex gap={"small"} justify="flex-start" align="center" style={{width:"100%"}}>
                            <Switch size="small" defaultChecked onChange={onSwitchRemember} />
                            <Text>Recuerdame</Text>
                        </Flex>
                        <motion.button
                            whileHover={hoverButtonStyle}
                            whileTap={{ scale: 0.9 }}
                            style={enableButtonStyle}
                            onClick={onLogin}
                        >
                            Iniciar Sesión
                        </motion.button>


                    </Flex>



                </Flex>
                <Flex onMouseMove={handleMouseMove} vertical justify="center" align="center" style={{ width: "50%", height: "100vh", background: colors.gradient, overflow: "hidden" }}>
                    <Flex gap={"middle"} justify="center" align="center" style={{ width: "100%" }}>
                        <Flex justify="center" align="center" style={{ width: "70px", height: "70px", backgroundColor: "white", borderRadius: "5.0em" }}>
                            <Lightning size={40} weight="fill" color={colors.middleBlue} />

                        </Flex>
                        <Text className="sie-logo">SIE App</Text>
                    </Flex>
                    {trail.map((point) => (
                        <motion.div
                            key={point.id}
                            className="trail-dot"
                            initial={{ opacity: 1, scale: 1 }}
                            animate={{ opacity: 0, scale: 0.5 }}
                            transition={{ duration: 0.5 }}
                            style={{ left: point.x, top: point.y }}
                        />
                    ))}

                </Flex>
            </Flex>
        </>
    );

}

export default LoginWeb;