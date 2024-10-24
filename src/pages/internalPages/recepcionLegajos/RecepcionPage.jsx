import React, { useState } from "react";
import { Flex, Grid, Form } from "antd";
import RecepcionMobile from "./RecepcionMobile";
import RecepcionWeb from "./RecepcionWeb";

const { useBreakpoint } = Grid;

function RecepcionPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const [loading, setLoading] = useState(false);

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
            return true;
        },
        fileList: fileList,
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
            formData.append('archivo', fileList[0].originFileObj);
            setTimeout(() => {
                setLoading(false);
            }, 44000);

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
            onClickRecepcionar={onClickRecepcionar}
            handleUploadChange={handleUploadChange}
            loading={loading}
        />
    }

    </>;
}

export default RecepcionPage;