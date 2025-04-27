import React from "react";
import { Tag, Button, Flex, Typography, Card } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../../utils/colors";
const { Text } = Typography;
import {
    List, Download
} from "@phosphor-icons/react";
function DocIngresoCard(props) {
    const { doc, onClickDownload, loadingsPDF, index } = props;

    return (
        <>
            <Flex
                vertical
                justify="flex-start"
                align="flex-start"
                gap={"small"}
                style={{
                    padding: "10px",
                    width: "100%",
                    borderRadius: "5px",
                    border: `1px solid ${colors.lightGray}`
                }}
            >
                <Text strong>{doc.claseDocumento} {doc.nroDocumento}</Text>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <Text style={{ minWidth: "45px" }} strong >Fecha Registro: </Text>
                    <Text style={{ textAlign: "left" }}>{doc.fechaRegistro}</Text>
                </Flex>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <Text strong >Entidad Remitente: </Text>
                    <Text >{doc.entidadRemitente}</Text>
                </Flex>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <Text strong>Registrador: </Text>
                    <Text >{doc.registrador}</Text>
                </Flex>
                <Flex justify="flex-end" align="center" gap={"small"} style={{ width: "100%" }}>
                    <Button loading={loadingsPDF[index]} onClick={() =>onClickDownload(index,record.docId)} size="large" type="text" shape="circle" icon={<FilePdfOutlined size={28} style={{ color: colors.red }} />} />
                </Flex>
            </Flex>

        </>
    );

}

export default DocIngresoCard;