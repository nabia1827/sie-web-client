import React, { useState } from "react";
import { Flex, Typography, Input, Button, Select , Upload, message  } from "antd";
import { colors } from "../../../utils/colors";
import myImage from '../../../assets/images/recepcionLegajo.svg';
const { Text } = Typography

import {
    Check,
    FileArrowUp 
} from "@phosphor-icons/react";

function RecepcionWeb(){
    const [fileList, setFileList] = useState([]);

    const props = {
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
            message.success(`${file.name} se ha subido exitosamente`);
            return true;
        },
        fileList,
    };

    return(
        <>
            <Flex justify="center" align="center" style={{ width: "100%", height: "76vh"}}>
                <Flex justify="center" align="center" style={{ width: "100%", height: "100%", backgroundColor: colors.white, marginBottom: "1.4em"}}>

                    <Flex vertical justify="center" align="center" style={{ width: "50%", height: "100%" }}>
                        <img src={myImage} alt="Imagen Recepcion de Legajo" style={{ maxWidth: '75%', height: 'auto' }}/>
                    </Flex>
                    <Flex vertical justify="center" align="center" style={{ width: "50%", height: "100%" }}>
                        <Flex gap={"large"}  vertical justify="center" align="center" style={{ width: "100%", height: "100%" , paddingRight: "5em", paddingLeft: "5em"}}>
                            <Text className="sie-login-title">Recepción de Documentos</Text >

                            <Flex gap={"small"} justify="center" align="center" style={{ width: "100%"}}>
                                <Text style={{ width: "30%", textAlign: 'left'}}>Tipo Caso:</Text >
                                <Select
                                    defaultValue="Carpeta Fiscal"
                                    style={{ width: "70%", textAlign: 'left' }}
                                    options={[{ value: 'Carpeta Fiscal', label: 'Carpeta Fiscal' }]}
                                />
                            </Flex>

                            <Flex gap={"small"} justify="center" align="center" style={{ width: "100%"}}>
                                <Text style={{ width: "30%", textAlign: 'left'}}>Nro Caso:</Text >
                                <Input /*status={status}*/ placeholder="Número del Caso" size="large" /*onChange={onChangeUsername}*/
                                /*prefix={<User size={24} color={colors.gray} />*/ style={{ width: "70%" }} />
                            </Flex>

                            <Flex gap={"small"} justify="center" align="center" style={{ width: "100%"}}>
                                <Text style={{ width: "30%", textAlign: 'left'}}>Archivo:</Text >
                                <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "70%"}}>
                                    <Upload style={{alignContent: "flex-start", alignItems: "flex-start", textAlign: "left"}} {...props} maxCount={1}>
                                        <Button  icon={<FileArrowUp color = {colors.gray} />}>Click to Upload</Button>
                                    </Upload>
                                </Flex>
                            </Flex>

                            <Button type="primary" icon={<Check size={16}  />}>Recepcionar</Button>

                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );

}

export default RecepcionWeb;