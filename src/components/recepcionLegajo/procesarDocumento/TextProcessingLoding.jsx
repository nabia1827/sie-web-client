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

function TextProcessingLoading(props) {
    const { onFinish } = props;

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const totalTime = 10000;
        const intervalTime = 1000;
        const step = 100 / (totalTime / intervalTime);

        const interval = setInterval(() => {
            setProgress(prev => {
                const next = prev + step;
                return next >= 100 ? 100 : parseFloat(next.toFixed(2));
            });
        }, intervalTime);

        return () => clearInterval(interval);
    }, []);


    useEffect(() => {
        if (progress >= 100) {
            onFinish(); 
        }
    }, [progress]);



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
