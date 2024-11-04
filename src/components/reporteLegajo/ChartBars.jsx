import React, { useRef, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { Flex, Typography } from 'antd';
import { colors } from '../../utils/colors';
const { Text } = Typography;

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartBars = (props) => {
    const { chartData } = props;
    const chartRef = useRef(null);
    const [backgroundGradient, setBackgroundGradient] = useState(null);

    const getGradient = (ctx, chartArea) => {
        const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
        gradient.addColorStop(0, 'rgba(71, 186, 216, 1)');
        gradient.addColorStop(1, 'rgba(82, 113, 255, 1)');
        return gradient;
    };

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            const { ctx, chartArea } = chart;
            if (chartArea) {
                setBackgroundGradient(getGradient(ctx, chartArea));
            }
        }
    }, [chartData]); // Re-evalúa cuando cambien los datos

    const data = {
        labels: chartData.clases || [],
        datasets: [
            {
                label: 'Posiciones',
                data: chartData.cantidades || [],
                backgroundColor: backgroundGradient,
                borderWidth: 1,
                borderRadius: 8,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y', 
        onResize: () => {
            const chart = chartRef.current;
            if (chart) {
                const { ctx, chartArea } = chart;
                if (chartArea) {
                    setBackgroundGradient(getGradient(ctx, chartArea));
                }
            }
        },
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
                    display: false,
                },
            },
        },
        barThickness: 20,
    };

    return (
        <Flex
            vertical
            gap={"small"}
            justify="flex-start"
            align="flex-start"
            style={{ borderRadius: "0.7em", backgroundColor: colors.white, height: "100%", width: "100%", padding: "1.2em" }}
        >
            <Text className="sie-report-card-title">{"Top 5 Etapas"}</Text>
            <Flex justify="center" align="center" style={{ height: "90%", width: "100%" }}>
                <Bar ref={chartRef} data={data} options={options} />
            </Flex>
        </Flex>
    );
};

export default ChartBars;
