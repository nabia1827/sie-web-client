import React, { useEffect } from "react";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography;
const { TextArea } = Input;

function ModalEditarObs(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading, currentAudiencia, form } = props;
    useEffect(() => {
        if (currentAudiencia) {
            form.setFieldsValue({
                observacion: currentAudiencia.observacion,

            });
        }
    }, [currentAudiencia, form]);

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
                <Form
                    form={form}
                    style={{ width: "100%" }}
                    labelWrap={false}
                    labelCol={{
                        xxl: 24,
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }}
                    wrapperCol={{
                        xxl: 24,
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }}
                >
                    <Row gutter={[8, 16]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}

                                name='observacion'>
                                <TextArea style={{ color: "black" }} rows={4} maxLength={500} placeholder="Escribe..." />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>

            </Modal>
        </>
    );

}

export default ModalEditarObs;