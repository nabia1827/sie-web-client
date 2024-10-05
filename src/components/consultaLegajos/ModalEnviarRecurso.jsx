import React from "react";
import { Flex, Modal, Button, Select, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography

function ModalEnviarRecurso(props) {
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
                        Enviar
                    </Button>
                ]}
            >
                <Text className="sie-info-column-content" >
                Usted ha seleccionado en documento Escrito N°2 perteneciente al legajo 2024001408.¿Está seguro que desea enviarlo?
                </Text>
            </Modal>
        </>
    );

}

export default ModalEnviarRecurso;