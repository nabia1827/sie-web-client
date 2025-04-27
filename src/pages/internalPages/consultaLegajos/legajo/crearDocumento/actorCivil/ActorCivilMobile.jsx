import React from "react";
import { Flex, Row, Col, Typography, Form, Select, Input, Button } from "antd";
import {
    FileText, Plus
} from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography;
import { enableButtonStyle, enableModalButtonStyle } from "../../../../../../utils/styles";
import imageCrear from "../../../../../../assets/images/crearDocSalida.svg"

function ActorCivilMobile(props){
    const { form,onFinishAc,onCancelAc,loadingAc } = props;
    const { tiposDanio, dependenciasMininter, procuradores } = useSelector((state) => state.app);

    return (
        <>
            <Form
                form={form}
                onFinish={onFinishAc}
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
                    <Col xs={24} sm={24} md={24} lg={14} xl={14}>
                        <Flex vertical gap={"middle"} justify="flex-start" align="flex-start" style={{ width: "100%" }}>
                            <Flex gap={"small"} justify="flex-start" align="center" >
                                <FileText size={24} color={colors.lightBlack} />
                                <Text className="sie-content-title">Nuevo Actor Civil</Text>
                            </Flex>

                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-content" >Especialista Legal</Text>}
                                name='especialistaLegal'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor ingrese un especialista.',
                                    },
                                ]}
                            >
                                <Input placeholder="Nombre..."></Input>
                            </Form.Item>

                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-content" >Tipo de daño ocasionado</Text>}
                                name='tipoDanioId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor elija un tipo de daño.',
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: "100%", textAlign: "left" }}
                                    placeholder="Seleccione tipo daño..."
                                    allowClear
                                >
                                    {
                                        tiposDanio.map((d) => (
                                            <Select.Option key={d.subtipoDanioId} value={d.subtipoDanioId}>
                                                {d.descripcionCompleta}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-content" >Dependencia MININTER afectada</Text>}
                                name='dependenciaAfectadaId'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Por favor elija una dependencia.',
                                    },
                                ]}
                            >
                                <Select
                                    style={{ width: "100%", textAlign: "left" }}
                                    placeholder="Seleccione dependencia..."
                                    allowClear
                                >
                                    {
                                        dependenciasMininter.map((d) => (
                                            <Select.Option key={d.dependenciaId} value={d.dependenciaId}>
                                                {d.nombreCompleto}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
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
                            <Flex gap={"small"} justify="flex-end" align="center" style={{ width: "100%" }} >
                                <Button key="back" onClick={onCancelAc}>
                                    Cancelar
                                </Button>

                                <Button style={enableModalButtonStyle} loading={loadingAc} key="submit" htmlType="submit" type="primary">
                                    Crear
                                </Button>
                            </Flex>
                        </Flex>
                    </Col>

                    <Col xs={24} sm={24} md={24} lg={10} xl={10}>
                        <Flex vertical justify="center" align="center" style={{ width: "100%", height: "100%" }}>
                            <img src={imageCrear} alt="Imagen Crear Documento Salida" style={{ maxWidth: '75%', maxHeight: 'auto' }} />
                        </Flex>

                    </Col>
                </Row>
            </Form>

        </>
    );

}

export default ActorCivilMobile;