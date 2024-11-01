import React from "react";
import { Flex, Typography, Progress, Row, Col } from "antd";
import { colors } from "../../utils/colors";
const { Text } = Typography;
// Definimos la data
const data = [
    { name: "Nabia Pachas Lopez", progress: 30 },
    { name: "Kevin Ortiz Abanto", progress: 30 },
    { name: "Mauro Retuerto Santillan", progress: 30 },
    { name: "Nabia Pachas Lopez", progress: 30 },
    { name: "Kevin Ortiz Abanto", progress: 30 },
    { name: "Mauro Retuerto Santillan", progress: 30 },
    // Agrega más elementos si es necesario
];

function SeguimientoTable() {

    return (
        <>
            <Flex vertical justify="center" align="center" style={{ width: "100%", borderRadius: "0.7em", border: `1px solid ${colors.lightGray}` }}>
                <Flex vertical justify="center" align="center" style={{ width: "100%", backgroundColor: colors.background, padding: "1.0em" }}>
                    <Text className="sie-report-card-title">Legajos Asignados</Text>
                    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                        <Text className="sie-report-card-subtitle">Abogado</Text>
                        <Text className="sie-report-card-subtitle">Cantidad</Text>
                    </Flex>
                </Flex>
                <Flex vertical justify="center" align="center" style={{ width: "100%", padding: "1.0em" }}>
                    {data.map((item, index) => (
                        <Row key={index} justify={"space-between"} align={"center"} style={{ width: "100%",paddingTop:"0.8em",paddingBottom:"0.8em" }}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16} style={{ textAlign: "left" }}>
                                <Text className="sie-info-column-content">{item.name}</Text>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Progress percent={item.progress} strokeColor={colors.blue} />
                            </Col>
                        </Row>
                    ))}
                </Flex>
            </Flex>
        </>
    );

}

export default SeguimientoTable;