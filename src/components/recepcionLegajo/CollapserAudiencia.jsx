import React, { useState ,useEffect} from "react";
import { useSelector } from 'react-redux'
import { Flex,Typography, Input, Collapse, Select,Row, Col, Form,DatePicker, TimePicker, Spin} from "antd";
import { colors } from "../../utils/colors";
const { Text } = Typography;
import dayjs from 'dayjs';
const FORMAT_DATE = "DD/MM/YYYY";
const FORMAT_TIME = "h:mm A";


function CollapserAudiencia(props) {
    const { form,loading, handleOnFieldsChange,data } = props;


    const { tiposAudiencia } = useSelector((state) => state.app)

    useEffect(() => {
        if (data !== null && data !== undefined) {
            console.log(data)
            form.setFieldsValue(
                {
                    fecha: data.fecha !== null? dayjs(data.fecha, FORMAT_DATE) : "",
                    tipo: data.tipoAudienciaId,
                    hora: data.hora !== null? dayjs(data.hora, FORMAT_TIME) : "",
                    link: data.link
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
                                <Text style={{width: "100%", textAlign:"left"}} >Audiencia</Text>
                            </Flex>,

                        children:
                            <>
                                <Spin spinning={loading}>
                                
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
                                                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                                                    <Form.Item label={<Text>Fecha</Text >} name='fecha'>
                                                        <DatePicker 
                                                            size = "middle"
                                                            style={{width: "100%"}}
                                                        />
                                                        
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                                                    <Form.Item label={<Text>Hora</Text >} name='hora'>
                                                        <TimePicker 
                                                            use12Hours format="h:mm a" 
                                                            size = "middle"
                                                            style={{width: "100%"}}
                                                        />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                                                    <Form.Item label={<Text>Tipo</Text >} name='tipo'>
                                                        <Select
                                                            allowClear
                                                            placeholder = "Seleccione un tipo ..."
                                                            style={{ textAlign: 'left' }}
                                                        >
                                                            {
                                                                tiposAudiencia.map((c) => (
                                                                    <Select.Option key={c.tipoAudienciaId} value={c.tipoAudienciaId}>
                                                                        {c.descripcion}
                                                                    </Select.Option>
                                                                ))
                                                            }

                                                        </Select>
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={12} lg={12} xl={14}>
                                                    <Form.Item 
                                                        label={<Text>link</Text >} 
                                                        name='link'

                                                        labelCol={{
                                                            xxl: 5,
                                                            xl: 5,
                                                            lg: 5,
                                                            md: 9,
                                                            sm: 9,
                                                            xs: 9,
                                                        }}
                                                        wrapperCol={{
                                                            xxl: 19,
                                                            xl: 19,
                                                            lg: 19,
                                                            md: 15,
                                                            sm: 15,
                                                            xs: 15,
                                                        }}                                                    
                                                    
                                                    >
                                                        <Input /*status={status}*/ placeholder="Nombre" size="large" /*onChange={onChangeUsername}*/
                                                                    /*prefix={<User size={24} color={colors.gray} />*/  />
                                                    </Form.Item>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={6} xl={5}>
                                                </Col>

                                                <Col xs={24} sm={24} md={24} lg={12} xl={5}> 
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

export default CollapserAudiencia;