import React from "react";
import { Flex, Modal, Button, Select, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography;
const { TextArea } = Input;

function ModalEditarObs(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading } = props;
    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}
                title="Editar Observaciones"
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
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <Text className="sie-info-column-label" >
                            Observaciones:
                        </Text>
                    </Col>
                    <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                        <TextArea rows={4} maxLength={6} placeholder="Escribe..." />
                    </Col>

                </Row>
            </Modal>
        </>
    );

}

export default ModalEditarObs;