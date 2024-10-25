import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { Typography, Flex, Progress } from 'antd';
import Lottie from "react-lottie";
import animationData from "../../../assets/animations/bubbleAnimation.json";
const { Text } = Typography;
import { colors } from '../../../utils/colors';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

function TextProcessingLoading() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalTime = 40000; // 40 segundos
        const intervalTime = 1000; // Actualizar cada segundo
        const step = 100 / (totalTime / intervalTime); // Incremento por cada segundo

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev < 100) {
                    return prev + step;
                } else {
                    clearInterval(interval);
                    return 100;
                }
            });
        }, intervalTime);

        return () => clearInterval(interval); // Limpiar intervalo al desmontar
    }, []);

    return (
        <Flex gap={"middle"} vertical justify='center' align='center' style={{ width: "100%" }}>
            <Lottie options={defaultOptions} width={"15vw"} />

            <Progress
                percent={progress}
                style={{ width: "17vw" }}
                status="active"
                strokeColor={{
                    from: colors.blue,
                    to: colors.blue,
                }}
            />
            <Text style={{ textAlign: 'left' }}>Procesando el documento...</Text>
        </Flex>
    );
}

export default TextProcessingLoading;
