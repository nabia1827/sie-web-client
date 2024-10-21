import React from "react";
import { Tag, Button, Flex, Input,Typography } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../colors";
import {
    List
} from "@phosphor-icons/react";
const { TextArea } = Input;
const { Text } = Typography;
export const ColumnsResultado = (showMdApel) => {
    const columns = [

        {
            title: 'Imputado',
            dataIndex: 'imputado',
            key: 'imputado'
        },
        {
            title: 'Delito',
            dataIndex: 'delito',
            key: 'delito'
        },
        {
            title: 'Reparación Civil',
            key: 'rep',
            render: (_, record) => (
                <Tag color="geekblue">S/.{Number(record.reparacionCivil).toFixed(2)}</Tag>
            ),
        },
        {
            title: 'Tipo Sentencia',
            dataIndex: 'tipoSentencia',
            key: 'tipoSentencia'
        },
        {
            title: 'Tipo Pena',
            dataIndex: 'tipoPena',
            key: 'tipoPena'
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad'
        },
        {
            title: 'Apelación',
            key: 'apelacion',
            render: (_, record) => (
                <>
                    {record.resApelacionId? (
                        <Flex gap={"small"} justify="center" align="center">
                            <Button onClick={showMdApel} type="primary" shape="circle" style={{ backgroundColor: colors.cian }} icon={<List size={20} color={colors.white} />} />

                        </Flex>
                    ):(<Text>{"--"}</Text>)

                    }
                </>
            ),
        },
    ];

    return columns;
};