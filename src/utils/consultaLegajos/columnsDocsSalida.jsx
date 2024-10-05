import React from "react";
import { Tag, Button, Flex } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../colors";
import { EnvelopeSimple } from "@phosphor-icons/react";

export const ColumnsDocsSalida = (showMdEditarRecurso) => {
    const columns = [
        {
            title: 'Fecha Creación',
            dataIndex: 'fechaCreacion',
            key: 'fechaCreacion'
        },
        {
            title: 'Abogado',
            dataIndex: 'abogado',
            key: 'abogado'
        },
        {
            title: 'Tipo Documento',
            key: 'td',
            render: (_, record) => (
                <Tag color="geekblue">{record.tipoDocumento}</Tag>
            ),
        },
        {
            title: 'Destinatarios',
            dataIndex: 'destinatario',
            key: 'destinatario',
        },

        {
            title: 'Archivo',
            key: 'archivo',
            render: (_, record) => (
                <Flex gap={"small"} justify="center" align="center">
                    <Button size="large" type="text" shape="circle" icon={<FilePdfOutlined size={28} style={{ color: colors.red }} />} />

                </Flex>
            ),
        },
        {
            title: 'Enviar',
            key: 'enviar',
            render: (_, record) => (
                <Flex gap={"small"} justify="center" align="center">
                    
                    <Button onClick={showMdEditarRecurso} type="primary" shape="circle" style={{backgroundColor:colors.cian}} icon={<EnvelopeSimple size={20} color={colors.white} />} />
                    
                </Flex>
            ),
        },
    ];

    return columns;
};
