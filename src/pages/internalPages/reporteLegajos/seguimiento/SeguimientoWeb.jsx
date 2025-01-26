import React from "react";
import { Flex, Row, Col, Spin } from "antd";
import { colors } from "../../../../utils/colors";
import SeguimientoTable from "../../../../components/reporteLegajo/SeguimientoTable";

function SeguimientoWeb(props) {
    const { dataLeg, dataAud, dataRl,loading } = props;

    return (
        <>
            <Spin spinning = {loading} style={{minHeight:"50vh"}}>
                <Flex gap={"small"} vertical justify="left" align="center" style={{ width: "100%", minHeight: "76vh", paddingBottom: "1em", backgroundColor: colors.white, borderRadius: "0.7em", padding: "2.0em" }}>
                    <Row gutter={[16, 16]} justify={"space-between"} align={"top"} style={{ width: "100%" }}>
                        <Col xs={12} sm={24} md={24} lg={8} xl={8}>
                            <SeguimientoTable data={dataLeg} unidad={"legajos"} titulo={"Legajos Asignados"}></SeguimientoTable>
                        </Col>
                        <Col xs={12} sm={24} md={24} lg={8} xl={8}>
                            <SeguimientoTable data={dataAud} unidad={"audiencias"} titulo={"Audiencias Asistidas"} ></SeguimientoTable>
                        </Col>
                        <Col xs={12} sm={24} md={24} lg={8} xl={8}>
                            <SeguimientoTable data={dataRl} unidad={"documentos"} titulo={"Recursos Legales Elaborados"}></SeguimientoTable>
                        </Col>
                    </Row>
                </Flex>
            </Spin>

        </>
    );

}

export default SeguimientoWeb;