import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Flex, Typography } from 'antd';
import { colors } from '../../utils/colors';
const { Text } = Typography;
ChartJS.register(ArcElement, Tooltip, Legend);

const ChartPie = () => {
    const data = {
        labels: ['Almacenado', 'Entregado'],
        datasets: [
            {
                label: 'Cantidad',
                data: [3000, 5000],
                backgroundColor: [
                    'rgba(132, 217, 253, 1)',
                    'rgba(82, 113, 255, 1)',
                ],
                borderColor: [
                    'rgba(132, 217, 253, 1)',
                    'rgba(82, 113, 255, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'left',
            },
            title: {
                display: false,

            },
        },
        cutout: '70%', // Controla el tamaño del hueco central
    };

    return (
        <>
            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ borderRadius: "0.7em", backgroundColor: colors.white, height: "100%", width: "100%", padding: "1.2em" }}>
                <Text className="sie-report-card-title">{"Estado de los Legajos"}</Text>
                <Flex justify="center" align="center" style={{ height: "90%", width: "100%" }}>

                    <Doughnut data={data} options={options} />
                </Flex>
            </Flex>

        </>
    );
};

export default ChartPie;
