import React from "react";
import { Flex, Row, Col } from "antd";
import { colors } from "../../../../utils/colors";
import SeguimientoTable from "../../../../components/reporteLegajo/SeguimientoTable";

function SeguimientoWeb() {

    return (
        <>
            <Flex gap={"small"} vertical justify="left" align="center" style={{ width: "100%", minHeight: "76vh", paddingBottom: "1em", backgroundColor: colors.white, borderRadius: "0.7em", padding: "2.0em" }}>
                <Row gutter={[16,16]} justify={"space-between"} align={"top"} style={{ width: "100%" }}>
                    <Col xs={12} sm={24} md={24} lg={8} xl={8}>
                        <SeguimientoTable></SeguimientoTable>
                    </Col>
                    <Col xs={12} sm={24} md={24} lg={8} xl={8}>
                        <SeguimientoTable></SeguimientoTable>
                    </Col>
                    <Col xs={12} sm={24} md={24} lg={8} xl={8}>
                        <SeguimientoTable></SeguimientoTable>
                    </Col>
                </Row>
            </Flex>
        </>
    );

}

export default SeguimientoWeb;