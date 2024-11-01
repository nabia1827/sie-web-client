import React, { useEffect, useState } from "react";
import { enableModalButtonStyle } from "../../utils/styles";
import { Flex, Modal, Form, Button, Select, Row, Col, Input, Typography, Switch, ColorPicker, DatePicker, TimePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography;
const { TextArea } = Input;
import { colors } from "../../utils/colors";
import { DATE_FORMAT, DATETIME_FORMAT } from "../../utils/audiencias/default";
import dayjs from 'dayjs';
import { ListLegajosByTermino } from "../../utils/audiencias/dinamicCalls";

function ModalNuevaAudiencia(props) {
    const { modalOpen, handleOk, handleCancel, eventData } = props;
    const { tiposAudiencia } = useSelector((state) => state.app);
    const [data,setData] = useState([]);
    const [form] = Form.useForm();

    const onFinished = () => {

        const audienciaColor = form.getFieldValue("audienciaColor");
        console.log(audienciaColor)
        const fecha = form.getFieldValue("fecha");
        const startTimeAux = form.getFieldValue("startTime");
        const endTimeAux = form.getFieldValue("endTime");

        const startDateTime = dayjs(fecha)
            .hour(dayjs(startTimeAux).hour())
            .minute(dayjs(startTimeAux).minute());

        const endDateTime = dayjs(fecha)
            .hour(dayjs(endTimeAux).hour())
            .minute(dayjs(endTimeAux).minute());

        const startTime = startDateTime.format(DATETIME_FORMAT);
        const endTime = endDateTime.format(DATETIME_FORMAT);

        const audienciaTipoId = form.getFieldValue("audienciaTipoId");
        const legajoId = form.getFieldValue("legajoId");
        const audienciaLink = form.getFieldValue("audienciaLink");
        const audienciaObservaciones = form.getFieldValue("audienciaObservaciones");

        const newEvent = {
            audienciaColor: typeof audienciaColor === 'object' ? audienciaColor.toHexString() : audienciaColor,
            startTime: startTime,
            endTime: endTime,
            audienciaTipoId: audienciaTipoId,
            audienciaLink: audienciaLink,
            audienciaObservaciones: audienciaObservaciones,
            abogadoId: eventData.resourceId,
            legajoId: legajoId,
        }
        form.resetFields();
        handleOk(newEvent);
    }

    const handleOnFieldsChange = (changeFields, allFields) => {
        const campo = changeFields[0].name[0];
        const valor = changeFields[0].value
        if (campo == 'legajoId') {
            console.log("Legajo seleccionado: ", valor)
        }
    };
    const handleSearch = (newValue) =>{
        console.log("anew ",newValue);
        if(newValue){
            ListLegajosByTermino(newValue).then((response) =>{
                if(response.isSuccess){
                    console.log("Lista legajos de la API : ", response.data)
                    setData(response.data)
                }else{
    
                }
            });
        }
        
    }

    useEffect(() => {
        if (modalOpen) {
            const startDateTime = dayjs(eventData.start);

            form.setFieldsValue({
                fecha: startDateTime, // Solo la fecha para el DatePicker
                startTime: startDateTime, // La hora de inicio para el TimePicker
                endTime: startDateTime.add(1, 'hour'), // La hora de fin, una hora después de startTime
                audienciaColor: colors.blue,
            });
        }
    }, [modalOpen, form]);

    return (
        <>
            <Modal
                centered
                style={{ width: "42vh" }}
                open={modalOpen}

                onOk={onFinished}
                onCancel={handleCancel}
                footer={false}
            >
                <Form
                    form={form}
                    onFinish={onFinished}
                    onFieldsChange={handleOnFieldsChange}
                    style={{ width: "100%" }}
                    labelWrap={true}
                    labelCol={{
                        xxl: 24,
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }}
                    wrapperCol={{
                        xxl: 24,
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }}
                >
                    <Row gutter={[4, 16]} align={"middle"} justify={"start"} style={{ width: "100%", padding: "1.0em" }}>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ width: "100%" }}>
                            <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%" }}>
                                <Text className="sie-modal-title"> Crear Audiencia</Text>
                                <Form.Item
                                    style={{ marginBottom: "0" }}
                                    name='audienciaColor'>
                                    <ColorPicker />
                                </Form.Item>
                            </Flex>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-label" >Fecha</Text>}
                                name='fecha'>
                                <DatePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-label" >Hora Inicio</Text>}
                                name='startTime'>
                                <TimePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={12} sm={12} md={12} lg={8} xl={8}>
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-label" >Hora Fin</Text>}
                                name='endTime'>
                                <TimePicker style={{ width: "100%" }} />
                            </Form.Item>
                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-label" >Codigo Legajo</Text>}
                                name='legajoId'>
                                <Select
                                    showSearch
                                   
                                    placeholder="Escriba para comenzar..."
                                    style={{ width: "100%", height: "36px" }}
                                    defaultActiveFirstOption={false}
                                    suffixIcon={null}
                                    filterOption={false}
                                    onSearch={handleSearch}
                                    notFoundContent={null}
                                    options={(data || []).map((d) => ({
                                        value: d.legajoId,
                                        label: d.legajoCodigo,
                                    }))}
                                />
                                
                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-label" >Tipo de Audiencia</Text>}
                                name='audienciaTipoId'>
                                <Select
                                    style={{ width: "100%", height: "36px" }}
                                    placeholder="Seleccione un tipo..."
                                    allowClear

                                >
                                    {
                                        tiposAudiencia.map((d) => (
                                            <Select.Option key={d.tipoAudienciaId} value={d.tipoAudienciaId}>
                                                {d.descripcion}
                                            </Select.Option>
                                        ))
                                    }
                                </Select>
                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24} >
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-label" >Link</Text>}
                                name='audienciaLink'
                            >
                                <Input ></Input>
                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Form.Item
                                style={{ width: "100%", marginBottom: "0" }}
                                label={<Text className="sie-info-column-label" >Anotación</Text>}
                                name='audienciaObservaciones'>
                                <TextArea style={{ color: "black" }} rows={2} placeholder="Escribe..." />
                            </Form.Item>

                        </Col>
                        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                            <Flex gap={"small"} justify="flex-end" align="center" style={{ width: "100%" }}>
                                <Button key="back" onClick={handleCancel}>
                                    Cancelar
                                </Button>
                                <Button style={enableModalButtonStyle} htmlType="submit" key="submit" type="primary" >
                                    Agregar
                                </Button>
                            </Flex>
                        </Col>

                    </Row>

                </Form>


            </Modal>
        </>
    );

}
export default ModalNuevaAudiencia;

/*defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')}*/