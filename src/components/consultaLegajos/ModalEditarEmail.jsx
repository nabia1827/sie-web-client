import React, { useEffect, useState } from "react";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography, Switch } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
import { UpdateUserEmail } from "../../utils/user/dinamicCalls";
import {
    PlusOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography
const { TextArea } = Input;

function ModalEditarEmail(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading, form } = props;
    


    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}
                title={<Text className="sie-info-column-content" >Editar Email</Text>}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    form={form}
                    onFinish={handleOk}
                    style={{ width: "100%" }}
                    labelWrap={true}
                    labelCol={{
                        xxl: 6,
                        xl: 6,
                        lg: 6,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }}
                    wrapperCol={{
                        xxl: 18,
                        xl: 18,
                        lg: 18,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }}
                >
                    <Row gutter={[4, 16]} align={"middle"} justify={"flex-end"} style={{ width: "100%", padding: "1.0em" }}>
                
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item

                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-content" >Correo</Text>}
                                name='usuEmail'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Obligatorio',
                                    },
                                    {
                                        type: 'email',
                                        message: "No es un email válido",
                                    },
                                ]}
                            >
                                <Input placeholder="Correo...">
                                </Input>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Flex gap={"small"} justify="flex-end" align="center" style={{width:"100%"}}>
                                <Button key="back" onClick={handleCancel}>
                                    Cancelar
                                </Button>
                                <Form.Item style={{marginBottom:"0"}}>
                                    <Button loading={modalLoading} style={enableModalButtonStyle} htmlType="submit" key="submit" type="primary" >
                                        Confirmar
                                    </Button>
                                </Form.Item>
                            </Flex>
                        </Col>

                    </Row>
                </Form>
            </Modal>
        </>
    );

}

export default ModalEditarEmail;