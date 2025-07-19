import React from "react";
import { Tag, Button, Flex, Input } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../colors";
import {
    UserCircleCheck,
    PencilSimpleLine,
} from "@phosphor-icons/react";
const { TextArea } = Input;
import { EstadosAudiencia, EstadoProcesamiento } from "../constants";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';

export const ColumnsDocs = (onClickEdit) => {
    const columns = [
        {
            title: 'Fecha Recepción',
            dataIndex: 'fechaRecepcion',
            key: 'fechaRecepcion'
        },
        {
            title: 'Legajo',
            dataIndex: 'numeroLegajo',
            key: 'numeroLegajo'
        },
        {
            title: 'Nombre del Archivo',
            dataIndex: 'nombreArchivo',
            key: 'nombreArchivo'
        },
        {
            title: 'Estado',
            key: 'est',
            render: (_, record) => (
                <Tag 
                icon = {
                    record.estado == EstadoProcesamiento.SUCCESS? <CheckCircleOutlined /> : 
                    (record.estado == EstadoProcesamiento.IN_PROGRESS?(<SyncOutlined spin />):(<CloseCircleOutlined />))
                }
                color={
                    record.estado == EstadoProcesamiento.SUCCESS? "success" : 
                    (record.estado == EstadoProcesamiento.IN_PROGRESS?("processing"):("error"))
                }>{record.estadoNombre}</Tag>
            ),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Flex gap={"small"} justify="center" align="center">
                    <Button onClick={() => onClickEdit(record)} type="primary" shape="circle" style={{ backgroundColor: colors.cian }} icon={<PencilSimpleLine size={20} color={colors.white} />} />
                </Flex>
            ),
        },
    ];

    return columns;
};