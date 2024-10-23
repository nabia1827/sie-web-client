import React from "react";
import { Flex, Form, Modal, Button, Select, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography

function ModalCrearRecurso(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading, form } = props;
    const { clasesDocSalida } = useSelector((state) => state.app);
    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}
                title="Crear Recurso"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancelar
                    </Button>,

                    <Button style={enableModalButtonStyle} key="submit" type="primary" loading={modalLoading} onClick={handleOk}>
                        Crear
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    style={{ width: "100%" }}
                    labelWrap={true}
                    labelCol={{
                        xxl: 7,
                        xl: 7,
                        lg: 7,
                        md: 7,
                        sm: 24,
                        xs: 24,
                    }}
                    wrapperCol={{
                        xxl: 17,
                        xl: 17,
                        lg: 17,
                        md: 17,
                        sm: 24,
                        xs: 24,
                    }}
                >
                    <Row gutter={[8, 16]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                label={<Text className="sie-info-column-label" >Tipo Documento</Text>}
                                style={{ width: "100%" }}
                                name='claseDocId'
                            >
                                <Select

                                    style={{ width: "100%", height: "36px" }}
                                    placeholder="Seleccione el estado..."
                                    allowClear
                                >
                                    {
                                        clasesDocSalida.map((c) => (
                                            <Select.Option key={c.claseDocId} value={c.claseDocId}>
                                                {c.nombre}
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

export default ModalCrearRecurso;