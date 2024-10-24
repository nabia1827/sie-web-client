import React from 'react';
import { motion } from "framer-motion";
import { Typography, Flex, Progress } from 'antd';
import Lottie from "react-lottie";
import animationData from "../../../assets/animations/bubbleAnimation.json";
const { Text } = Typography;
import { colors } from '../../../utils/colors';

const loaderContainerStyle = {
    display: 'flex',
    gap: '6px', // Espacio entre barras
};

const barStyle = {
    height: '6.0em', // h-12
    width: '1.2em', // w-2
    background: 'linear-gradient(to bottom, #5178FB, #47BAD8)',
    borderRadius: '0.5em',
    marginLeft: '0.25em',
    marginRight: '0.25em'
};
const variants = {
    initial: {
        scaleY: 0.5,
        opacity: 0,
    },
    animate: {
        scaleY: 1,
        opacity: 1,
        transition: {
            repeat: Infinity,
            repeatType: "mirror",
            duration: 1,
            ease: "circIn",
        },
    },
};

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Tamaño completo de la ventana
    },
    animation: {
        width: "20vw", // Tamaño de la animación

    },
};
const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
    }
};

function TextProcessingLoading() {
    return (
        <>
            <Flex gap={"middle"} vertical justify='center' align='center' style={{ width: "100%" }}>
                <Lottie
                    options={defaultOptions}

                    width={"15vw"}
                />

                <Progress
                    percent={50}
                    style={{ width: "17vw" }}
                    status="active"
                    strokeColor={{
                        from: colors.blue,
                        to: colors.blue,
                    }}
                />
                <Text style={{ textAlign: 'left' }}>Procesando el documento...</Text >
            </Flex>

        </>
    );
}
export default TextProcessingLoading;