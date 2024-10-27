import React,{useEffect, useState} from "react";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography, DatePicker } from "antd";
import { motion } from "framer-motion";
import { TipoCantidad,ListResultadoApelacion } from "../../utils/constants";
import { useSelector } from 'react-redux'
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
const { Text } = Typography;
const { TextArea } = Input;
import dayjs from 'dayjs';

const FORMAT_DATE = "DD/MM/YYYY";


function ModalEditResultado(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading, form, currentResultado } = props;

    const { tiposSentencia,  tiposPena} = useSelector((state) => state.app)
    const [tipoPenaId, setTipoPenaId] = useState('');

    // Usamos useEffect para establecer los valores iniciales cuando currentRecord cambia
    useEffect(() => {
        if (modalOpen) {     
            console.log(",m",currentResultado)       
            form.setFieldsValue({
                reparacionCivil: currentResultado.reparacionCivil,
                cantidad: currentResultado.cantidadNum!==0?currentResultado.cantidadNum: null,
                tipoSentencia:currentResultado.tipoSentenciaId,
                tipoPena:currentResultado.tipoPenaId!==0?currentResultado.tipoPenaId: null,
                resApelacionId: currentResultado.resApelacionId!==0?currentResultado.resApelacionId: null,
                fechaApelacion: currentResultado.fechaApelacion !== null? dayjs(currentResultado.fechaApelacion, FORMAT_DATE) : "",
            });
        }
    }, [modalOpen, form]);

    const onFieldsChange = (changedFields) => {
        const tipoPena = changedFields.find(field => field.name[0] === 'tipoPena');
        if (tipoPena) {
            setTipoPenaId(tipoPena.value);
        }
    };



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
                    onFieldsChange={onFieldsChange}
                    style={{ width: "100%" }}
                    labelWrap={true}
                    labelCol={{
                        xxl: 6,
                        xl: 6,
                        lg: 6,
                        md: 6,
                        sm: 24,
                        xs: 24,
                    }}
                    wrapperCol={{
                        xxl: 18,
                        xl: 18,
                        lg: 18,
                        md: 18,
                        sm: 24,
                        xs: 24,
                    }}

                    labelAlign="left"
                >
                    <Row gutter={[0, 2]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name='reparacionCivil' label='Reparacion Civil' >
                                <Input placeholder="Reparacion Civil" addonAfter="Soles" size="large" />

                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name='tipoSentencia' label='Tipo de Sentencia:'>
                                <Select
                                    style={{ width: '100%' }}
                                >
                                    {
                                        tiposSentencia.map((c) => (
                                            <Select.Option key={c.tipoSentenciaId} value={c.tipoSentenciaId}>
                                                {c.tipoSentenciaNombre}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                            
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item name='tipoPena' label='Tipo de Pena:'>
                                <Select
                                    style={{ width: '100%' }}
                                >
                                    {
                                        tiposPena.map((c) => (
                                            <Select.Option key={c.tipoPenaId} value={c.tipoPenaId}>
                                                {c.tipoPenaNombre}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item 
                                name='cantidad'
                                label='Cantidad:'                                
                            >
                                <Input type="number" min={0} addonAfter= {tipoPenaId===TipoCantidad.SOLES?"Soles":"Años"} placeholder="Ingrese una cantidad ..." size="large" />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text >Fecha Apelación</Text>}
                                name='fechaApelacion'>
                                <DatePicker  style={{ width: "100%" }} />
                            </Form.Item>

                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%" }}
                                label={<Text >Resultado</Text>}
                                name='resApelacionId'>
                                <Select
                                    
                                    style={{ width: "100%", height: "36px" }}
                                    placeholder="Seleccione el estado..."
                                    allowClear

                                >
                                    {
                                        ListResultadoApelacion.map((r) => (
                                            <Select.Option key={r.resApelacionId} value={r.resApelacionId}>
                                                {r.resApelacionNombre}
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

export default ModalEditResultado;