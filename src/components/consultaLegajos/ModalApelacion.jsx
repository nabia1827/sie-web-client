import React from "react";
import { Flex, Form, Modal, Button, Select, Row, Col, Input, Typography, DatePicker } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography
import { ListResultadoApelacion } from "../../utils/constants";
function ModalApelacion(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading, form } = props;
    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}
                title="Ver Apelación"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cerrar
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    style={{ width: "100%" }}
                    labelWrap={true}
                    labelCol={{
                        xxl: 6,
                        xl: 6,
                        lg: 6,
                        md: 6,
                        sm: 24,
                        xs: 24,
                    }}
                    wrapperCol={{
                        xxl: 18,
                        xl: 18,
                        lg: 18,
                        md: 18,
                        sm: 24,
                        xs: 24,
                    }}
                >
                    <Row gutter={[8, 16]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text className="sie-info-column-label" >Imputado</Text>}
                                name='imputado'>
                                <Input disabled style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text className="sie-info-column-label" >Delito</Text>}
                                name='delito'>
                                <Input disabled style={{ width: "100%" }} />
                            </Form.Item>

                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text className="sie-info-column-label" >Fecha Apelación</Text>}
                                name='fechaApelacion'>
                                <DatePicker disabled style={{ width: "100%" }} />
                            </Form.Item>

                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text className="sie-info-column-label" >Resultado</Text>}
                                name='resApelacionId'>
                                <Select
                                    disabled
                                    style={{ width: "100%", height: "36px" }}
                                    placeholder="Seleccione el estado..."
                                    allowClear

                                >
                                    {
                                        ListResultadoApelacion.map((r) => (
                                            <Select.Option key={r.resApelacionId} value={r.resApelacionId}>
                                                {r.resApelacionNombre}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                        </Col>

                    </Row>
                </Form>

            </Modal>
        </>
    );

}

export default ModalApelacion;