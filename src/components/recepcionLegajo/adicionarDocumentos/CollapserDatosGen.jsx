import React, { useState ,useEffect} from "react";
import { useSelector } from 'react-redux'
import { Flex,Typography, Input, Collapse, Select,Row, Col, Form} from "antd";
import { colors } from "../../../utils/colors";
const { Text } = Typography;
const { TextArea } = Input;
import { ListTipoProceso, ListEstado, FaseJuzgado } from "../../../utils/constants";


function CollapserDatosGen(props) {
    const { form, handleOnFieldsChange, data, fetchJuzgados} = props;

    const [dataJuzgadosIp, setDataJuzgadosIp] = useState([]);
    const [dataJuzgadosE, setDataJuzgadosE] = useState([]);
    const [nombreJuzgadoIp, setNombreJuzgadoIp] = useState();
    const [nombreJuzgadoE, setNombreJuzgadoE] = useState();

    const { subfases } = useSelector((state) => state.app)

    const handleSearchIp = (nombreJuzgado) => {
        if (nombreJuzgado!=null && nombreJuzgado!=undefined && nombreJuzgado !=''){
            fetchJuzgados(nombreJuzgado,FaseJuzgado.INVESTIGACION_PREPARATORIA,setDataJuzgadosIp)
        }
    };

    const handleSearchE = (nombreJuzgado) => {
        if (nombreJuzgado!=null && nombreJuzgado!=undefined && nombreJuzgado !=''){
            fetchJuzgados(nombreJuzgado,FaseJuzgado.ENJUICIAMIENTO,setDataJuzgadosE)
        }
    };

    const handleChangeIp = (newNomJuzgado) => {
        setNombreJuzgadoIp(newNomJuzgado);
    };

    const handleChangeE = (newNomJuzgado) => {
        setNombreJuzgadoE(newNomJuzgado);
    };


    useEffect(() => {
        if (data !== null && data !== undefined) {
            fetchJuzgados(data.nombreJuzgadoE,FaseJuzgado.ENJUICIAMIENTO,setDataJuzgadosE)
            fetchJuzgados(data.nombreJuzgadoIp,FaseJuzgado.INVESTIGACION_PREPARATORIA,setDataJuzgadosIp)
            
            form.setFieldsValue(
                {
                    carpetaFiscal: data.carpetaFiscalNro,
                    expedienteJudicial: data.expedienteNro,
                    estado: data.estadoId===0?null:data.estadoId,
                    subfase: data.subFaseId===0?null:data.subFaseId,
                    correoJuzgado:data.emailJuzgado,
                    tipoProceso: data.esProcesoInmediatoId+1,
                    juzgadoIp: data.juzgadoIpId===0?null:data.juzgadoIpId,
                    juzgadoE: data.juzgadoEId===0?null:data.juzgadoEId
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
                                                    <Input /*status={status}*/ placeholder="Ingrese una carpeta ..." size="large" /*onChange={onChangeUsername}*/
                                                        /*prefix={<User size={24} color={colors.gray} />*/  />
                                                </Form.Item>
                                                
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Expediente Judicial:</Text >} name='expedienteJudicial'>
                                                    <Input /*status={status}*/ placeholder="Ingrese un expediente ..." size="large" /*onChange={onChangeUsername}*/
                                                        /*prefix={<User size={24} color={colors.gray} />*/  />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Estado:</Text >} name='estado'>
                                                    <Select
                                                        placeholder="Seleccione un estado ..."
                                                        style={{ textAlign: 'left' }}
                                                        allowClear
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

                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Form.Item 
                                                    label={<Text>Subfase:</Text >} 
                                                    name='subfase'

                                                    labelCol={{
                                                        xxl: 5,
                                                        xl: 5,
                                                        lg: 5,
                                                        md: 5,
                                                        sm: 5,
                                                        xs: 5,
                                                    }}
                                                    wrapperCol={{
                                                        xxl: 19,
                                                        xl: 19,
                                                        lg: 19,
                                                        md: 19,
                                                        sm: 19,
                                                        xs: 19,
                                                    }}
                                                
                                                >
                                                    <Select
                                                        placeholder="Seleccione una subfase ..."
                                                        style={{ textAlign: 'left' }}
                                                        allowClear
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

                                            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                                                <Form.Item 
                                                    label={<Text>Tipo Proceso:</Text >} 
                                                    name='tipoProceso'

                                                    labelCol={{
                                                        xxl: 5,
                                                        xl: 5,
                                                        lg: 5,
                                                        md: 5,
                                                        sm: 5,
                                                        xs: 5,
                                                    }}
                                                    wrapperCol={{
                                                        xxl: 19,
                                                        xl: 19,
                                                        lg: 19,
                                                        md: 19,
                                                        sm: 19,
                                                        xs: 19,
                                                    }}
                                                >
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                        placeholder="Seleccione un proceso ..."
                                                        allowClear
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
                                            
                                            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{justifyItems:"flex-start"}}>
                                                <Flex>
                                                    <Text className="sie-info-column-subtitle">
                                                        JUZGADOS
                                                    </Text>
                                                </Flex>
                                            </Col>

                                            
                                            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                                <Form.Item 
                                                    label={<Text>Juzgado IP:</Text >} 
                                                    name='juzgadoIp'

                                                    labelCol={{
                                                        xxl: 5,
                                                        xl: 5,
                                                        lg: 5,
                                                        md: 5,
                                                        sm: 5,
                                                        xs: 5,
                                                    }}
                                                    wrapperCol={{
                                                        xxl: 19,
                                                        xl: 19,
                                                        lg: 19,
                                                        md: 19,
                                                        sm: 19,
                                                        xs: 19,
                                                    }}

                                                    
                                                >
                                                    <Select
                                                        showSearch
                                                        value={nombreJuzgadoIp}

                                                        placeholder={"Seleccione un Juzgado de Inv. Preparatoria ..."}
                                                        defaultActiveFirstOption={false}
                                                        filterOption={false}
                                                        onSearch={handleSearchIp}
                                                        onChange={handleChangeIp}
                                                        notFoundContent={null}
                                                        allowClear
                                                    >
                                                        {
                                                            dataJuzgadosIp.map((c) => (
                                                                <Select.Option key={c.juzgadoId} value={c.juzgadoId}>
                                                                    {c.nombreCompleto}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                                                <Form.Item 
                                                    label={<Text>Juzgado Enjuiciamiento:</Text >} 
                                                    name='juzgadoE'
                                                    
                                                    labelCol={{
                                                        xxl: 7,
                                                        xl: 7,
                                                        lg: 7,
                                                        md: 7,
                                                        sm: 7,
                                                        xs: 7,
                                                    }}
                                                    wrapperCol={{
                                                        xxl: 17,
                                                        xl: 17,
                                                        lg: 17,
                                                        md: 17,
                                                        sm: 17,
                                                        xs: 17,
                                                    }}

                                                    
                                                >
                                                    <Select
                                                        showSearch
                                                        value={nombreJuzgadoE}

                                                        placeholder={"Seleccione un Juzgado de Enjuciamiento ..."}
                                                        defaultActiveFirstOption={false}
                                                        filterOption={false}
                                                        onSearch={handleSearchE}
                                                        onChange={handleChangeE}
                                                        notFoundContent={null}
                                                        allowClear
                                                    >
                                                        {
                                                            dataJuzgadosE.map((c) => (
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

export default CollapserDatosGen;