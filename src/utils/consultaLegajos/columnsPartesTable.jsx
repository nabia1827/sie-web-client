import React from "react";
import { Tag, Button, Flex, Typography } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../colors";
const { Text } = Typography;
export const ColumnsImputados = () => {
    const columns = [
        {
            title: 'Imputados',
            dataIndex: 'imputadoNombre',
            key: 'imputadoNombre'
        },
        {
            title: 'Tipo Doc',
            key: 'td',
            render: (_, record) => (
                <Tag color={record.tipoDoc == "DNI" ? ("geekblue") : ("green")}>{record.tipoDoc}</Tag>
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
                    {record.delitos.map((d,index) => (
                        <li key={index}>
                            {d.delitoNombre}
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
                <ul  style={{ margin: "0em 0" }} >
                    {record.delitos.map((d,index) => (
                        <li key={index}>
                            <Tag color={d.estado == "Investigado" ? ("red") : ("geekblue")}>{d.estado}</Tag>
                        </li>
                    ))
                    }
                </ul>

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

export const ColumnsAgraviados = () => {
    const columns = [
        {
            title: 'Agraviados',
            dataIndex: 'agraviadoNombre',
            key: 'agraviadoNombre'
        },
        {
            title: 'Tipo Doc',
            key: 'td',
            render: (_, record) => (
                <>
                    {record.tipoDoc ? (
                        <Tag color={record.tipoDoc == "DNI" ? ("geekblue") : ("green")}>{record.tipoDoc}</Tag>
                    ) : (
                        <Text>{record.tipoDoc ? record.tipoDoc : "No Aplica"}</Text>
                    )

                    }
                </>
            ),
        },
        {
            title: 'Nro Doc',
            key: 'nroDoc',
            render: (_, record) => (
                <Text>{record.nroDoc ? record.nroDoc : "No Aplica"}</Text>
            ),
        },

    ];

    return columns;
};