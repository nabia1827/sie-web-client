import { Flex,Typography, Input, Collapse, Select,Row, Col, Form} from "antd";
import { colors } from "../../utils/colors";
const { Text } = Typography;


function CollapserDatosDoc(props) {
    const { form, handleOnFieldsChange } = props;

    return (
        <>
            <Collapse style={{width: "100%", backgroundColor: colors.background}} 
                items={[
                    {
                        key: '1',
                        label:
                            <Flex gap={"small"} justify="flex-start" align="left">
                                <Text style={{width: "100%", textAlign:"left"}} >Datos del Documento</Text>
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
                                    <Flex  gap={"small"} vertical justify="center" align="center" style={{ width: "100%"}}>
                                        
                                        <Row gutter={[45, 12]} justify={"center"} align="center" style={{ width: "100%"}}>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12} style={{ width: "100%"}}>
                                                <Form.Item label={<Text>Clase documento</Text >} name='claseDocumento'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                        options={[{ value: 'Providencia', label: 'Providencia' }]}
                                                    />
                                                </Form.Item>
                                                
                                            </Col>

                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item label={<Text>Nro de Documento</Text >} name='nroDocumento'>
                                                    <Input /*status={status}*/ placeholder="Número de Documento" size="large" /*onChange={onChangeUsername}*/
                                                        /*prefix={<User size={24} color={colors.gray} />*/  />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row  gutter={[45, 8]} justify={"center"} align={"center"} style={{ width: "100%" }}>
                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item label={<Text>Tipo Remitente</Text >} name='tipoRemitente'>
                                                    <Select
                                                        style={{ textAlign: 'left' }}
                                                        options={[{ value: 'Juzgado', label: 'Juzgado' }]}
                                                    />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                                                <Form.Item label={<Text>Remitente</Text >} name='remitente'>
                                                <Select
                                                        style={{ textAlign: 'left' }}
                                                        options={[{ value: '3° Fiscalia', label: '3° Fiscalia' }]}
                                                    />
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