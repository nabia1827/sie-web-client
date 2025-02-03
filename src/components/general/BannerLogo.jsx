import React, { useState, useEffect } from "react";
import { Flex, Button, Input, Typography, ConfigProvider, Switch } from "antd";
import { colors } from "../../utils/colors";
import { motion } from "framer-motion";

import { Lightning, User, LockKey, WarningCircle } from "@phosphor-icons/react";
import { enableButtonStyle, hoverButtonStyle } from "../../utils/styles";

const { Text } = Typography

function BannerLogo({ children }) {
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
                    {children}
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

export default BannerLogo;