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

function DenunciaWeb(props) {
    const { form, onFinishDn, onCancelDn, loadingDn, provincias, onFieldsChangeDn, delitos } = props;
    const { departamentos, dependenciasMininter, procuradores } = useSelector((state) => state.app);

    return (
        <>
            <Form
                form={form}
                onFinish={onFinishDn}
                onFieldsChange={onFieldsChangeDn}
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
                    <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ padding: "0.7em" }}>
                        <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }} >
                            <FileText size={24} color={colors.lightBlack} />
                            <Text className="sie-content-title">Nueva Denuncia</Text>
                        </Flex>
                        <Row gutter={[12, 12]} justify={"center"} align={"top"} style={{ width: "100%" }}>
                            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
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
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
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
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                                <Form.Item
                                    style={{ width: "100%", marginBottom: "0" }}
                                    label={<Text className="sie-info-column-content" >Departamento:</Text>}
                                    name='departamentoId'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor elija un departamento.',
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{ width: "100%", textAlign: "left" }}
                                        placeholder="Seleccione departamento..."
                                        allowClear
                                    >
                                        {
                                            departamentos.map((d) => (
                                                <Select.Option key={d.lugarId} value={d.lugarId}>
                                                    {d.nombre}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={12} xl={6}>
                                <Form.Item
                                    style={{ width: "100%", marginBottom: "0" }}
                                    label={<Text className="sie-info-column-content" >Provincia:</Text>}
                                    name='provinciaId'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor elija una provincia.',
                                        },
                                    ]}
                                >
                                    <Select
                                        style={{ width: "100%", textAlign: "left" }}
                                        placeholder="Seleccione provincia..."
                                        allowClear
                                    >
                                        {
                                            provincias.map((p) => (
                                                <Select.Option key={p.lugarId} value={p.lugarId}>
                                                    {p.nombre}
                                                </Select.Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>
                            </Col>

                        </Row>
                        <Row gutter={[12, 12]} justify={"center"} align={"top"} style={{ width: "100%", paddingTop: "1.0em" }}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                <Form.Item
                                    style={{ width: "100%", marginBottom: "0", }}
                                    label={<Text className="sie-info-column-content" >Anexos:</Text>}
                                    name='anexos'
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Por favor especifique los anexos del documento.',
                                        },
                                    ]}
                                >
                                    <Select
                                        mode="tags"
                                        style={{
                                            width: '100%', textAlign: "left",height:'97px'
                                        }}
                                        placeholder="Anexos..."

                                    />
                                </Form.Item>
                            </Col>
                            {delitos.map(d => (
                                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                    <Form.Item
                                        style={{ width: "100%", marginBottom: "0" }}
                                        label={<Text className="sie-info-column-content" >Detalle para {d.delitoNombre}</Text>}
                                        name={d.delitoId}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Por favor ingrese el análisis respectivo.',
                                            },
                                        ]}
                                    >
                                        <TextArea style={{ color: "black" }} rows={4} placeholder="Escribe..." />
                                    </Form.Item>

                                </Col>

                            ))}

                        </Row>
                        <Flex gap={"small"} justify="flex-end" align="center" style={{ width: "100%",paddingTop:"1.0em" }} >
                            <Button key="back" onClick={onCancelDn}>
                                Cancelar
                            </Button>

                            <Button style={enableModalButtonStyle} loading={loadingDn} key="submit" htmlType="submit" type="primary">
                                Crear
                            </Button>
                        </Flex>
                    </Col>


                </Row>
            </Form>
        </>
    );

}

export default DenunciaWeb;