import React, { useState ,useEffect} from "react";
import { useSelector } from 'react-redux'
import { Flex,Typography, Input, Collapse, Select,Row, Col, Form} from "antd";
import { colors } from "../../../utils/colors";
const { Text } = Typography;
const { TextArea } = Input;
import { ListTipoProceso, ListEstado } from "../../../utils/constants";


function CollapserDatosGen(props) {
    const { form, handleOnFieldsChange, data, fetchJuzgados} = props;

    const [dataJuzgados, setDataJuzgados] = useState([]);
    const [nombreJuzgado, setNombreJuzgado] = useState();

    const { subfases } = useSelector((state) => state.app)

    const handleSearch = (nombreJuzgado) => {
        if (nombreJuzgado!=null && nombreJuzgado!=undefined && nombreJuzgado !=''){
            fetchJuzgados(nombreJuzgado,setDataJuzgados)
        }
    };

    const handleChange = (newNomJuzgado) => {
        setNombreJuzgado(newNomJuzgado);
    };


    useEffect(() => {
        if (data !== null && data !== undefined) {
            form.setFieldsValue(
                {
                    carpetaFiscal: data.carpetaFiscalNro,
                    expedienteJudicial: data.expedienteNro,
                    estado: data.estadoId,
                    subfase: data.subFaseId,
                    correoJuzgado:data.emailJuzgado,
                    tipoProceso: data.esProcesoInmediatoId+1               
                }
            )
        }
    }, [data])

    

    return (
        <>
            <Collapse style={{width: "100%", backgroundColor: colors.background}} 
                items={[
                    {
                        key: '1',
                        label:
                            <Flex gap={"small"} justify="flex-start" align="left">
                                <Text style={{width: "100%", textAlign:"left"}} >Datos Generales del Caso</Text>
                            </Flex>,

                        children:
                            <>
                                <Form
                                    form={form}
                                    onFieldsChange={handleOnFieldsChange}

                                    colon={false}
                                    
                                    labelCol={{
                                        xxl: 10,
                                        xl: 10,
                                        lg: 10,
                                        md: 10,
                                        sm: 10,
                                        xs: 10,
                                    }}
                                    wrapperCol={{
                                        xxl: 14,
                                        xl: 14,
                                        lg: 14,
                                        md: 14,
                                        sm: 14,
                                        xs: 14,
                                    }}
                                    labelAlign="left"
                                    labelWrap
                                >
                                    <Flex  gap={"small"} vertical justify="center" align="center" style={{ width: "100%"}}>
                                        
                                        <Row gutter={[45, 12]} justify={"center"} align="center" style={{ width: "100%"}}>
                                            <Col xs={24} sm={24} md={24} lg={12} xl={8} style={{ width: "100%"}}>
                                                <Form.Item label={<Text >Carpeta Fiscal:</Text >} name='carpetaFiscal'>
                                                    <Input /*status={status}*/ placeholder="1234567889" size="large" /*onChange={onChangeUsername}*/
                                                        /*prefix={<User size={24} color={colors.gray} />*/  />
                                                </Form.Item>
                                                
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Expediente Judicial:</Text >} name='expedienteJudicial'>
                                                    <Input /*status={status}*/ placeholder="23456788" size="large" /*onChange={onChangeUsername}*/
                                                        /*prefix={<User size={24} color={colors.gray} />*/  />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Estado:</Text >} name='estado'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                    >
                                                        {
                                                            ListEstado.map((c) => (
                                                                <Select.Option key={c.estadoId} value={c.estadoId}>
                                                                    {c.estadoNombre}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Subfase:</Text >} name='subfase'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                    >
                                                    {
                                                        subfases.map((c) => (
                                                            <Select.Option key={c.subfaseId} value={c.subfaseId}>
                                                                {c.subfaseNombre}
                                                            </Select.Option>
                                                        ))
                                                    }

                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            
                                            <Col xs={24} sm={24} md={24} lg={24} xl={16}>
                                                <Form.Item 
                                                    label={<Text>Juzgado:</Text >} 
                                                    name='juzgado'

                                                    labelCol={{
                                                        xxl: 4,
                                                        xl: 4,
                                                        lg: 4,
                                                        md: 10,
                                                        sm: 10,
                                                        xs: 10,
                                                    }}
                                                    wrapperCol={{
                                                        xxl: 20,
                                                        xl: 20,
                                                        lg: 20,
                                                        md: 14,
                                                        sm: 14,
                                                        xs: 14,
                                                    }}
                                                    
                                                >
                                                    <Select
                                                        showSearch
                                                        value={nombreJuzgado}

                                                        placeholder={"Seleccione un Juzgado ..."}
                                                        defaultActiveFirstOption={false}
                                                        filterOption={false}
                                                        onSearch={handleSearch}
                                                        onChange={handleChange}
                                                        notFoundContent={null}
                                                    >
                                                        {
                                                            dataJuzgados.map((c) => (
                                                                <Select.Option key={c.juzgadoId} value={c.juzgadoId}>
                                                                    {c.nombreCompleto}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Correo Juzgado:</Text >} name='correoJuzgado'>
                                                    <Input /*status={status}*/ placeholder="Nombre" size="large" /*onChange={onChangeUsername}*/
                                                                /*prefix={<User size={24} color={colors.gray} />*/  />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item 
                                                    label={<Text>Tipo Proceso:</Text >} 
                                                    name='tipoProceso'
                                                >
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                    >

                                                        {
                                                            ListTipoProceso.map((c) => (
                                                                <Select.Option key={c.procesoId} value={c.procesoId}>
                                                                    {c.procesoNombre}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                
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

export default CollapserDatosGen;