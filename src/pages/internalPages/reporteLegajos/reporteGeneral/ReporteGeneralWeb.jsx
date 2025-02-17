import React from "react";
import { Flex, Row, Col, Select, Typography, Spin } from "antd";
import { colors } from "../../../../utils/colors";
import { FileText, ChartLine, UsersFour, MapPin } from "@phosphor-icons/react";
import ReportCard from "../../../../components/reporteLegajo/ReportCard";
const { Text } = Typography;
import ChartBars from "../../../../components/reporteLegajo/ChartBars";
import ChartLines from "../../../../components/reporteLegajo/ChartLine";
import ChartPie from "../../../../components/reporteLegajo/ChartPie";
import ChartStackedBars from "../../../../components/reporteLegajo/ChartStackedBars";
import ChartMap from "../../../../components/reporteLegajo/ChartMap";
import ReportFilter from "../../../../components/reporteLegajo/ReportFilter";

function ReporteGeneralWeb(props) {
    const { form, handleOnFieldsChange,
        dataLineChart, dataStackedChart, dataPieChart, dataBarChart, dataMapChart,
        dataLegajoCard, dataAudienciaCard, dataLugarCard,loading, listMeses
    } = props;

    return (
        <>
        <Spin spinning={loading} style={{minHeight:"40vh"}}>
        {dataLineChart && dataStackedChart && dataPieChart && dataBarChart
                && dataMapChart && dataLegajoCard && dataAudienciaCard && dataLugarCard && (
                    <Flex vertical justify="flex-start" align="center" style={{ width: "100%", minHeight: "76vh", borderRadius: "0.7em" }}>
                        <Row gutter={[16, 16]} justify={"center"} align={"flex-start"} style={{ width: "100%", minHeight: "12vh" }}>
                            <Col xs={12} sm={24} md={24} lg={8} xl={5}>
                                <ReportCard IconComponent={ChartLine} subtitle="TOTAL LEGAJOS" title={dataLegajoCard.cantidad} copyable={false}></ReportCard>
                            </Col>
                            <Col xs={12} sm={24} md={24} lg={8} xl={5}>
                                <ReportCard IconComponent={UsersFour} subtitle="CANTIDAD AUDIENCIAS" title={dataAudienciaCard.cantidad} copyable={false}></ReportCard>
                            </Col>
                            <Col xs={12} sm={24} md={24} lg={8} xl={5}>
                                <ReportCard IconComponent={MapPin} subtitle="REGION CON MAS CASOS" title={dataLugarCard.descripcion} copyable={false}></ReportCard>
                            </Col>
                            <Col xs={12} sm={24} md={24} lg={24} xl={9}>
                                <ReportFilter form={form} handleOnFieldsChange={handleOnFieldsChange} listMeses={listMeses}></ReportFilter>
                            </Col>

                        </Row>
                        <Row justify={"center"} align={"flex-start"} style={{ width: "100%", height: "67vh", padding: "0px 8px" }}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12} style={{ height: "100%" }}>
                                <div style={{ height: "50%", width: "100%", paddingBottom: "0.5em", paddingRight: "1.0em", paddingTop: "1.0em" }}>
                                    <ChartLines chartData={dataLineChart}></ChartLines>
                                </div>
                                <div style={{ paddingTop: "0.5em", paddingRight: "1.0em", height: "50%", width: "100%" }}>
                                    <ChartStackedBars chartData={dataStackedChart}></ChartStackedBars>
                                </div>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12} style={{ height: "100%" }}>
                                <Row justify={"center"} align={"flex-start"} style={{ width: "100%", height: "100%" }}>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ borderRadius: "0.7em", height: "100%" }}>
                                        <div style={{ paddingBottom: "0.5em", paddingRight: "1.0em", height: "50%", width: "100%", paddingTop: "1.0em" }}>
                                            <ChartPie chartData={dataPieChart}></ChartPie>
                                        </div>
                                        <div style={{ paddingTop: "0.5em", paddingRight: "1.0em", height: "50%", width: "100%" }}>
                                            <ChartBars chartData={dataBarChart}></ChartBars>
                                        </div>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{ height: "100%", paddingTop: "1.0em" }}>
                                        <ChartMap chartData={dataMapChart}></ChartMap>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Flex>
                )
            }
        </Spin>
            

        </>
    );

}

export default ReporteGeneralWeb;