import React, { useEffect, useState } from "react";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography, Switch } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
import {
    PlusOutlined
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography
const { TextArea } = Input;
function ModalEnviarRecurso(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading, documento, form, destinatariosPosibles,showMdAddDest } = props;
    const { currentLegajoCod } = useSelector((state) => state.consultaLegajos);

    // Estado para controlar si el TextArea está deshabilitado
    const [isAutoGenerate, setIsAutoGenerate] = useState(false);

    // Manejador para el cambio de estado del Switch
    const handleSwitchChange = (checked) => {
        if (checked) {
            form.resetFields(["contenidoCorreo"]);
        }
        setIsAutoGenerate(checked);
    };

    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}
                title={<Text className="sie-info-column-content" >Correo LP{currentLegajoCod} - {documento ? documento.claseDocumento : ""}</Text>}
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
                <Form
                    form={form}
                    style={{ width: "100%" }}
                    labelWrap={true}
                    labelCol={{
                        xxl: 6,
                        xl: 6,
                        lg: 6,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }}
                    wrapperCol={{
                        xxl: 18,
                        xl: 18,
                        lg: 18,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }}
                >
                    <Row gutter={[4, 16]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{alignItems:"center"}}>
                            <Form.Item
                                style={{ width: "100%",marginBottom:"0" }}
                                label={<Text className="sie-info-column-content" >Destinatarios</Text>}
                                name='destinatarios'>
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    placeholder="Seleccione destinatarios..."
                                    allowClear
                                    showSearch
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {
                                        destinatariosPosibles.map((d) => (
                                            <Select.Option key={d.destCod} value={d.destCod}>
                                                {d.destCorreo}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ width: "100%" }}>
                            <Flex style={{ width: "100%" }} justify="flex-end" align="center">
                                <Button onClick={showMdAddDest} icon={<PlusOutlined />} type="primary" > Agregar Destinatario</Button>
                            </Flex>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item

                                style={{ width: "100%",marginBottom:"0" }}
                                label={<Text className="sie-info-column-content" >Contenido del Correo</Text>}
                                name='contenidoCorreo'>
                                <TextArea disabled={isAutoGenerate} style={{ color: "black" }} rows={4} placeholder="Escribe..." />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                valuePropName="checked"
                                label={<Text className="sie-info-column-content" >Autogenerar</Text>}
                                name='autogenerar'>
                                <Switch size="small" defaultChecked={isAutoGenerate} onChange={handleSwitchChange} />

                            </Form.Item>
                        </Col>


                    </Row>
                </Form>





            </Modal>
        </>
    );

}

export default ModalEnviarRecurso;