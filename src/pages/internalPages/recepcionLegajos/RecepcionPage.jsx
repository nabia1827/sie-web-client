import React, { useEffect, useState } from "react";
import { Flex, Grid, Form, message, notification } from "antd";
import RecepcionMobile from "./RecepcionMobile";
import RecepcionWeb from "./RecepcionWeb";
import { GetLegajoIdByCarpetaOrExpediente } from "../../../utils/consultaLegajos/dinamicCalls";
import { CrearLegajo, AdicionarDocumento } from "../../../utils/recepcionLegajos/dinamicCalls";
import { setRecepcionEnProgreso } from "../../../store/actions/recepcionLegajos/recepcionLegajosActionSync";
import { endpoints, paths } from "../../../utils/paths";
const { useBreakpoint } = Grid;
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { NotificacionesRecepcion } from "../../../utils/constants";

function RecepcionPage() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const { usuId, usuEmail } = useSelector((state) => state.auth.user);

    const [fileList, setFileList] = useState([]);

    const [form] = Form.useForm();

    useEffect(() => {
        console.log(screens)
    }, [screens]);

    const uploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf';

            if (!isPDF) {
                message.error('Solo se pueden subir archivos PDF');
                return false
            }

            setFileList([file]);
            message.success(`Archivo subido exitosamente`);
            return false;
        },
        fileList: fileList,
    };

    const [api, contextHolder] = notification.useNotification();
    const openNotification = () => {
        api.info({
            message: 'Nuevo Legajo',
            description: 'El legajo ingresado no se encontró en el sistema, por lo que se procederá a su creación.',
            duration: 5,
            placement: "topRight"
        });
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const onFinishAnimation = () => {
        const now = new Date();
        console.log("DATE:: ", now.toLocaleString());
        navigate(paths.RECEPCION_LEGAJOS)
        setLoading(false);
    }

    const onClickRecepcionar = () => {
        if (fileList.length > 0) {
            setLoading(true);
            const dataInicio = {
                inProgress: true,
                notificacion: null
            }
            dispatch(setRecepcionEnProgreso(dataInicio))
            const tipoCaso = form.getFieldValue("tipoCaso");
            const nroCaso = form.getFieldValue("nroCaso");
            const formData = new FormData();
            const file = fileList[0].originFileObj || fileList[0]
            formData.append('archivo', file);
            console.log("palabra clave:", file)
            // Logs para depuración
            console.log('Archivo a enviar:', file);
            console.log('Nombre del archivo:', file.name);
            console.log('Tipo de archivo:', file.type);
            console.log('Tamaño del archivo:', file.size);
            for (let pair of formData.entries()) {
                console.log('FormData contiene:', pair[0], pair[1]);
            }
            console.log("usuarioId: ", usuId)
            GetLegajoIdByCarpetaOrExpediente(tipoCaso, nroCaso).then((response) => {

                if (response.isSuccess) {
                    if (response.data > 0) {
                        AdicionarDocumento(response.data, usuId, formData).then((resp) => {
                            setLoading(false);
                            let dataFin;
                            if (resp.success) {
                                dataFin = {
                                    inProgress: false,
                                    notificacion: NotificacionesRecepcion.SUCESS
                                }
                            } else {
                                dataFin = {
                                    inProgress: false,
                                    notificacion: NotificacionesRecepcion.ERROR
                                }
                            }

                            //const {legajoId, docId, audienciaId} = resp


                            dispatch(setRecepcionEnProgreso(dataFin))

                        });
                    } else {
                        openNotification();
                        CrearLegajo(usuId, formData).then((resp2) => {
                            setLoading(false);
                            //const {legajoId, docId, audienciaId} = resp2;
                            let dataFin;
                            if (resp2.success) {
                                dataFin = {
                                    inProgress: false,
                                    notificacion: NotificacionesRecepcion.SUCESS
                                }
                            } else {
                                dataFin = {
                                    inProgress: false,
                                    notificacion: NotificacionesRecepcion.ERROR
                                }
                            }
                            dispatch(setRecepcionEnProgreso(dataFin))

                        });
                    }
                } else {
                    message.error("Ocurrió un error")
                }
            });



        }

    }



    return <>{isXsScreen ?
        <RecepcionMobile
            uploadProps={uploadProps}
            form={form}
            onClickRecepcionar={onClickRecepcionar}
            handleUploadChange={handleUploadChange}
            loading={loading}
            onFinishAnimation={onFinishAnimation}
        /> :
        <RecepcionWeb
            uploadProps={uploadProps}
            form={form}
            contextHolder={contextHolder}
            onClickRecepcionar={onClickRecepcionar}
            handleUploadChange={handleUploadChange}
            loading={loading}
            onFinishAnimation={onFinishAnimation}
        />
    }

    </>;
}

export default RecepcionPage;