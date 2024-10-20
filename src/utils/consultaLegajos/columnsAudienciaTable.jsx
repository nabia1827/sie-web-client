import React from "react";
import { Tag, Button, Flex,Input } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../colors";
import { 
    UserCircleCheck,
    PencilSimpleLine,
 } from "@phosphor-icons/react";
const { TextArea } = Input;

export const ColumnsAudiencia = (showMdObs) => {
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
            dataIndex: 'tipoAudiencia',
            key: 'tipoAudiencia'
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
                <Tag color={record.estado=="Asistió"?("green"):(record.estado == "No asistió"?("red"):("geekblue"))}>{record.estado}</Tag>
            ),
        },
        {
            title: 'Observación',
            key: 'obs',
            render: (_, record) => (
                <TextArea disabled rows={4} maxLength={6} value={record.observacion}/>
            ),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Flex gap={"small"} justify="center" align="center">
                    <Button type="primary" shape="circle" style={{backgroundColor:colors.blue}} icon={<UserCircleCheck size={20} color={colors.white} />} />
                    <Button onClick={showMdObs} type="primary" shape="circle" style={{backgroundColor:colors.cian}} icon={<PencilSimpleLine size={20} color={colors.white} />} />
                </Flex>
            ),
        },
    ];

    return columns;
};