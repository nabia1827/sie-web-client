import React from "react";
import { Flex, Row, Col, Spin, Form, Select, Typography } from "antd";
import { colors } from "../../../../utils/colors";
import SeguimientoTable from "../../../../components/reporteLegajo/SeguimientoTable";
const { Text } = Typography;
function SeguimientoMobile(props) {
    const { dataLeg, dataAud, dataRl, loading, form, handleOnFieldsChange, listAnios, listMeses } = props;

    return (
        <>
        <Spin spinning={loading} style={{ width: "100%" }}>
            <Flex vertical justify="flex-start" align="flex-start" gap={"middle"} style={{ width: "100%", minHeight: "80vh", paddingBottom: "1em", backgroundColor: colors.white, borderRadius: "0.7em", padding: "2.0em" }}>
                <Flex justify="flex-end" align="center" style={{ width: "100%" }}>
                    <Form
                        form={form}
                        onFieldsChange={handleOnFieldsChange}
                        style={{ width: "100%" }}
                        labelWrap={false}
                        labelCol={{
                            xxl: 12,
                            xl: 12,
                            lg: 12,
                            md: 12,
                            sm: 12,
                            xs: 12,
                        }}
                        wrapperCol={{
                            xxl: 12,
                            xl: 12,
                            lg: 12,
                            md: 12,
                            sm: 12,
                            xs: 12,
                        }}
                    >
                        <Row justify={"end"} align={"middle"} style={{ width: "100%" }}>
                            <Col xs={24} sm={8} md={8} lg={6} xl={6} style={{ alignContent: "center", textAlign: "left" }}>
                                <Form.Item
                                    label={<Text className="sie-info-column-content" >Filtro de Año</Text>}
                                    name='anio'
                                    style={{ marginBottom: "0" }}
                                >
                                    <Select
                                        placeholder="Año"
                                        allowClear
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
                            </Col>
                            <Col xs={24} sm={8} md={8} lg={6} xl={6} style={{ alignContent: "center", textAlign: "left" }}>
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
                            </Col>
                        </Row>


                    </Form>
                </Flex>

                <Flex gap={"small"} vertical justify="left" align="center" style={{ width: "100%", }}>
                    
                        <Row gutter={[16, 16]} justify={"space-between"} align={"top"} style={{ width: "100%" }}>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                <SeguimientoTable data={dataLeg} unidad={"legajos"} titulo={"Legajos Asignados"}></SeguimientoTable>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                <SeguimientoTable data={dataAud} unidad={"audiencias"} titulo={"Audiencias Asistidas"} ></SeguimientoTable>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                                <SeguimientoTable data={dataRl} unidad={"documentos"} titulo={"Recursos Legales Elaborados"}></SeguimientoTable>
                            </Col>
                        </Row>
                    
                </Flex>




            </Flex>
            </Spin>

        </>
    );

}

export default SeguimientoMobile;