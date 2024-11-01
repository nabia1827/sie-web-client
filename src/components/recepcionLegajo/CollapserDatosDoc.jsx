import React, { useState ,useEffect} from "react";
import { Flex, Typography, Input, Collapse, Select, Row, Col, Form, Spin } from "antd";
import { colors } from "../../utils/colors";
import { useSelector } from 'react-redux'
import {TipoDestinatario} from "../../utils/constants";

const { Text } = Typography;


function CollapserDatosDoc(props) {
    const { form, loading, handleOnFieldsChange, data, fetchFiscalias, fetchJuzgados} = props;
    const { tiposRemitente,clasesDocEntrada } = useSelector((state) => state.app)

    const [dataJuzgados, setDataJuzgados] = useState([]);
    const [dataFiscalias, setDataFiscalias] = useState([]);
    const [tipoRemitenteId, setTipoRemitenteId]  = useState();
    const [nombreRemitente, setNombreRemitente] = useState();

    const handleSearch = (nombreRemitente) => {
        if (nombreRemitente!=null && nombreRemitente!=undefined && nombreRemitente !=''){
            

            const tipoRemitenteId = form.getFieldValue("tipoRemitente")

            if(tipoRemitenteId === TipoDestinatario.FISCALIA){
                fetchFiscalias(nombreRemitente,setDataFiscalias)    
            }
            if(tipoRemitenteId === TipoDestinatario.JUZGADO){
                fetchJuzgados(nombreRemitente,setDataJuzgados)
            }

            setTipoRemitenteId(tipoRemitenteId)    
        }
    };

    const handleChange = (newNomRemitente) => {
        setNombreRemitente(newNomRemitente);
    };


    useEffect(() => {
        if (data !== null && data !== undefined) {

            const tipoRemitenteId = data.tipoRemitenteId

            if(tipoRemitenteId === TipoDestinatario.FISCALIA){
                fetchFiscalias("fiscalia",setDataFiscalias)  
            }
            if(tipoRemitenteId === TipoDestinatario.JUZGADO){
                fetchJuzgados("juzgado",setDataJuzgados)
            }

            setTipoRemitenteId(tipoRemitenteId)    

            form.setFieldsValue(
                {
                    claseDocumento: data.claseDocId,
                    tipoRemitente: data.tipoRemitenteId===0?null:data.tipoRemitenteId,
                    nroDocumento: data.numeroDoc,
                    remitente: data.remitenteId===0?null:data.remitenteId
                }
            )
        }
    }, [data])

    

    return (
        <>

            <Collapse style={{ width: "100%", backgroundColor: colors.background }}
                items={[
                    {
                        key: '1',
                        label:
                            <Flex gap={"small"} justify="flex-start" align="left">
                                <Text style={{ width: "100%", textAlign: "left" }} >Datos del documento</Text>
                            </Flex>,

                        children:
                            <>

                                <Form
                                    form={form}
                                    onFieldsChange={handleOnFieldsChange}

                                    labelCol={{
                                        xxl: 9,
                                        xl: 9,
                                        lg: 9,
                                        md: 9,
                                        sm: 9,
                                        xs: 9,
                                    }}
                                    wrapperCol={{
                                        xxl: 15,
                                        xl: 15,
                                        lg: 15,
                                        md: 15,
                                        sm: 15,
                                        xs: 15,
                                    }}
                                    labelAlign="left"


                                >
                                    <Flex gap={"small"} vertical justify="center" align="center" style={{ width: "100%" }}>

                                        <Row gutter={[45, 12]} justify={"center"} align="center" style={{ width: "100%" }}>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ width: "100%" }}>
                                                <Form.Item label={<Text>Clase data</Text >} name='claseDocumento'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                    >
                                                        {
                                                            clasesDocEntrada.map((c) => (
                                                                <Select.Option key={c.claseDocId} value={c.claseDocId}>
                                                                    {c.nombre}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                        
                                                    </Select>
                                                </Form.Item>

                                            </Col>

                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item label={<Text>Nro de data</Text >} name='nroDocumento'>
                                                    <Input placeholder="Número de data" size="large"/>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={[45, 8]} justify={"center"} align={"center"} style={{ width: "100%" }}>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item label={<Text>Tipo Remitente</Text >} name='tipoRemitente'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                    >

                                                        {
                                                            tiposRemitente.map((c) => (
                                                                <Select.Option key={c.tipoRemitenteId} value={c.tipoRemitenteId}>
                                                                    {c.nombreRemitente}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item label={<Text>Remitente</Text >} name='remitente'>
                                                    <Select
                                                        showSearch
                                                        value={nombreRemitente}

                                                        placeholder={"Seleccione el Remitente ..."}
                                                        defaultActiveFirstOption={false}
                                                        filterOption={false}
                                                        onSearch={handleSearch}
                                                        onChange={handleChange}
                                                        notFoundContent={null}
                                                    >
                                                        {
                                                            tipoRemitenteId === TipoDestinatario.FISCALIA &&
                                                                dataFiscalias.map((c) => (
                                                                    <Select.Option key={c.fiscaliaId} value={c.fiscaliaId}>
                                                                        {c.nombreCompleto}
                                                                    </Select.Option>
                                                                ))
                                                        }
                                                        {
                                                            tipoRemitenteId === TipoDestinatario.JUZGADO &&
                                                                dataJuzgados.map((c) => (
                                                                    <Select.Option key={c.juzgadoId} value={c.juzgadoId}>
                                                                        {c.nombreCompleto}
                                                                    </Select.Option>
                                                                ))
                                                        }
                                                    </Select>
                                                </Form.Item>

                                            </Col>
                                        </Row>

                                    </Flex>
                                </Form>
                            </>
                    },
                ]}
            />
        </>
    )
}

export default CollapserDatosDoc;