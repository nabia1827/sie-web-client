import React, { useState } from "react";
import { Flex, Grid, Form, message,notification } from "antd";
import RecepcionMobile from "./RecepcionMobile";
import RecepcionWeb from "./RecepcionWeb";
import { GetLegajoIdByCarpetaOrExpediente } from "../../../utils/consultaLegajos/dinamicCalls";
import { CrearLegajo,AdicionarDocumento} from "../../../utils/recepcionLegajos/dinamicCalls";

const { useBreakpoint } = Grid;
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { paths } from "../../../utils/paths";
function RecepcionPage() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const [loading, setLoading] = useState(false);
    const { usuId, usuEmail } = useSelector((state) => state.auth.user);
    const [fileList, setFileList] = useState([]);

    const [form] = Form.useForm();

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
            placement: "top"
        });
    };

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const onClickRecepcionar = () => {
        if (fileList.length > 0) {
            setLoading(true);
            const tipoCaso = form.getFieldValue("tipoCaso");
            const nroCaso = form.getFieldValue("nroCaso");
            const formData = new FormData();
            const file = fileList[0].originFileObj || fileList[0]
            formData.append('archivo',file);
            console.log("palabra clave:",file)
            // Logs para depuración
            console.log('Archivo a enviar:', file);
            console.log('Nombre del archivo:', file.name);
            console.log('Tipo de archivo:', file.type);
            console.log('Tamaño del archivo:', file.size);
            for (let pair of formData.entries()) {
                console.log('FormData contiene:', pair[0], pair[1]);
            }
            console.log("usuarioId: ", usuId)
            GetLegajoIdByCarpetaOrExpediente(tipoCaso,nroCaso).then((response)=>{

                if(response.isSuccess){
                    if(response.data > 0){
                        AdicionarDocumento(response.data,usuId,formData).then((resp)=>{
                            setLoading(false);
                            console.log("adicionarlegajo: ",resp)
                            const {legajoId, docId, audienciaId} = resp
                            
                            navigate(paths.ADICIONAR_LEGAJO(legajoId, docId,audienciaId))
                        });
                    }else{
                        openNotification();
                        CrearLegajo(usuId,formData).then((resp2)=>{
                            setLoading(false);
                            
                            const {legajoId, docId, audienciaId} = resp2;
                            console.log("crear legajo: ",resp2)
                            navigate(paths.NUEVO_LEGAJO(legajoId, docId, audienciaId))
                        });
                    }
                }else{
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
        /> :
        <RecepcionWeb
            uploadProps={uploadProps}
            form={form}
            contextHolder = {contextHolder}
            onClickRecepcionar={onClickRecepcionar}
            handleUploadChange={handleUploadChange}
            loading={loading}
        />
    }

    </>;
}

export default RecepcionPage;