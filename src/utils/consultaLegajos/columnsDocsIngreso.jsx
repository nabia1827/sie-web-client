import React from "react";
import { Tag, Button, Flex } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../colors";

export const ColumnsDocsIngreso = (onClickDownload,loadingsPDF) => {
    const columns = [
        {
            title: 'Fecha Registro',
            dataIndex: 'fechaRegistro',
            key: 'fechaRegistro'
        },
        {
            title: 'Entidad Remitente',
            dataIndex: 'entidadRemitente',
            key: 'entidadRemitente'
        },
        {
            title: 'Tipo Documento',
            key: 'td',
            render: (_, record) => (
                <Tag color="geekblue">{record.claseDocumento}</Tag>
            ),
        },
        {
            title: 'Nro Documento',
            dataIndex: 'nroDocumento',
            key: 'nroDocumento',
        },
        {
            title: 'Registrador',
            dataIndex: 'registrador',
            key: 'registrador',
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
    ];

    return columns;
};
