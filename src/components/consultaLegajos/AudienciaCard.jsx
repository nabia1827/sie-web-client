import React from "react";
import { Tag, Button, Flex, Typography, Card } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../../utils/colors";
const { Text } = Typography;
import {
    UserCircleCheck,
    PencilSimpleLine,
} from "@phosphor-icons/react";
import { EstadosAudiencia } from "../../utils/constants";

function AudienciaCard(props) {
    const { aud,showMdObs,onClickAsistencia } = props;

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
                <Text strong>{aud.descripcion}</Text>
                <Flex justify="flex-start" align="center" gap={"small"} style={{ width: "100%" }}>
                    <Text style={{ minWidth: "45px" }} strong >Fecha: </Text>
                    <Text style={{ textAlign: "left" }}>{aud.fecha}</Text>
                </Flex>
                <Flex justify="flex-start" align="center" gap={"small"} style={{ width: "100%" }}>
                    <Text style={{ minWidth: "45px" }} strong >Hora: </Text>
                    <Text style={{ textAlign: "left" }}>{aud.hora}</Text>
                </Flex>
                <Flex justify="flex-start" align="center" gap={"small"} style={{ width: "100%" }}>
                    <Text style={{ minWidth: "45px" }} strong >Link: </Text>
                    <Text style={{ textAlign: "left", textWrap: "wrap" }}>{aud.link}</Text>
                </Flex>
                <Flex justify="flex-start" align="center" gap={"small"} style={{ width: "100%" }}>
                    <Text style={{ minWidth: "45px" }} strong >Estado: </Text>
                    <Tag color={aud.estado == "Asistió" ? ("green") : (aud.estado == "No asistió" ? ("red") : ("geekblue"))}>{aud.estado}</Tag>
                </Flex>
                <Flex justify="flex-start" align="center" gap={"small"} style={{ width: "100%" }}>
                    <Text style={{ minWidth: "45px" }} strong >Comentario: </Text>
                    <Text style={{ textAlign: "left" }}>{aud.observacion}</Text>
                </Flex>
                <Flex justify="flex-end" align="center" gap={"small"} style={{ width: "100%" }}>
                    {aud.estado == EstadosAudiencia.EN_CURSO && (
                        <Button
                            onClick={() => onClickAsistencia(aud.audienciaId)}
                            type="primary"
                            shape="circle"
                            style={{ backgroundColor: colors.blue }}
                            icon={<UserCircleCheck size={20} color={colors.white} />}
                        />
                    )
                    }
                    <Button onClick={() => showMdObs(aud)} type="primary" shape="circle" style={{ backgroundColor: colors.cian }} icon={<PencilSimpleLine size={20} color={colors.white} />} />
                </Flex>

            </Flex>


        </>
    );

}

export default AudienciaCard;