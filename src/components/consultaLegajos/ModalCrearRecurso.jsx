import React from "react";
import { Flex, Modal, Button, Select, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography

function ModalCrearRecurso(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading } = props;
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
                <Row gutter={[8, 16]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Text className="sie-info-column-label" >
                            Tipo Documento:
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
                                    label: 'TipoDoc 1',
                                },
                                {
                                    value: '2',
                                    label: 'TipoDoc 2',
                                }
                            ]}
                        />
                    </Col>
                    
                </Row>
            </Modal>
        </>
    );

}

export default ModalCrearRecurso;