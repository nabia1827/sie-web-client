import React from "react";
import { Tag, Button, Flex } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../colors";
export const ColumnsImputados = () => {
    const columns = [
        {
            title: 'Imputados',
            dataIndex: 'imputado',
            key: 'imputado'
        },
        {
            title: 'Tipo Doc',
            key: 'td',
            render: (_, record) => (
                <Tag color={record.tipoDoc=="DNI"?("geekblue"):("green")}>{record.tipoDoc}</Tag>
            ),
        },
        {
            title: 'Nro Doc',
            dataIndex: 'nroDoc',
            key: 'nroDoc',
        },
        {
            title: 'Delitos',
            key: 'dls',
            render: (_, record) => (
                <ul style={{ margin: "0em 0" }} >
                    {record.delitos.map((delito) => (
                        <li>
                            {delito}
                        </li>
                    ))

                    }

                </ul>
            ),
        },
        {
            title: 'Estado',
            key: 'est',
            render: (_, record) => (
                <Tag color={record.estado=="Investigado"?("red"):("geekblue")}>{record.estado}</Tag>
            ),
        },
        {
            title: 'Sustento',
            key: 'sustento',
            render: (_, record) => (
                <Flex gap={"small"} justify="center" align="center">
                    <Button size="large" type="text" shape="circle" icon={<FilePdfOutlined size={28} style={{ color: colors.red }} />} />

                </Flex>
            ),
        },
    ];

    return columns;
};

export const ColumnsAgraviados= () => {
    const columns = [
        {
            title: 'Agraviados',
            dataIndex: 'agraviado',
            key: 'agraviado'
        },
        {
            title: 'Tipo Doc',
            key: 'td',
            render: (_, record) => (
                <Tag color={record.tipoDoc=="DNI"?("geekblue"):("green")}>{record.tipoDoc}</Tag>
            ),
        },
        {
            title: 'Nro Doc',
            dataIndex: 'nroDoc',
            key: 'nroDoc',
        },
        
    ];

    return columns;
};