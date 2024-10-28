import React,{useEffect} from "react";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { disableModalButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography;
const { TextArea } = Input;

function ModalDelAgraviado(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading } = props;

    return (
        <>
            <Modal
                style={{ width: "40vh"}}
                open={modalOpen}
                title="Guardar información"
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


                <Text>¿Estás seguro que desea guardar los cambios?</Text >

            </Modal>
        </>
    );

}

export default ModalDelAgraviado;