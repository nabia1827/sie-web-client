import React from "react";
import { Flex, Modal, Button, Select, Row, Col, Input, Typography, DatePicker } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography

function ModalApelacion(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading } = props;
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
                <Row gutter={[8, 16]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Text className="sie-info-column-label" >
                            Imputado:
                        </Text>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Input style={{ width: "100%" }} />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Text className="sie-info-column-label" >
                            Delito:
                        </Text>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <Input style={{ width: "100%" }} />
                    </Col>

                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Text className="sie-info-column-label" >
                            Fecha Apelación:
                        </Text>
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18}>
                        <DatePicker style={{ width: "100%" }} />
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Text className="sie-info-column-label" >
                            Resultado:
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
                                    label: 'Sentencia Ratificada',
                                },
                                {
                                    value: '2',
                                    label: 'Sentencia Anulada',
                                }
                            ]}
                        />
                    </Col>
                </Row>
            </Modal>
        </>
    );

}

export default ModalApelacion;