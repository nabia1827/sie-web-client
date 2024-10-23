import { Flex,Typography, Input, Collapse, Select,Row, Col, Form} from "antd";
import { colors } from "../../../utils/colors";
const { Text } = Typography;
const { TextArea } = Input;


function CollapserDatosGen(props) {
    const { form, handleOnFieldsChange } = props;

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
                                                        options={[{ value: 'Providencia', label: 'Providencia' }]}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Subfase:</Text >} name='subfase'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                        options={[{ value: 'Providencia', label: 'Providencia' }]}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            
                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Juzgado:</Text >} name='juzgado'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                        options={[{ value: 'Providencia', label: 'Providencia' }]}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Correo Juzgado:</Text >} name='correoJuzgado'>
                                                    <Input /*status={status}*/ placeholder="Nombre" size="large" /*onChange={onChangeUsername}*/
                                                                /*prefix={<User size={24} color={colors.gray} />*/  />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={24} lg={12} xl={8}>
                                                <Form.Item label={<Text>Tipo Proceso:</Text >} name='tipoProceso'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                        options={[{ value: 'Providencia', label: 'Providencia' }]}
                                                    />
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