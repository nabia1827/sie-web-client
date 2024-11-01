import React, { useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Flex,Typography } from 'antd';
import { colors } from '../../utils/colors';
const { Text } = Typography;
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartBars = () => {
    const chartRef = useRef(null);

    const getGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(71, 186, 216, 1)');
        gradient.addColorStop(1, 'rgba(82, 113, 255, 1)');

        return gradient;
    };


    const data = {
        labels: ['DP', 'INV', 'AS', 'AM', 'J'],
        datasets: [
            {
                label: 'Posiciones',
                data: [3000, 2000, 4000, 5000, 7000],
                backgroundColor: (context) => {
                    const chart = chartRef.current;
                    if (!chart) return null;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;
                    return getGradient(ctx, chartArea);
                },
                borderWidth: 1,
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
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
            
        },
        barThickness: 20
    };

    return (
        <>
            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ borderRadius: "0.7em", backgroundColor: colors.white, height: "100%", width: "100%", padding: "1.2em" }}>
                <Text className="sie-report-card-title">{"Top 5 Etapas"}</Text>
                <Flex justify="center" align="center" style={{ height: "90%", width: "100%" }}>

                <Bar ref={chartRef} data={data} options={options} />
                </Flex>
            </Flex>
        </>
    );
};

export default ChartBars;
