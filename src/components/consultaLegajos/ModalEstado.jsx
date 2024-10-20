import React,{useEffect} from "react";
import { Flex, Modal, Button, Select, Row, Col, Input, Typography, Form } from "antd";
import { motion } from "framer-motion";
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography
import { useDispatch, useSelector } from "react-redux";
import { ListEstado } from "../../utils/constants";

function ModalEstado(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading, currentRecord, form } = props;
    
    const { subfases } = useSelector((state) => state.app);

    // Usamos useEffect para establecer los valores iniciales cuando currentRecord cambia
    useEffect(() => {
        if (currentRecord) {
            form.setFieldsValue({
                estadoId: currentRecord.estadoId,
                subfaseId: currentRecord.subfaseId
            });
        }
    }, [currentRecord, form]);

    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}
                title="Cambiar Estado"
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
                        xxl: 8,
                        xl: 8,
                        lg: 8,
                        md: 8,
                        sm: 24,
                        xs: 24,
                    }}
                    wrapperCol={{
                        xxl: 16,
                        xl: 16,
                        lg: 16,
                        md: 16,
                        sm: 24,
                        xs: 24,
                    }}
                >
                    <Row gutter={[8, 16]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>
                        <Col span={24}>

                            <Form.Item
                                style={{ width: "100%" }}
                                
                                label={<Text className="sie-info-column-label" >Estado</Text>}
                                name='estadoId'>
                                <Select

                                    style={{ width: "100%", height: "36px" }}
                                    placeholder="Seleccione el estado..."
                                    allowClear
                                >
                                    {
                                        ListEstado.map((e) => (
                                            <Select.Option key={e.estadoId} value={e.estadoId}>
                                                {e.estadoNombre}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col span={24}>

                            <Form.Item
                                style={{ width: "100%" }}
                                
                                label={<Text className="sie-info-column-label" >Situación Juridica</Text>}
                                name='subfaseId'>
                                <Select

                                    style={{ width: "100%", height: "36px" }}
                                    placeholder="Seleccione la situación..."
                                    allowClear

                                >
                                    {
                                        subfases.map((s) => (
                                            <Select.Option key={s.subfaseId} value={s.subfaseId}>
                                                {s.subfaseNombre}
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

export default ModalEstado;