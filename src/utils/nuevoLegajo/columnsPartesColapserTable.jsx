import React from "react";
import { Tag, Button, Flex, Typography } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../colors";
import {
    PencilSimpleLine,
    TrashSimple,
    List
} from "@phosphor-icons/react";

const { Text } = Typography;
export const ColumnsImputados = (showMdEditImp, showMdDelImp) => {
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
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <>
                    <Flex gap={"small"} justify="center" align="center">
                        <Button onClick={() => showMdEditImp(record)} type="primary" shape="circle" style={{ backgroundColor: colors.blue }} icon={<PencilSimpleLine size={20} color={colors.white} />} />
                        <Button onClick={() => showMdDelImp(record.imputadoId)} type="primary" shape="circle" style={{ backgroundColor: colors.red }} icon={<TrashSimple size={20} color={colors.white} />} />
                    </Flex>
                </>
            ),
        }
    ];

    return columns;
};

export const ColumnsAgraviados = (showMdEditAgr, showMdDelAgr) => {
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
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <>
                    <Flex gap={"small"} justify="center" align="center">
                        <Button onClick={() => showMdEditAgr(record)} type="primary" shape="circle" style={{ backgroundColor: colors.blue }} icon={<PencilSimpleLine size={20} color={colors.white} />} />
                        <Button onClick={() => showMdDelAgr(record.agraviadoId)} type="primary" shape="circle" style={{ backgroundColor: colors.red }} icon={<TrashSimple size={20} color={colors.white} />} />
                    </Flex>
                </>
            ),
        }

    ];

    return columns;
};