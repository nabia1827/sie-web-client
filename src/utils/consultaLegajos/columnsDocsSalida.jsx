import React from "react";
import { Tag, Button, Flex } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../colors";
import { EnvelopeSimple } from "@phosphor-icons/react";

export const ColumnsDocsSalida = (showMdEditarRecurso,onClickDownload,loadingsPDF) => {
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
                <Tag color="geekblue">{record.claseDocumento}</Tag>
            ),
        },
        {
            title: 'Destinatarios',
            key: 'dest',
            render: (_, record) => (
                <ul style={{ margin: "0em 0" }} >
                    {record.destinatarios.map((d,index) => (
                        <li key={index}>
                            {d.entidadCorrNombre}
                        </li>
                    ))
                    }

                </ul>
            ),
        },

        {
            title: 'Archivo',
            key: 'archivo',
            render: (_, record,index) => (
                <Flex gap={"small"} justify="center" align="center">
                    <Button loading={loadingsPDF[index]} onClick={() =>onClickDownload(index,record.docId)} size="large" type="text" shape="circle" icon={<FilePdfOutlined size={28} style={{ color: colors.red }} />} />

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
