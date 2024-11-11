import React,{useEffect} from "react";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { disableModalButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography;
const { TextArea } = Input;

function ModalBorrarAudiencia(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading } = props;

    return (
        <>
            <Modal
                style={{ width: "40vh"}}
                open={modalOpen}
                title="Eliminar Audiencia"
                onOk={handleOk}

                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancelar
                    </Button>,

                    <Button style={disableModalButtonStyle} key="submit" type="primary" loading={modalLoading} onClick={handleOk}>
                        Eliminar
                    </Button>
                ]}
            >
                <Text>¿Estás seguro que deseas eliminar la audiencia?</Text >
            </Modal>
        </>
    );

}

export default ModalBorrarAudiencia;