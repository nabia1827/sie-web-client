import React, { useEffect } from "react";
import { Flex, Row, Col, Button, Typography } from "antd";
import { colors } from "../../../../utils/colors";
import TimeGridAudiencia from "../../../../components/misAudiencias/TimeGridAudiencia";
import {
    RightOutlined,
    LeftOutlined,
    InfoCircleOutlined,
    DeleteOutlined,
    CloseOutlined,
    CheckOutlined,
    EditOutlined,
    FilePdfOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
const { Text } = Typography;

function MisAudienciasWeb(props) {
    const { onClickNewAudiencia,calendar } = props;
    
    return (
        <>
            <Flex vertical justify="flex-start" align="center" style={{ width: "100%", minHeight: "76vh", paddingBottom: "1em", backgroundColor: colors.white, borderRadius: "0.7em" }}>
                <Flex justify="space-between" align="center" style={{ width: "100%", padding: "1.0em 2.0em" }}>
                    <Text className="sie-content-title">Ver Todo</Text>
                    <Flex gap={"small"} justify="flex-end" align="center" >
                        <Button
                            onClick={onClickNewAudiencia}
                            type="primary"
                            icon={<PlusOutlined />}
                        >Nueva Audiencia</Button>
                        
                    </Flex>
                </Flex>
                <div style={{ width: "100%" }}>
                    <ScheduleXCalendar calendarApp={calendar} customComponents={{timeGridEvent: TimeGridAudiencia,}}/>
                </div>
            </Flex>
        </>
    );

}
//customComponents={{timeGridEvent: TimeGridAudiencia,}}
//sx__time-grid-event-inner

export default MisAudienciasWeb;