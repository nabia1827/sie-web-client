import React, { useState } from "react";
import { Flex, Form, Typography, Layout, Menu, Breadcrumb, Button, Row, Col, Collapse, Input, Select, DatePicker, Table } from "antd";
const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Header, Footer, Sider, Content } = Layout;
//import { ListMeses } from "../../utils/constants";
import { colors } from "../../utils/colors";
import { useSelector } from "react-redux";
import {
    Lightning,
    Funnel,
} from "@phosphor-icons/react";

function ReportFilter(props) {
    const { form, handleOnFieldsChange, listMeses } = props;
    const { delitos, listAnios} = useSelector((state) => state.app);
    
    return (
        <>
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
                <Row gutter={[8,0]} justify={"center"} align={"center"} style={{ width: "100%" }}>
                    <Col xs={24} sm={8} md={8} lg={6} xl={6} style={{ alignContent: "center", textAlign: "left" }}>
                        <Form.Item
                            label={<Text className="sie-info-column-content" >Filtro de Año</Text>}
                            name='anio'
                            style={{ marginBottom:"0" }}
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
                    </Col>

                    <Col xs={24} sm={8} md={8} lg={6} xl={6} style={{ alignContent: "center", textAlign: "left" }}>
                        <Form.Item
                            label={<Text className="sie-info-column-content" >Filtro de Mes</Text>}
                            name='mes'
                            style={{ marginBottom:"0" }}
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
                    <Col xs={12} sm={8} md={8} lg={12} xl={12} style={{ alignContent: "center", textAlign: "left" }}>
                        <Form.Item 
                        label={<Text className="sie-info-column-content" >Filtro de Delito</Text>} 
                        name='delitoId'
                        style={{ marginBottom:"0" }}
                        >
                            <Select
                                allowClear
                                placeholder="Delito"
                                style={{ width: "100%", textAlign: "left" }}
                            >
                                {
                                    delitos.map((d) => (
                                        <Select.Option key={d.delitoId} value={d.delitoId}>
                                            {d.delitoNombre}
                                        </Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    );
}
export default ReportFilter;