import React,{useEffect} from "react";
import { Flex, Modal, Button, Select, Form, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography;
const { TextArea } = Input;

function ModalEditarDelegado(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading, currentDelegado,
        setCurrentDelegado, form, legajo } = props;
    const { delegados } = useSelector((state) => state.app);

    useEffect(() => {
        if (modalOpen) {
            form.setFieldsValue({
                delegadoId: legajo.delegadoId,

            });
        }
    }, [modalOpen, form]);

    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}
                title="Editar delegado asignado"
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
                                name='delegadoId'>
                                <Select
                                    style={{ width: "100%", height: "36px" }}
                                    placeholder="Seleccione delegado..."
                                    allowClear

                                >
                                    {
                                        delegados.map((d) => (
                                            <Select.Option key={d.delegadoId} value={d.delegadoId}>
                                                {d.delegadoNombre}
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

export default ModalEditarDelegado;