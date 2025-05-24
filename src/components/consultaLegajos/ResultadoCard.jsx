import React from "react";
import { Tag, Button, Flex, Typography, Card } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../../utils/colors";
const { Text } = Typography;
import {
    PencilSimpleLine,
    TrashSimple,
    List
} from "@phosphor-icons/react";
function ResultadoCard(props) {
    const { resultado,showMdApel,isReception, showMdEditRes, showMdDelRes} = props;

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
                <Text strong>{resultado.imputado}</Text>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <Text style={{ minWidth: "45px" }} strong >Delito: </Text>
                    <Text style={{ textAlign: "left" }}>{resultado.delito}</Text>
                </Flex>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <Text strong >Reparación Civil: </Text>
                    <Tag color="geekblue">S/.{Number(resultado.reparacionCivil).toFixed(2)}</Tag>
                </Flex>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <Text strong >Sentencia: </Text>
                    <Text >{resultado.tipoSentencia}</Text>
                </Flex>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <Text strong>Tipo Pena: </Text>
                    <Text >{resultado.tipoPena}</Text>
                </Flex>
                <Flex gap={"small"} style={{ width: "100%" }}>
                    <Text strong>Tipo Pena: </Text>
                    <Text >{resultado.cantidad}</Text>
                </Flex>
                <Flex justify="flex-end" align="center" gap={"small"} style={{ width: "100%" }}>
                    <Button onClick={() => showMdApel(resultado)} type="primary" shape="circle" style={{ backgroundColor: colors.cian }} icon={<List size={20} color={colors.white} />} />
                    {
                        isReception !== undefined && (
                            <>
                                <Button onClick={() => showMdEditRes(record)} type="primary" shape="circle" style={{ backgroundColor: colors.blue }} icon={<PencilSimpleLine size={20} color={colors.white} />} />
                                <Button onClick={() => showMdDelRes(record.imputadoDelitoId)} type="primary" shape="circle" style={{ backgroundColor: colors.red }} icon={<TrashSimple size={20} color={colors.white} />} />
                            </>
                        )
                    }
                </Flex>
                
            </Flex>

        </>
    );

}

export default ResultadoCard;