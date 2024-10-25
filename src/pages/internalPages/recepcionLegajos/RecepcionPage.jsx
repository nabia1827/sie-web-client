import React, { useState } from "react";
import { Flex, Grid, Form, message } from "antd";
import RecepcionMobile from "./RecepcionMobile";
import RecepcionWeb from "./RecepcionWeb";
//import { CrearLegajo,AdicionarDocumento,GetLegajoIdByCarpetaOrExpediente } from "../../../utils/consultaLegajos/dinamicCalls";
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

    const handleUploadChange = ({ fileList }) => {
        setFileList(fileList);
    };

    const onClickRecepcionar = () => {
        setLoading(true);
        const tipoCaso = form.getFieldValue("tipoCaso");
        const nroCaso = form.getFieldValue("nroCaso");
        const formData = new FormData();
        formData.append('archivo', fileList[0].originFileObj);
        console.log("fileeeeee", fileList[0].originFileObj)
        setTimeout(() => {
            setLoading(false);

        }, 44000);
        /*
                if (fileList.length > 0) {
                    setLoading(true);
                    const tipoCaso = form.getFieldValue("tipoCaso");
                    const nroCaso = form.getFieldValue("nroCaso");
                    const formData = new FormData();
                    formData.append('archivo', fileList[0].originFileObj);
        
                    GetLegajoIdByCarpetaOrExpediente(tipoCaso,nroCaso).then((response)=>{
        
                        if(response.isSuccess){
                            if(response.data > 0){
                                AdicionarDocumento(response.data,usuId,formData).then((resp)=>{
                                    setLoading(false);
                                    const {legajoId, docId} = resp
                                    navigate(paths.ADICIONAR_LEGAJO(legajoId, docId))
                                });
                            }else{
                                CrearLegajo(usuId,formData).then((resp2)=>{
                                    setLoading(false);
                                    const {legajoId, docId} = resp2;
                                    navigate(paths.CREAR_DOC(legajoId, docId))
                                });
                            }
                        }else{
                            message.error("Ocurrió un error")
                        }
                    });
        
                    
        
                }*/

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
            onClickRecepcionar={onClickRecepcionar}
            handleUploadChange={handleUploadChange}
            loading={loading}
        />
    }

    </>;
}

export default RecepcionPage;