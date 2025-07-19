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


function DocsFilter(props) {
    const { onChangeCollapse, form, onReset, handleOnFieldsChange } = props;

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
                                        

                                        <Col xs={24} sm={16} md={8} lg={8} xl={8}>
                                            <Form.Item label={<Text> Fecha Recepcion: </Text>} name='fechaRecepcion'>
                                                <DatePicker style={{ width: "100%", height: "36px" }} />
                                            </Form.Item>

                                        </Col>
                                        
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
export default DocsFilter;