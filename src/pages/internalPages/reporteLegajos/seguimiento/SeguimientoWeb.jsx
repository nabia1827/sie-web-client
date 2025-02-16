import React from "react";
import { Flex, Row, Col, Spin, Form } from "antd";
import { colors } from "../../../../utils/colors";
import SeguimientoTable from "../../../../components/reporteLegajo/SeguimientoTable";

function SeguimientoWeb(props) {
    const { dataLeg, dataAud, dataRl, loading, form, handleOnFieldsChange,listAnios,listMeses } = props;

    return (
        <>
            <Flex vertical justify="flex-start" align="flex-start" gap={"small"} style={{ width: "100%", minHeight: "76vh", paddingBottom: "1em", backgroundColor: colors.white, borderRadius: "0.7em", padding: "2.0em" }}>
                <Flex justify="flex-end" align="center" style={{ width: "100%" }}>
                    <Form
                        form={form}
                        onFieldsChange={handleOnFieldsChange}
                        style={{ width: "100%" }}
                        labelWrap={false}
                        labelCol={{
                            xxl: 24,
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }}
                        wrapperCol={{
                            xxl: 24,
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }}
                    >
                        <Form.Item
                            label={<Text className="sie-info-column-content" >Filtro de Año</Text>}
                            name='anio'
                            style={{ marginBottom: "0" }}
                        >
                            <Select
                                placeholder="Año"
                                style={{ width: "100%", textAlign: "left" }}

                            >
                                {
                                    listAnios.map((d) => (
                                        <Select.Option key={d.anioId} value={d.anioId}>
                                            {d.anioDescripcion}
                                        </Select.Option>
                                    ))
                                }
                            </Select>

                        </Form.Item>
                        <Form.Item
                            label={<Text className="sie-info-column-content" >Filtro de Mes</Text>}
                            name='mes'
                            style={{ marginBottom: "0" }}
                        >
                            <Select
                                placeholder="Mes"
                                style={{ width: "100%", textAlign: "left" }}
                                allowClear
                            >
                                {
                                    listMeses.map((d) => (
                                        <Select.Option key={d.mesId} value={d.mesId}>
                                            {d.mesDescripcion}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Form>
                </Flex>
                <Spin spinning={loading} style={{ minHeight: "50vh" }}>
                    <Flex gap={"small"} vertical justify="left" align="center" style={{ width: "100%", }}>
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
            </Flex>


        </>
    );

}

export default SeguimientoWeb;