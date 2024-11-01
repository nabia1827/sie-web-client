import React,{useEffect} from "react";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography } from "antd";
import { motion } from "framer-motion";
import { useSelector } from 'react-redux'
import { enableButtonStyle, hoverButtonStyle, enableModalButtonStyle } from "../../utils/styles";
import {ListTipoDocIdentidad} from "../../utils/constants";
const { Text } = Typography;
const { TextArea } = Input;

function ModalEditImputado(props) {
    const { modalOpen, handleOk, handleCancel, modalLoading, form, dataImputado} = props;
    
    const { delitos } = useSelector((state) => state.app)

    // Usamos useEffect para establecer los valores iniciales cuando currentRecord cambia
    useEffect(() => {
        if (modalOpen) {
            console.log(dataImputado)
            const delitosId = dataImputado.delitos.map(imputado => imputado.delitoId);

            form.setFieldsValue({
                nombreImputado: dataImputado.imputadoNombre,
                tipoDoc:dataImputado.tipoIdentidadId,
                nroDoc: dataImputado.nroDoc,
                nombreDelito: delitosId
            });
        }
    }, [modalOpen, form]);


    return (
        <>
            <Modal
                style={{ width: "40vh" }}
                open={modalOpen}
                title="Editar Imputados"
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
                    labelAlign="left"
                    labelCol={{
                        xxl: 11,
                        xl: 7,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }}
                    wrapperCol={{
                        xxl: 15,
                        xl: 17,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }}
                    
                >
                    <Row gutter={[0, 2]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={<Text>Imputado</Text >} name='nombreImputado'>
                                <Input placeholder="Nombre del Imputado" size="large"   />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={<Text>Tipo Documento</Text >} name='tipoDoc'>
                                <Select
                                    style={{ width: '100%' }}
                                >
                                    {
                                        ListTipoDocIdentidad.map((c) => (
                                            <Select.Option key={c.tipoDocId} value={c.tipoDocId}>
                                                {c.tipoDocNombre}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={<Text>Nro Documento</Text >} name='nroDoc'>
                                <Input /*status={status}*/ placeholder="Numero del Documento" size="large" /*onChange={onChangeUsername}*/
                                                        /*prefix={<User size={24} color={colors.gray} />*/  />
                            </Form.Item>
                        </Col>

                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item label={<Text>Delitos</Text >} name='nombreDelito'>
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                >

                                    {
                                        delitos.map((c) => (
                                            <Select.Option key={c.delitoId} value={c.delitoId}>
                                                {c.delitoNombre}
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

export default ModalEditImputado;