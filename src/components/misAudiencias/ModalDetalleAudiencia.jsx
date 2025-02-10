import React, { useEffect, useState } from "react";
import { enableModalButtonStyle } from "../../utils/styles";
import { Flex, Modal, Form, Button, Skeleton, Row, Col, Input, Typography, Switch, ColorPicker, DatePicker, TimePicker, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Text } = Typography;
const { TextArea } = Input;
import { colors } from "../../utils/colors";
import { DATE_FORMAT, DATETIME_FORMAT } from "../../utils/audiencias/default";
import dayjs from 'dayjs';
import { GetAudienciaDetail, EditAudienciaDetail } from "../../utils/audiencias/dinamicCalls";
import { UpdateEstadoAsistencia } from "../../utils/consultaLegajos/dinamicCalls";
import {
    DeleteOutlined,

} from "@ant-design/icons";

function ModalDetalleAudiencia(props) {
    const { modalOpen, handleOk, handleCancel, audienciaId,onClickDelAudiencia } = props;
    const { user } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
    const [bttnLoading, setBttnLoading] = useState(false);
    const [detalleData, setDetalleData] = useState([]);
    const [form] = Form.useForm();

    const onFinished = () => {
        const color = form.getFieldValue("audienciaColor");
        const link = form.getFieldValue("audienciaLink");
        const obs = form.getFieldValue("audienciaObservaciones");
        const audienciaColor = typeof color === 'object' ? color.toHexString() : color

        saveChanges(audienciaId, audienciaColor, link, obs).then(()=>{
            form.resetFields();
            handleOk();
        })
        
    }

    const fetchDetalleAudiencia = async (id) => {
        setLoading(true);
        try {
            const response = await GetAudienciaDetail(id)
            setDetalleData(response.data);

        } finally {
            setLoading(false);
        }
    };

    const onClickAsistencia = (audienciaId) => {
        if (audienciaId) {
            UpdateEstadoAsistencia(audienciaId,user.usuId).then(() => {
                message.success("Asistencia marcada correctamente.")
                fetchDetalleAudiencia(audienciaId);
            })
        }

    }

    const saveChanges = async (audienciaId, color, link, obs) => {
        setBttnLoading(true);
        try {
            const response = await EditAudienciaDetail(audienciaId, color, link, obs, user.usuId);
            if (response.isSuccess) {
                message.success("Cambios guardados correctamente");
            } else {
                message.error(response.message);
            }

        } finally {
            setBttnLoading(false);
        }
    };

    useEffect(() => {
        if (modalOpen && audienciaId) {
            fetchDetalleAudiencia(audienciaId)
        }
    }, [modalOpen, audienciaId]);

    useEffect(() => {
        if (detalleData) {
            form.setFieldsValue({
                audienciaColor: detalleData.audienciaColor,
                codigoLegajo: detalleData.codigoLegajo,
                audienciaLink: detalleData.audienciaLink,
                audienciaObservaciones: detalleData.audienciaObservaciones,
            });
        }
    }, [detalleData]);

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
                        <Skeleton loading={loading}>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} style={{ width: "100%" }}>
                                <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%" }}>
                                    <Flex vertical align="flex-start" justify="center">
                                        <Text className="sie-modal-title"> {detalleData.audienciaTitle}</Text>
                                        <Text className="sie-info-column-content"> {detalleData.audienciaSubtitleDate} | {detalleData.audienciaSubTitleHour}</Text>
                                    </Flex>
                                    <Flex gap={"small"} align="center" justify="flex-end">
                                        <Form.Item
                                            style={{ marginBottom: "0" }}
                                            name='audienciaColor'>
                                            <ColorPicker />
                                        </Form.Item>
                                        <Button
                                        onClick={onClickDelAudiencia}
                                        type="text"
                                        icon={<DeleteOutlined/>}
                                        >
                                        </Button>
                                    </Flex>

                                </Flex>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Form.Item
                                    style={{ width: "100%", marginBottom: "0" }}
                                    label={<Text className="sie-info-column-label" >Código Legajo</Text>}
                                    name='codigoLegajo'>
                                    <Input disabled></Input>
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
                                    <TextArea style={{ color: "black" }} rows={4} placeholder="Escribe..." />
                                </Form.Item>

                            </Col>

                            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                <Flex gap={"small"} justify="flex-end" align="center" style={{ width: "100%" }}>
                                    {detalleData.estado && (
                                        <Button key="asistencia" type="primary" onClick={() => onClickAsistencia(audienciaId)}>
                                            Marcar Asistencia
                                        </Button>
                                    )

                                    }
                                    <Button style={enableModalButtonStyle} loading={bttnLoading} htmlType="submit" key="submit" type="primary" >
                                        Guardar Cambios
                                    </Button>
                                </Flex>
                            </Col>
                        </Skeleton>


                    </Row>

                </Form>


            </Modal>
        </>
    );

}
export default ModalDetalleAudiencia;