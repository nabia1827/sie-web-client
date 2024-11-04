import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Flex, Typography } from 'antd';
import { colors } from '../../utils/colors';
const { Text } = Typography;

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartStackedBars = (props) => {
    const {chartData} = props;


    const data = {
        labels: chartData.nombresMeses,
        datasets: [
            {
                label: chartData.categorias[0],
                data: chartData.cantCategoria1,
                backgroundColor: 'rgba(132, 217, 253, 1)',
                borderRadius: 8,
            },
            {
                label: chartData.categorias[1],
                data: chartData.cantCategoria2,
                backgroundColor: 'rgba(82, 113, 255, 1)',
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,

            },
        },
        scales: {
            x: {
                stacked: true, // Activa el apilado en el eje x
                grid: {
                    display: false, // Oculta las líneas verticales del grid
                },
            },
            y: {
                stacked: true, // Activa el apilado en el eje y
            },

        },
        barThickness: 20
    };

    return (
        <>
            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ borderRadius: "0.7em", backgroundColor: colors.white, height: "100%", width: "100%", padding: "1.2em" }}>
                <Text className="sie-report-card-title">{"Evolución mensual de Audiencias"}</Text>
                <Flex justify="center" align="center" style={{ height: "90%", width: "100%" }}>

                <Bar data={data} options={options} />
                </Flex>
            </Flex>

        </>
    );
};

export default ChartStackedBars;
