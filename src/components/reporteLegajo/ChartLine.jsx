import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Flex, Typography } from 'antd';
import { colors } from '../../utils/colors';
const { Text } = Typography;
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const ChartLines = () => {
    const data = {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
        datasets: [
            {
                label: 'M2',
                data: [150, 200, 300, 500, 700, 900, 500, 700, 900, 500, 700, 900], // Valores de crecimiento de usuarios por mes
                borderColor: 'rgba(82, 113, 255, 1)',
                backgroundColor: 'rgba(82, 113, 255, 1)',

                tension: 0.4, // Suaviza las líneas
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,

            },
        },
        scales: {
            x: {

                grid: {
                    display: false, // Oculta las líneas verticales del grid
                },
            },
            y: {

                beginAtZero: true, // Inicia el eje Y desde cero
            },
        },
    };

    return (
        <>

            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ borderRadius: "0.7em", backgroundColor: colors.white, height: "100%", width: "100%", padding: "1.2em" }}>
                <Text className="sie-report-card-title">{"Evolución Mensual de Legajos"}</Text>
                <Flex justify="center" align="center" style={{ height: "90%", width: "100%" }}>

                    <Line data={data} options={options} />
                </Flex>
            </Flex>
        </>
    );
};

export default ChartLines;
