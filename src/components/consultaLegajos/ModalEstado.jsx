import React from "react";
import { Flex, Modal, Button, Select, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography

function ModalEstado(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading } = props;

    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}
                title="Cambiar Estado"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancelar
                    </Button>,
                    
                    <Button style={enableModalButtonStyle} key="submit" type="primary" loading={modalLoading} onClick={handleOk}>
                        Guardar
                    </Button>
                ]}
            >
                <Row gutter={[8, 16]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Text className="sie-info-column-label" >
                            Estado:
                        </Text>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Select
                            defaultValue="1"
                            style={{ width: "100%", height: "36px" }}
                            placeholder="Seleccione el estado..."
                            allowClear

                            options={[
                                {
                                    value: '1',
                                    label: 'Estado 1',
                                },
                                {
                                    value: '2',
                                    label: 'Estado 2',
                                }
                            ]}
                        />
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Text className="sie-info-column-label" >
                            Situación Juridica:
                        </Text>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Select
                            defaultValue="1"
                            style={{ width: "100%", height: "36px" }}
                            placeholder="Seleccione la situación..."
                            allowClear

                            options={[
                                {
                                    value: '1',
                                    label: 'Situación 1',
                                },
                                {
                                    value: '2',
                                    label: 'Situación 2',
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    );

}

export default ModalEstado;