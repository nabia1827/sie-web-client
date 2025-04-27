import React from "react";
import { Flex, Row, Col, Typography, Form, Select, Input, Button, DatePicker } from "antd";
import {
    FileText, Plus
} from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography;
const { TextArea } = Input;
import { enableButtonStyle, enableModalButtonStyle } from "../../../../../../utils/styles";
import imageCrear from "../../../../../../assets/images/crearDocSalida.svg"


function QuejaMobile(props){
    const { form, onFinishQj, onCancelQj, loadingQj } = props;
    const { procuradores } = useSelector((state) => state.app);
    const dateFormat = 'DD/MM/YYYY';
    return (
        <>
            <Form
                form={form}
                onFinish={onFinishQj}
                style={{ width: "100%", height: "100%" }}
                labelWrap={true}
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
                <Row justify={"center"} align={"center"} style={{ width: "100%" }}>
                    <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{padding:"2.0em"}}>
                        <Flex vertical gap={"middle"} justify="flex-start" align="center" style={{ width: "100%" }}>
                            <Flex gap={"small"} justify="flex-start" align="center" style={{width:"100%"}} >
                                <FileText size={24} color={colors.lightBlack} />
                                <Text className="sie-content-title" >Nueva Queja de Derecho</Text>
                            </Flex>

                            <img src={imageCrear} alt="Imagen Crear Documento Salida" style={{ maxWidth: '40%', maxHeight: 'auto' }} />
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-content" >Fecha de Archivamiento del caso</Text>}
                                name='fechaArchivo'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese una fecha.',
                                    },
                                ]}
                            >
                                <DatePicker format={dateFormat}></DatePicker>

                            </Form.Item>

                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-content" >Procurador</Text>}
                                name='procuradorId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor elija un procurador.',
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: "100%", textAlign: "left" }}
                                    placeholder="Seleccione procurador..."
                                    allowClear
                                >
                                    {
                                        procuradores.map((d) => (
                                            <Select.Option key={d.procuradorId} value={d.procuradorId}>
                                                {d.nombreCompleto}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>




                        </Flex>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{padding:"2.0em"}}>
                        <Flex vertical gap={"middle"} justify="flex-start" align="flex-start" style={{ width: "100%" }}>
                            
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-content" >Fundamento de Disposición Impugnada</Text>}
                                name='fundDispImpugnada'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese el fundamento.',
                                    },
                                ]}
                            >
                                <TextArea style={{ color: "black" }} rows={6} placeholder="Escribe..." />
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-content" >Fundamento de Pretensión Impugnatoria</Text>}
                                name='fundPretImpug'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese el fundamento.',
                                    },
                                ]}
                            >
                                <TextArea style={{ color: "black" }} rows={6} placeholder="Escribe..." />
                            </Form.Item>


                            <Flex gap={"small"} justify="flex-end" align="center" style={{ width: "100%" }} >
                                <Button key="back" onClick={onCancelQj}>
                                    Cancelar
                                </Button>

                                <Button style={enableModalButtonStyle} loading={loadingQj} key="submit" htmlType="submit" type="primary">
                                    Crear
                                </Button>
                            </Flex>
                        </Flex>

                    </Col>
                </Row>
            </Form>
        </>
    );

}

export default QuejaMobile;