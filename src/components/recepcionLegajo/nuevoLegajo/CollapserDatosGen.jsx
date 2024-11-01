import React, { useState ,useEffect} from "react";
import { useSelector } from 'react-redux'
import { Flex,Typography, Input, Collapse, Select,Row, Col, Form} from "antd";
import { colors } from "../../../utils/colors";
const { Text } = Typography;
const { TextArea } = Input;
import { ListTipoProceso, ListEstado } from "../../../utils/constants";
import { ListarProvincias, ListarDistritos } from "../../../utils/consultaLegajos/dinamicCalls";


function CollapserDatosGen(props) {
    const { form, handleOnFieldsChange, data, fetchJuzgados, fetchFiscalias} = props;

    const [dataJuzgados, setDataJuzgados] = useState([]);
    const [nombreJuzgado, setNombreJuzgado] = useState();

    const [dataFiscalias, setDataFiscalias] = useState([]);
    const [nombreFiscalia, setNombreFiscalia] = useState();

    const [dataProvincia, setDataProvincia] = useState([]);
    const [dataDistrito, setDataDistrito] = useState([]);

    const [departamentoId, setDepartamentoId] = useState();
    const [provinciaId, setProvinciaId] = useState();

    const { subfases,departamentos,distritosJudicial } = useSelector((state) => state.app)

    const handleJuzSearch = (nombreJuzgado) => {
        if (nombreJuzgado!=null && nombreJuzgado!=undefined && nombreJuzgado !=''){
            fetchJuzgados(nombreJuzgado,setDataJuzgados)
        }
    };

    const handleDepChange =  async (departamentoId) => {
        setDepartamentoId(departamentoId)
        const provincias = await ListarProvincias(departamentoId)
        console.log(provincias)
        setDataProvincia(provincias.data)
    };

    const handlePrvChange =  async (provinciaId) => {
        setProvinciaId(provinciaId)
        const distritos = await ListarDistritos(provinciaId)
        setDataDistrito(distritos.data)
    };

    

    const handleJuzChange = (newNomJuzgado) => {
        setNombreJuzgado(newNomJuzgado);
    };

    const handleFisSearch = (nombreFiscalia) => {
        if (nombreFiscalia!=null && nombreFiscalia!=undefined && nombreFiscalia !=''){
            fetchFiscalias(nombreFiscalia,setDataFiscalias)
        }
    };

    const handleFisChange = (newNomFiscalia) => {
        setNombreFiscalia(newNomFiscalia);
    };

    const fetchLugares = async (departamentoId,provinciaId)=> {
        if(departamentoId!==0 && departamentoId !==0){
            setDepartamentoId(departamentoId)
            const provincias = await ListarProvincias(departamentoId)
            console.log(provincias)
            setDataProvincia(provincias.data)
        }

        if(provinciaId!==0 && provinciaId !==0){
            setProvinciaId(provinciaId)
            const distritos = await ListarDistritos(provinciaId)
            setDataDistrito(distritos.data)
        }
    };

    useEffect(() => {
        if (data !== null && data !== undefined) {
            console.log(data)
            fetchJuzgados("juzgado",setDataJuzgados)
            fetchFiscalias("fiscalia",setDataFiscalias)
            fetchLugares(data.departamentoId, data.provinciaId)
            form.setFieldsValue(
                {
                    carpetaFiscal: data.carpetaFiscalNro,
                    expedienteJudicial: data.expedienteNro,
                    estado: data.estadoId,
                    subfase: data.subFaseId,
                    correoJuzgado:data.emailJuzgado,
                    tipoProceso: data.esProcesoInmediatoId+1,
                    juzgado: data.juzgadoId,
                    departamento:data.departamentoId,
                    provincia:data.provinciaId,
                    distrito:data.distritoId,
                    fiscalia:data.fiscaliaId,
                    correoFiscalia:data.emailFiscalia,
                    fiscalTitular:data.fiscalTitular,
                    fiscalResponsable:data.fiscalResponsable,
                    hechos:data.hecho,
                    distritoJudicial: data.disJudId
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

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Departamento:</Text >} name='departamento'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                        onChange={handleDepChange}
                                                    >
                                                        {
                                                            departamentos.map((c) => (
                                                                <Select.Option key={c.lugarId} value={c.lugarId}>
                                                                    {c.nombre}
                                                                </Select.Option>
                                                            ))
                                                        }

                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Provincia:</Text >} name='provincia'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                        onChange={handlePrvChange}
                                                    >
                                                        {
                                                            (departamentoId!==0 && departamentoId!==null) &&
                                                                dataProvincia.map((c) => (
                                                                    <Select.Option key={c.lugarId} value={c.lugarId}>
                                                                        {c.nombre}
                                                                    </Select.Option>
                                                                ))
    
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Col>


                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Distrito:</Text >} name='distrito'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                    >
                                                        {
                                                            (provinciaId!==0 && provinciaId!==null) &&
                                                            dataDistrito.map((c) => (
                                                                <Select.Option key={c.lugarId} value={c.lugarId}>
                                                                    {c.nombre}
                                                                </Select.Option>
                                                            ))
                                                        }

                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Distrito Judicial:</Text >} name='distritoJudicial'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                    >
                                                        {
                                                            distritosJudicial.map((c) => (
                                                                <Select.Option key={c.disjudId} value={c.disjudId}>
                                                                    {c.nombre}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Fiscalia:</Text >} name='fiscalia'>
                                                    <Select
                                                        showSearch
                                                        value={nombreFiscalia}

                                                        placeholder={"Seleccione una Fiscalia ..."}
                                                        defaultActiveFirstOption={false}
                                                        filterOption={false}
                                                        onSearch={handleFisSearch}
                                                        onChange={handleFisChange}
                                                        notFoundContent={null}
                                                    >
                                                        {
                                                            dataFiscalias.map((c) => (
                                                                <Select.Option key={c.fiscaliaId} value={c.fiscaliaId}>
                                                                    {c.nombreCompleto}
                                                                </Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Correo Fiscalia:</Text >} name='correoFiscalia'>
                                                    <Input /*status={status}*/ placeholder="1234567889" size="large" /*onChange={onChangeUsername}*/
                                                            /*prefix={<User size={24} color={colors.gray} />*/  />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Fiscal Titular:</Text >} name='fiscalTitular'>
                                                    <Input /*status={status}*/ placeholder="Nombre" size="large" /*onChange={onChangeUsername}*/
                                                                /*prefix={<User size={24} color={colors.gray} />*/  />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Fiscal Responsable:</Text >} name='fiscalResponsable'>
                                                    <Input /*status={status}*/ placeholder="Nombre" size="large" /*onChange={onChangeUsername}*/
                                                                /*prefix={<User size={24} color={colors.gray} />*/  />
                                                    
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Tipo Proceso:</Text >} name='tipoProceso'>
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
                                                <Form.Item label={<Text>Juzgado:</Text >} name='juzgado'>
                                                    <Select
                                                        showSearch
                                                        value={nombreJuzgado}

                                                        placeholder={"Seleccione un Juzgado ..."}
                                                        defaultActiveFirstOption={false}
                                                        filterOption={false}
                                                        onSearch={handleJuzSearch}
                                                        onChange={handleJuzChange}
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
                                                
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                <Form.Item 
                                                    label={<Text>Hechos:</Text >} 
                                                    name='hechos'

                                                    labelCol={{
                                                        xxl: 3, // Ancho personalizado para este campo
                                                        xl: 3,
                                                        lg: 4,
                                                        md: 4,
                                                        sm: 5,
                                                        xs: 5,
                                                    }}
                                                    
                                                    wrapperCol={{
                                                        xxl: 21, // Ancho personalizado para el wrapper de este campo
                                                        xl: 21,
                                                        lg: 20,
                                                        md: 20,
                                                        sm: 19,
                                                        xs: 19,
                                                    }}

  
                                                    
                                                >
                                                    <TextArea style={{width: "100%"}} rows={4} />
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