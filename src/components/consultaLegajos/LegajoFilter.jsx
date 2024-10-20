import React, { useState } from "react";
import { Flex, Form, Typography, Layout, Menu, Breadcrumb, Button, Row, Col, Collapse, Input, Select, DatePicker, Table } from "antd";
const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Header, Footer, Sider, Content } = Layout;
import { ListTipoCaso } from "../../utils/constants";
import { colors } from "../../utils/colors";

import {
    Lightning,
    Funnel,
} from "@phosphor-icons/react";


function LegajoFilter(props) {
    const { onChangeCollapse, abogados, form, onReset, handleOnFieldsChange } = props;

    return (
        <>
            <Collapse
                onChange={onChangeCollapse}
                items={[
                    {
                        key: '1',
                        label:
                            <Flex gap={"small"} justify="flex-start" align="center">
                                <Funnel size={24} color={colors.blue} />
                                <Text className="sie-content-filter">Filtros</Text>
                            </Flex>,
                        children:
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
                                    <Row gutter={[8, 8]} justify={"start"} align={"bottom"} style={{ width: "100%" }}>
                                        <Col xs={24} sm={8} md={4} lg={4} xl={4}>
                                            <Form.Item label={<Text>Legajo: </Text>} name='codigoLegajo'>
                                                <Input placeholder="Legajo" size="large" style={{ width: "100%", height: "36px" }} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={8} md={4} lg={4} xl={4}>
                                            <Form.Item label={<Text> Tipo de caso: </Text>} name='tipoCaso'>
                                                <Select

                                                    style={{ width: "100%", height: "36px", textAlign: "left" }}
                                                    placeholder="Número de caso"
                                                    allowClear
                                                >
                                                    {
                                                        ListTipoCaso.map((t) => (
                                                            <Select.Option key={t.tipoCasoId} value={t.tipoCasoId}>
                                                                {t.tipoCasoNombre}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Form.Item>

                                        </Col>
                                        <Col xs={24} sm={8} md={4} lg={4} xl={4}>
                                            <Form.Item label={<Text> Número de caso: </Text>} name='nroCaso'>
                                                <Input placeholder="Nro Caso" size="large" style={{ width: "100%", height: "36px" }} />
                                            </Form.Item>

                                        </Col>

                                        <Col xs={24} sm={abogados == null ? 16 : 24} md={abogados == null ? 8 : 12} lg={abogados == null ? 8 : 12} xl={abogados == null ? 8 : 12}>
                                            <Form.Item label={<Text> Fecha Registro: </Text>} name='fechaRegistro'>
                                                <RangePicker style={{ width: "100%", height: "36px" }} />
                                            </Form.Item>

                                        </Col>
                                        {abogados !== null && (
                                            <Col xs={24} sm={16} md={8} lg={8} xl={8}>
                                                <Form.Item label={<Text> Abogados: </Text>} name='abogadoId'>
                                                    <Select

                                                        style={{ width: "100%", height: "36px", textAlign: "left" }}
                                                        placeholder="Abogado"
                                                        allowClear
                                                    >
                                                        {
                                                            abogados.map((a) => (
                                                                <Select.Option key={a.usuId} value={a.usuId}>
                                                                    {a.abogadoNombre}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>

                                            </Col>
                                        )

                                        }
                                        <Col xs={24} sm={8} md={4} lg={4} xl={4}>

                                            <Form.Item label=" ">
                                                <Button onClick={onReset} type="primary" style={{ backgroundColor: colors.lightBlack, width: "100%", height: "36px" }}>
                                                    Limpiar
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>

                            </>,
                        showArrow: false,
                    },
                ]}
            />
        </>
    );
}
export default LegajoFilter;