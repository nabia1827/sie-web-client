import React, { useState ,useEffect} from "react";
import { useSelector } from 'react-redux'
import { Flex,Typography, Input, Collapse, Select,Row, Col, Form, Spin} from "antd";
import { colors } from "../../../utils/colors";
const { Text } = Typography;
const { TextArea } = Input;
import { ListTipoProceso, ListEstado, FaseJuzgado} from "../../../utils/constants";
import { ListarProvincias, ListarDistritos } from "../../../utils/consultaLegajos/dinamicCalls";


function CollapserDatosGen(props) {
    const { form,loading, handleOnFieldsChange, data, fetchJuzgados, fetchFiscalias} = props;

    const [dataJuzgadosIp, setDataJuzgadosIp] = useState([]);
    const [dataJuzgadosE, setDataJuzgadosE] = useState([]);
    const [nombreJuzgadoIp, setNombreJuzgadoIp] = useState();
    const [nombreJuzgadoE, setNombreJuzgadoE] = useState();

    const [dataFiscalias, setDataFiscalias] = useState([]);
    const [nombreFiscalia, setNombreFiscalia] = useState();

    const [dataProvincia, setDataProvincia] = useState([]);
    const [dataDistrito, setDataDistrito] = useState([]);

    const [departamentoId, setDepartamentoId] = useState();
    const [provinciaId, setProvinciaId] = useState();

    const { subfases,departamentos,distritosJudicial } = useSelector((state) => state.app)

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

    const handleDepChange =  async (departamentoId) => {
        setDepartamentoId(departamentoId)
        form.setFieldsValue({provincia:null,distrito:null})
        const provincias = await ListarProvincias(departamentoId)
        console.log(provincias)
        setDataProvincia(provincias.data)
    };

    const handlePrvChange =  async (newProvinciaId) => {        
        form.setFieldsValue({distrito:null})
        setProvinciaId(newProvinciaId)
        const distritos = await ListarDistritos(newProvinciaId)
        setDataDistrito(distritos.data)
    };

    const handleChangeIp = (newNomJuzgado) => {
        setNombreJuzgadoIp(newNomJuzgado);
    };

    const handleChangeE = (newNomJuzgado) => {
        setNombreJuzgadoE(newNomJuzgado);
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
            fetchJuzgados("juzgado",FaseJuzgado.ENJUICIAMIENTO,setDataJuzgadosE)
            fetchJuzgados("juzgado",FaseJuzgado.INVESTIGACION_PREPARATORIA,setDataJuzgadosIp)
            fetchFiscalias("fiscalia",setDataFiscalias)
            fetchLugares(data.departamentoId, data.provinciaId)
            form.setFieldsValue(
                {
                    carpetaFiscal: data.carpetaFiscalNro,
                    expedienteJudicial: data.expedienteNro,
                    estado: data.estadoId===0?null:data.estadoId,
                    subfase: data.subFaseId===0?null:data.subFaseId,
                    correoJuzgado:data.emailJuzgado,
                    tipoProceso: data.esProcesoInmediatoId+1,
                    juzgadoIp: data.juzgadoIpId===0?null:data.juzgadoIpId,
                    juzgadoE: data.juzgadoEId===0?null:data.juzgadoEId,
                    departamento:data.departamentoId===0?null:data.departamentoId,
                    provincia:data.provinciaId===0?null:data.provinciaId,
                    distrito:data.distritoId===0?null:data.distritoId,
                    fiscalia:data.fiscaliaId===0?null:data.fiscaliaId,
                    correoFiscalia:data.emailFiscalia,
                    fiscalTitular:data.fiscalTitular,
                    fiscalResponsable:data.fiscalResponsable,
                    hechos:data.hecho,
                    distritoJudicial: data.disJudId===0?null:data.disJudId
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
                                <Spin spinning={loading}>
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
                                                        <Input  placeholder="Ingrese una carpeta Fiscal ..." size="large"/>
                                                    </Form.Item>
                                                    
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                    <Form.Item label={<Text>Expediente Judicial:</Text >} name='expedienteJudicial'>
                                                        <Input  placeholder="Ingrese un expediente ..." size="large"/>
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                    <Form.Item label={<Text>Estado:</Text >} name='estado'>
                                                        <Select
                                                            style={{ textAlign: 'left' }}
                                                            placeholder="Seleccione un estado ..."
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

                                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                    <Form.Item label={<Text>Subfase:</Text >} name='subfase'>
                                                        <Select
                                                            style={{ textAlign: 'left' }}
                                                            placeholder="Seleccione una subfase ..."
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

                                                

                                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                    <Form.Item label={<Text>Departamento:</Text >} name='departamento'>
                                                        <Select
                                                            style={{ textAlign: 'left' }}
                                                            onChange={handleDepChange}
                                                            placeholder="Seleccione un departamento ..."
                                                            allowClear
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
                                                            placeholder="Seleccione una provincia ..."
                                                            allowClear
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
                                                            placeholder="Seleccione un distrito ..."
                                                            allowClear
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
                                                            placeholder="Seleccione un Distrito Judicial ..."
                                                            style={{ textAlign: 'left' }}
                                                            allowClear
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
                                                            allowClear
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
                                                    <Form.Item label={<Text>Fiscal Titular:</Text >} name='fiscalTitular'>
                                                        <Input /*status={status}*/ placeholder="Ingrese un nombre ..." size="large" /*onChange={onChangeUsername}*/
                                                                    /*prefix={<User size={24} color={colors.gray} />*/  />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                    <Form.Item label={<Text>Fiscal Responsable:</Text >} name='fiscalResponsable'>
                                                        <Input /*status={status}*/ placeholder="Ingrese un nombre ..." size="large" /*onChange={onChangeUsername}*/
                                                                    /*prefix={<User size={24} color={colors.gray} />*/  />
                                                        
                                                    </Form.Item>
                                                </Col>

                                                

                                                <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                    <Form.Item label={<Text>Tipo Proceso:</Text >} name='tipoProceso'>
                                                        <Select
                                                            placeholder={"Seleccione un proceso ..."}
                                                            style={{ textAlign: 'left' }}
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

                                                <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                                                    <Flex>
                                                        <Text className="sie-info-column-subtitle">
                                                            HECHOS
                                                        </Text>
                                                    </Flex>

                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                                    <Form.Item 
                                                        name='hechos'
                                                        
                                                        wrapperCol={{
                                                            xxl: 24, // Ancho personalizado para el wrapper de este campo
                                                            xl: 24,
                                                            lg: 24,
                                                            md: 24,
                                                            sm: 24,
                                                            xs: 24,
                                                        }}
                                                 
                                                    >
                                                        <TextArea style={{width: "100%"}} rows={4} />
                                                    </Form.Item>
                                                    
                                                </Col>
                                            </Row>

                                        </Flex>
                                    </Form>
                                </Spin>
                            </>
                    },
                ]}
            />
        </>
    )
}

export default CollapserDatosGen;