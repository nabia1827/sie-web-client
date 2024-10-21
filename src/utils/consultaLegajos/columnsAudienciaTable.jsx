import React from "react";
import { Tag, Button, Flex, Input } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../colors";
import {
    UserCircleCheck,
    PencilSimpleLine,
} from "@phosphor-icons/react";
const { TextArea } = Input;
import { EstadosAudiencia } from "../constants";

export const ColumnsAudiencia = (showMdObs,onClickAsistencia) => {
    const columns = [
        {
            title: 'Fecha',
            dataIndex: 'fecha',
            key: 'fecha'
        },
        {
            title: 'Hora',
            dataIndex: 'hora',
            key: 'hora'
        },
        {
            title: 'Audiencia',
            dataIndex: 'descripcion',
            key: 'descripcion'
        },
        {
            title: 'Link',
            key: 'lk',
            render: (_, record) => (
                <a>{record.link}</a>
            ),
        },
        {
            title: 'Estado',
            key: 'est',
            render: (_, record) => (
                <Tag color={record.estado == "Asistió" ? ("green") : (record.estado == "No asistió" ? ("red") : ("geekblue"))}>{record.estado}</Tag>
            ),
        },
        {
            title: 'Observación',
            dataIndex: 'observacion',
            key: 'observacion',

        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Flex gap={"small"} justify="center" align="center">
                    {record.estado == EstadosAudiencia.EN_CURSO && (
                        <Button
                            onClick={() => onClickAsistencia(record.audienciaId)}
                            type="primary"
                            shape="circle"
                            style={{ backgroundColor: colors.blue }}
                            icon={<UserCircleCheck size={20} color={colors.white} />} 
                        />
                    )
                    }
                    <Button onClick={() => showMdObs(record)} type="primary" shape="circle" style={{ backgroundColor: colors.cian }} icon={<PencilSimpleLine size={20} color={colors.white} />} />
                </Flex>
            ),
        },
    ];

    return columns;
};