import React from "react";
import { Flex, Typography, Progress, Row, Col, Tooltip } from "antd";
import { colors } from "../../utils/colors";

const { Text } = Typography;

function SeguimientoTable(props) {
    const { data, unidad, titulo } = props;
    return (
        <>
            <Flex vertical justify="center" align="center" style={{ width: "100%", borderRadius: "0.7em", border: `1px solid ${colors.lightGray}` }}>
                <Flex vertical gap={"small"} justify="center" align="center" style={{ width: "100%", backgroundColor: colors.background, padding: "1.0em" }}>
                    <Text className="sie-report-card-title">{titulo}</Text>
                    <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                        <Text className="sie-report-card-subtitle">Abogado</Text>
                        <Text className="sie-report-card-subtitle">Cantidad</Text>
                    </Flex>
                </Flex>
                <Flex vertical justify="center" align="center" style={{ width: "100%", padding: "1.5em", overflow: 'auto' }}>
                    {data.map((d) => (
                        <Row key={d.abogadoId} justify={"space-between"} align={"center"} style={{ width: "100%", paddingTop: "0.8em", paddingBottom: "0.8em" }}>
                            <Col xs={16} sm={16} md={16} lg={16} xl={16} style={{ textAlign: "left" }}>
                                <Text className="sie-info-column-content">{d.abogadoNombre}</Text>
                            </Col>
                            <Col xs={8} sm={8} md={8} lg={8} xl={8}>
                                <Tooltip title = {`${d.cantidad} ${unidad}`}>
                                    <Progress percent={d.proporcion} strokeColor={colors.blue} />
                                </Tooltip>
                                

                            </Col>
                        </Row>
                    ))}
                </Flex>
            </Flex>
        </>
    );

}

export default SeguimientoTable;