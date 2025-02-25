import React from "react";
import { Flex, Row, Col, Calendar, Typography, Table } from "antd";
import { colors } from "../../../utils/colors";
import {
    CalendarBlank,
    PresentationChart
} from "@phosphor-icons/react";
const { Text } = Typography;
import { ColumnsAnclados } from "../../../utils/home/columnsAnclados";
import imgHome from "../../../assets/images/illustrationHome.svg"

function HomeWeb() {

    const dataAud = [
        {
            audienciaTitle: "Audiencia XXX",
            audienciaLegajo: "LP0000001",
            audienciaHora: "4pm"
        }
    ]

    const dataLeg = [
        {
            legajoCodigo: "LP000001",
            tipoCaso: "Carpeta Fiscal",
            nroCaso: "00035",
            lugar: "Cajamarca",
            distritoJudicial: "Cajamarca",
            situacionJuridica: "Inv. Preparatoria",
        },
        {
            legajoCodigo: "LP000001",
            tipoCaso: "Carpeta Fiscal",
            nroCaso: "00035",
            lugar: "Cajamarca",
            distritoJudicial: "Cajamarca",
            situacionJuridica: "Inv. Preparatoria",
        },
        {
            legajoCodigo: "LP000001",
            tipoCaso: "Carpeta Fiscal",
            nroCaso: "00035",
            lugar: "Cajamarca",
            distritoJudicial: "Cajamarca",
            situacionJuridica: "Inv. Preparatoria",
        }
    ]

    const columns = ColumnsAnclados();
    const onChange = () => {

    }

    return (
        <>
            <Flex justify="center" align="center" style={{ width: "100%", minHeight: "78vh" }}>
                <Row gutter={[8, 0]} justify={"center"} align={"center"} style={{ width: "100%", }}>
                    <Col xs={24} sm={24} md={24} lg={16} xl={16}>
                        <Flex vertical gap={"small"} justify="center" align="center" style={{ width: "100%", height: "78vh" }}>
                            <Flex gap={"small"} justify="flex-end" align="flex-end" style={{ width: "100%", height: "260px", backgroundColor: colors.lightBlue, borderRadius: "7px" }}>
                                <Flex vertical justify="flex-end" align="flex-start" style={{ width: "50%", padding: "16px" }}>

                                    <Flex vertical justify="flex-start" align="flex-start" style={{paddingLeft:"14px"}}>
                                        <PresentationChart size={32} color={colors.blue}/>
                                    </Flex>
                                    <Flex vertical justify="flex-start" align="flex-start" style={{ padding: "14px" }}>

                                        <Text className="home-stats-section">Nuevos Legajos Hoy</Text>
                                        <Text className="home-stats">40</Text>
                                    </Flex>
                                    <Flex gap={"small"} justify="flex-start" align="flex-start">
                                        <Flex vertical align="flex-start" justify="flex-start" style={{ width: "200px", backgroundColor: "#CED8FF", padding: "14px", borderRadius: "7px" }}>
                                            <Text className="home-stats-section">Legajos Asignados</Text>
                                            <Text className="home-stats">40</Text>
                                        </Flex>
                                        <Flex vertical align="flex-start" justify="flex-start" style={{ width: "200px", backgroundColor: "#CED8FF", padding: "14px", borderRadius: "7px" }}>
                                            <Text className="home-stats-section">Audiencias Asignadas</Text>
                                            <Text className="home-stats">40</Text>
                                        </Flex>
                                    </Flex>
                                </Flex>
                                <Flex justify="center" align="flex-end" style={{ width: "50%" }}>
                                    <img src={imgHome} alt="Imagen Crear Documento Salida" style={{ maxWidth: '85%', maxHeight: 'auto' }} />
                                </Flex>
                            </Flex>
                            <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", height: "39vh", backgroundColor: "white", borderRadius: "7px", padding: "16px" }}>
                                <Text className="home-title-section">Legajos Anclados</Text>
                                <Table
                                    style={{ width: "100%" }}
                                    loading={false}
                                    rowKey="legajoId"
                                    columns={columns}
                                    dataSource={dataLeg}
                                    pagination={{
                                        onChange,
                                        total: 8,
                                        pageSize: 4,
                                        current: 1,
                                        showTotal: (total) => `Hay ${total} registros`,
                                    }}
                                    size="small"

                                />
                            </Flex>
                        </Flex>

                    </Col>
                    <Col xs={24} sm={24} md={24} lg={8} xl={8} >
                        <Flex vertical justify="flex-start" align="flex-start" style={{ width: "100%", height: "78vh", backgroundColor: "white", borderRadius: "7px", padding: "16px" }}>
                            <Text className="home-title-section">Calendario de Audiencias</Text>
                            <Calendar fullscreen={false} />
                            {
                                dataAud.map((a) => (
                                    <Flex gap={"small"} align="center" justify="flex-start" style={{ width: "100%", backgroundColor: colors.lightCian, padding: "8px", borderRadius: "7px" }}>
                                        <div style={{ borderRadius: "50px", width: "35px", height: "35px", backgroundColor: colors.cian, alignContent: "center", justifyContent: "center" }}>
                                            <CalendarBlank size={20} color="white" />
                                        </div>
                                        <Flex vertical justify="flex-start" align="flex-start">
                                            <Text className="home-aud-title">{a.audienciaTitle}</Text>
                                            <Text className="home-aud-subtitle">{a.audienciaLegajo} | {a.audienciaHora}</Text>
                                        </Flex>

                                    </Flex>
                                ))
                            }

                        </Flex>
                    </Col>
                </Row>
            </Flex>
        </>
    );

}

export default HomeWeb;