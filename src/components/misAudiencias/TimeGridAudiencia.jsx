import React from "react";
import { FileTextOutlined, } from '@ant-design/icons';
import { Flex, Typography } from "antd";
import dayjs from 'dayjs';
const { Text } = Typography;
import { colors } from "../../utils/colors";
function TimeGridAudiencia(props) {
    const { calendarEvent } = props;

    const formatTimeRange = (start, end) => {
        const startTime = dayjs(start).format('HH:mm'); // Formatea solo la hora de inicio
        const endTime = dayjs(end).format('HH:mm');     // Formatea solo la hora de fin
        return `${startTime}-${endTime}`;
    };

    return (
        <div
            style={{
                width: "100%",
                height: '100%',
                background: calendarEvent.color,
                color: 'white',
                padding: 10,
                borderRadius: 5,
                border: '1px solid white',
            }}
        >
            <Flex
                vertical
                justify="flex-start"
                align="flex-start"
                style={{ width: "100%", height: "80%" }}
            >
                <Text className="sie-event-title-personal-schedule" >{calendarEvent.title}</Text>
                <Text className="sie-event-subtitle-personal-schedule" >{formatTimeRange(calendarEvent.start, calendarEvent.end)}</Text>
                <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                    <FileTextOutlined />
                    <Text className="sie-event-subtitle-personal-schedule" >{calendarEvent.description}</Text>
                </Flex>



            </Flex>
        </div>
    );

}

export default TimeGridAudiencia;