import React,{useEffect} from "react";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography;
const { TextArea } = Input;

function ModalEditResultado(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading, form, legajo } = props;

    // Usamos useEffect para establecer los valores iniciales cuando currentRecord cambia
    /*useEffect(() => {
        if (modalOpen) {
            form.setFieldsValue({
                hechos: legajo.hechosNombre,

            });
        }
    }, [modalOpen, form]);*/


    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}
                title="Editar Sentencia"
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
                    <Row gutter={[0, 2]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name='reparacionCivil'>
                                <Input /*status={status}*/ placeholder="Reparacion Civil" size="large" /*onChange={onChangeUsername}*/
                                                        /*prefix={<User size={24} color={colors.gray} />*/  />

                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name='tipoSentencia'>
                                <Select
                                    style={{ width: '100%' }}
                                    options={[{ value: 'Juzgado', label: 'Juzgado' }]}
                                />
                            </Form.Item>
                            
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name='tipoPena'>
                                <Select
                                    style={{ width: '100%' }}
                                    options={[{ value: 'Juzgado', label: 'Juzgado' }]}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name='cantidad'>
                                <Input /*status={status}*/ placeholder="Cantidad" size="large" /*onChange={onChangeUsername}*/
                                                        /*prefix={<User size={24} color={colors.gray} />*/  />

                            </Form.Item>
                        </Col>

                    </Row>
                </Form>

            </Modal>
        </>
    );

}

export default ModalEditResultado;