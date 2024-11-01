import React from "react";
import { Flex, Row, Col, Select, Typography } from "antd";
import { colors } from "../../../../utils/colors";
import { FileText, ChartLine, UsersFour, MapPin } from "@phosphor-icons/react";
import ReportCard from "../../../../components/reporteLegajo/ReportCard";
const { Text } = Typography;
import ChartBars from "../../../../components/reporteLegajo/ChartBars";
import ChartLines from "../../../../components/reporteLegajo/ChartLine";
import ChartPie from "../../../../components/reporteLegajo/ChartPie";
import ChartStackedBars from "../../../../components/reporteLegajo/ChartStackedBars";
import ChartMap from "../../../../components/reporteLegajo/ChartMap";

function ReporteGeneralWeb() {

    return (
        <>
            <Flex vertical justify="flex-start" align="center" style={{ width: "100%", minHeight: "76vh", borderRadius: "0.7em" }}>
                <Row gutter={[16, 16]} justify={"center"} align={"flex-start"} style={{ width: "100%", minHeight: "12vh" }}>
                    <Col xs={12} sm={24} md={24} lg={8} xl={5}>
                        <ReportCard IconComponent={ChartLine} subtitle="CARPETA FISCAL" title={"Cantidad"} copyable={false}></ReportCard>
                    </Col>
                    <Col xs={12} sm={24} md={24} lg={8} xl={5}>
                        <ReportCard IconComponent={UsersFour} subtitle="CARPETA FISCAL" title={"Cantidad"} copyable={false}></ReportCard>
                    </Col>
                    <Col xs={12} sm={24} md={24} lg={8} xl={5}>
                        <ReportCard IconComponent={MapPin} subtitle="CARPETA FISCAL" title={"Cantidad"} copyable={false}></ReportCard>
                    </Col>
                    <Col xs={12} sm={8} md={8} lg={8} xl={3} style={{ alignContent: "center", textAlign: "left" }}>
                        <Text className="sie-info-column-content" >Filtro de Mes</Text>
                        <Select placeholder="Mes" style={{ width: "100%", textAlign: "left" }}></Select>
                    </Col>
                    <Col xs={12} sm={8} md={8} lg={8} xl={3} style={{ alignContent: "center", textAlign: "left" }}>
                        <Text className="sie-info-column-content" >Filtro de Año</Text>
                        <Select placeholder="Año" style={{ width: "100%", textAlign: "left" }}></Select>
                    </Col>
                    <Col xs={12} sm={8} md={8} lg={8} xl={3} style={{ alignContent: "center", textAlign: "left" }}>
                        <Text className="sie-info-column-content" >Filtro de Delito</Text>
                        <Select placeholder="Delito" style={{ width: "100%", textAlign: "left" }}></Select>
                    </Col>

                </Row>
                <Row justify={"center"} align={"flex-start"} style={{ width: "100%", height: "67vh", padding: "0px 8px" }}>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} style={{ height: "100%" }}>
                        <div style={{ height: "50%", width: "100%", paddingBottom: "0.5em", paddingRight: "1.0em", paddingTop: "1.0em" }}>
                            
                            <ChartLines></ChartLines>
                        </div>
                        <div style={{ paddingTop: "0.5em", paddingRight: "1.0em", height: "50%", width: "100%" }}>
                            <ChartStackedBars></ChartStackedBars>
                        </div>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={12} style={{ height: "100%" }}>
                        <Row justify={"center"} align={"flex-start"} style={{ width: "100%", height: "100%" }}>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ borderRadius: "0.7em", height: "100%" }}>
                                <div style={{ paddingBottom: "0.5em", paddingRight: "1.0em", height: "50%", width: "100%", paddingTop: "1.0em" }}>
                                    <ChartPie></ChartPie>
                                </div>
                                <div style={{ paddingTop: "0.5em", paddingRight: "1.0em", height: "50%", width: "100%" }}>
                                    <ChartBars></ChartBars>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ height: "100%", paddingTop: "1.0em" }}>
                                <ChartMap></ChartMap>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Flex>

        </>
    );

}

export default ReporteGeneralWeb;