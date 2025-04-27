import React from "react";
import { Tag, Button, Flex, Typography, Card } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../../utils/colors";
const { Text } = Typography;
import {
    List, Download,EnvelopeSimple
} from "@phosphor-icons/react";
function DocSalidaCard(props) {
    const { doc, showMdEditarRecurso, onClickDownload, loadingsPDF, index } = props;

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
                <Text strong>{doc.claseDocumento}</Text>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <Text style={{ minWidth: "45px" }} strong >Fecha Creación: </Text>
                    <Text style={{ textAlign: "left" }}>{doc.fechaCreacion}</Text>
                </Flex>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <Text strong >Abogado: </Text>
                    <Text >{doc.abogado}</Text>
                </Flex>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <ul style={{ margin: "0em 0" }} >
                        {doc.destinatarios.map((d, index) => (
                            <li key={index}>
                                {d.entidadCorrNombre}
                            </li>
                        ))
                        }

                    </ul>
                </Flex>
                <Flex justify="flex-end" align="center" gap={"small"} style={{ width: "100%" }}>
                    <Button
                        loading={loadingsPDF[index]}
                        onClick={() => onClickDownload(index, doc.docId)}
                        size="large" type="text" shape="circle"
                        icon={<FilePdfOutlined size={28} style={{ color: colors.red }} />} />

                    <Button onClick={() => showMdEditarRecurso(doc)}
                        type="primary" shape="circle" style={{ backgroundColor: colors.cian }}
                        icon={<EnvelopeSimple size={20} color={colors.white} />} />
                </Flex>
            </Flex>

        </>
    );

}

export default DocSalidaCard;