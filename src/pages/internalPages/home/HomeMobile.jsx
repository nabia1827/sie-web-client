import React from "react";
import { Flex, Row, Col,Card, Calendar, Typography, Table, ConfigProvider, Spin, Space } from "antd";
import { colors } from "../../../utils/colors";
import {
    CalendarBlank,
    PresentationChart
} from "@phosphor-icons/react";
const { Text } = Typography;
import { ColumnsAnclados } from "../../../utils/home/columnsAnclados";
import imgHome from "../../../assets/images/illustrationHome.svg"
import esES from "antd/locale/es_ES"; // Importar la localización en español
import dayjs from "dayjs";
import "dayjs/locale/es"; // Importar el locale de dayjs en español
import CardAnclado from "../../../components/home/CardAnclado";

dayjs.locale("es"); // Establecer dayjs en español


function HomeMobile(props){
    const { anclados, audiencias, metricas, onAncladosChange, loading,onClickLegajo,
        currentPage, onDateChange, onClickVerTodo, onPinClick } = props;

    const columns = ColumnsAnclados(onPinClick,onClickLegajo);

    console.log("anclados: ", anclados)


    return (
        <>
            <Spin spinning={loading}>
                <Flex justify="center" align="center" style={{ width: "100%", minHeight: "78vh" }}>
                    <Row  justify={"center"} align={"center"} style={{ width: "100%", }}>
                        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                            <Flex vertical gap={"small"} justify="center" align="center" style={{ width: "100%", marginBottom:"10px"}}>
                                <Flex gap={"small"} justify="flex-end" align="flex-end" style={{ width: "100%", backgroundColor: colors.white, borderRadius: "7px", padding: "16px" }}>
                                    <Flex vertical justify="flex-end" align="flex-start" style={{ width: "100%" }}>
                                        <Flex vertical justify="flex-start" align="flex-start" style={{ width: "100%", padding: "14px",backgroundColor: colors.background,borderRadius: "7px", marginBottom:"10px"}}>
                                            <Text className="home-stats-section">{metricas[0] ? metricas[0].nombreMedida : ""}</Text>
                                            <Text className="home-stats">{metricas[0] ? metricas[0].cantidad : 0}</Text>
                                        </Flex>
                                        
                                        <Flex vertical justify="flex-start" align="flex-start" style={{ width: "100%",padding: "14px",backgroundColor: colors.background,borderRadius: "7px", marginBottom:"10px"}}>
                                            <Text className="home-stats-section">{metricas[1] ? metricas[1].nombreMedida : ""}</Text>
                                            <Text className="home-stats">{metricas[1] ? metricas[1].cantidad : 0}</Text>
                                        </Flex>
                                        <Flex vertical justify="flex-start" align="flex-start" style={{ width: "100%",padding: "14px",backgroundColor: colors.background,borderRadius: "7px", }}>
                                            <Text className="home-stats-section">{metricas[2] ? metricas[2].nombreMedida : ""}</Text>
                                            <Text className="home-stats">{metricas[2] ? metricas[2].cantidad : 0}</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", height: "calc(100% - 240px)", backgroundColor: "white", borderRadius: "7px", padding: "16px" }}>
                                    <Text className="home-title-section">Legajos Anclados</Text>
                                    {anclados.map((record) => (
                                        <CardAnclado
                                            key={record.legajoId}
                                            onPinClick= {onPinClick}
                                            onClickLegajo= {onClickLegajo}
                                            record = {record}
                                        />
                                    ))}

                                    
                                </Flex>
                            </Flex>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8} >
                            <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", height: "78vh", backgroundColor: "white", borderRadius: "7px", padding: "16px"}}>

                                <ConfigProvider locale={esES}>
                                    <Calendar fullscreen={false} onChange={onDateChange} />
                                </ConfigProvider>

                                {audiencias.length > 0 && (
                                    <>
                                        <Text style={{ color: colors.blue }} onClick={onClickVerTodo}>Ir a mi calendario</Text>
                                        <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", overflow: 'auto' }}>
                                            {
                                                audiencias?.map((a) => (
                                                    <Flex gap={"small"} align="center" justify="flex-start" style={{ width: "100%", backgroundColor: colors.lightGray, padding: "8px", borderRadius: "7px" }}>
                                                        <Flex vertical justify="center" align="center" style={{ borderRadius: "50px", width: "35px", height: "35px", backgroundColor: colors.lightBlack }}>
                                                            <CalendarBlank size={20} color="white" />
                                                        </Flex>
                                                        <Flex vertical justify="flex-start" align="flex-start" style={{ width: 'calc(100% - 35px)' }}>
                                                            <Text className="home-aud-title">{a.audienciaTitle}</Text>
                                                            <Text className="home-aud-subtitle">{a.audienciaLegajo} | {a.audienciaHora}</Text>
                                                        </Flex>

                                                    </Flex>
                                                ))
                                            }
                                        </Flex>
                                    </>

                                )

                                }


                            </Flex>
                        </Col>
                    </Row>
                </Flex>
            </Spin>

        </>
    );

}

export default HomeMobile;