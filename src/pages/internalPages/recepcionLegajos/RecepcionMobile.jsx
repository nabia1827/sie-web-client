import React, { useState } from "react";
import { Flex, Typography, Input, Button, Select, Upload, message, Col, Row, Form } from "antd";
import { colors } from "../../../utils/colors";
import { ListTipoCaso } from "../../../utils/constants";
import myImage from '../../../assets/images/recepcionLegajo.svg';
import TextProcessingLoading from "../../../components/recepcionLegajo/procesarDocumento/TextProcessingLoding";
const { Text } = Typography

import {
    Check,
    FileArrowUp
} from "@phosphor-icons/react";

function RecepcionMobile(props){
    const { uploadProps, form,contextHolder, onClickRecepcionar, handleUploadChange, loading } = props;

    return(
        <>
            <Flex justify="center" align="center" style={{ width: "100%", minHeight: "76vh", paddingBottom: "1em", backgroundColor: colors.white }}>
                {contextHolder}
                {loading ? (
                    <TextProcessingLoading></TextProcessingLoading>
                ) : (
                    <Flex justify="center" align="center" style={{ width: "100%", height: "100%" }}>
                        
                        
                        <Flex gap={"large"} vertical justify="center" align="center" style={{ width: "100%", height: "100%", paddingRight: "5em", paddingLeft: "5em" }}>
                            <Form
                                onFinish={onClickRecepcionar}
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
                                <Row gutter={[12, 12]} justify={"center"} align="center" style={{ width: "100%", paddingBottom: "4em", paddingTop: "4em" }}>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Flex vertical justify="center" align="center" style={{ width: "100%", height: "100%" }}>
                                            <img src={myImage} alt="Imagen Recepcion de Legajo" style={{ maxWidth: '75%', maxHeight: 'auto' }} />
                                        </Flex>
                                    </Col>
                                    <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                        <Flex vertical gap={"large"} justify="center" align="center" style={{ width: "100%" }}>
                                            <Text className="sie-login-title">Recepción de Documentos</Text >
                                            <Form.Item
                                                style={{ width: "100%", marginBottom: "0", textAlign: "left" }}
                                                label={<Text style={{ textAlign: 'left' }}>Tipo Caso</Text >}
                                                name='tipoCaso'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Obligatorio',
                                                    },
                                                ]}
                                            >
                                                <Select
                                                    style={{ width: "100%", textAlign: "left" }}
                                                    placeholder="Tipo de caso"
                                                    allowClear
                                                >
                                                    {
                                                        ListTipoCaso.map((t) => (
                                                            <Select.Option key={t.tipoCasoId} value={t.tipoCasoId}>
                                                                {t.tipoCasoNombre}
                                                            </Select.Option>
                                                        ))
                                                    }
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                style={{ width: "100%", marginBottom: "0", textAlign: "left" }}
                                                label={<Text style={{ textAlign: 'left' }}>Nro Caso</Text >}
                                                name='nroCaso'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Obligatorio',
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Número del Caso" size="large" style={{ width: "100%" }} />
                                            </Form.Item>
                                            <Form.Item
                                                style={{ width: "100%", marginBottom: "0", textAlign: "left" }}
                                                label={<Text style={{ textAlign: 'left' }}>Archivo</Text >}
                                                name='archivo'
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Obligatorio',
                                                    },
                                                ]}
                                            >
                                                <Upload onChange={handleUploadChange} style={{ justifyContent: "flex-start", justifyItems: "flex-start", textAlign: "left", width: "100%" }} {...uploadProps} maxCount={1}>
                                                    <Button icon={<FileArrowUp color={colors.gray} />}>Click to Upload</Button>
                                                </Upload>

                                            </Form.Item>



                                            <Button htmlType="submit" type="primary" icon={<Check size={16} />}>Recepcionar</Button>
                                        </Flex>

                                    </Col>


                                </Row>
                            </Form>



                        </Flex>
                    </Flex>
                )}

            </Flex>

        </>
    );

}

export default RecepcionMobile;