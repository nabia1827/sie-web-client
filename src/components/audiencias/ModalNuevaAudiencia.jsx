/*
import React from "react";
import { enableModalButtonStyle } from "../../utils/styles";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography, Switch, ColorPicker, DatePicker, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography;
const { TextArea } = Input;
import { colors } from "../../utils/colors";

function ModalNuevaAudiencia() {
    const { modalOpen, handleOk, handleCancel, modalLoading, form } = props;
    const { tiposAudiencia } = useSelector((state) => state.app);

    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}

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
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ width: "100%" }}>
                            <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%" }}>
                                <Text className="sie-info-column-content"> Crear Audiencia</Text>
                                <Form.Item
                                    style={{ marginBottom: "0" }}
                                    name='audienciaColor'>
                                    <ColorPicker defaultValue={colors.blue} />;
                                </Form.Item>
                            </Flex>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text className="sie-info-column-label" >Fecha</Text>}
                                name='fecha'>
                                <DatePicker disabled style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text className="sie-info-column-label" >Hora Inicio</Text>}
                                name='startTime'>
                                <TimePicker />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text className="sie-info-column-label" >Hora Fin</Text>}
                                name='endTime'>
                                <TimePicker  />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text className="sie-info-column-label" >Tipo de Audiencia</Text>}
                                name='audienciaTipoId'>
                                <Select
                                    style={{ width: "100%", height: "36px" }}
                                    placeholder="Seleccione un tipo..."
                                    allowClear

                                >
                                    {
                                        tiposAudiencia.map((d) => (
                                            <Select.Option key={d.tipoAudienciaId} value={d.tipoAudienciaId}>
                                                {d.descripcion}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-content" >Link</Text>}
                                name='audienciaLink'
                            >
                                <Input ></Input>
                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text className="sie-info-column-content" >Observaciones</Text>}
                                name='audienciaObservaciones'>
                                <TextArea style={{ color: "black" }} rows={4} placeholder="Escribe..." />
                            </Form.Item>

                        </Col>
                        
                    </Row>

                </Form>


            </Modal>
        </>
    );

}
export default ModalNuevaAudiencia;*/

/*defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}*/