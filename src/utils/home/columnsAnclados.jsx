import React from "react";
import { Tag, Flex, Button,Typography } from "antd";
import {FilePdfOutlined} from '@ant-design/icons';
import { colors } from "../colors";
const {Text} = Typography;
import { 
    PushPin,
 } from "@phosphor-icons/react";

export const ColumnsAnclados = (onPinClick) => {
    const columns = [
        {
            title: '',
            dataIndex: '',
            key: 'anclar',
            render: (_, record) => (
                <Button onClick={onPinClick} size="small" shape="circle" type="text" icon={<PushPin size={16} weight="fill"/>} ></Button>
            ),
        },
        {
            title: 'Legajo',
            dataIndex: 'legajoCodigo',
            key: 'legajoCodigo'
        },
        {
            title: 'Caso',
            dataIndex: 'tipoCaso',
            key: 'tipoCaso',
        },
        {
            title: 'Nro Caso',
            dataIndex: 'nroCaso',
            key: 'nroCaso',
        },
        {
            title: 'Lugar',
            dataIndex: 'lugar',
            key: 'lugar',
            render: (_, record) => (
                <Text>{record.distritoJudicial?record.distritoJudicial:record.lugar}</Text>
            ),
        },
        {
            title: 'Situación',
            key: 'sj',
            render: (_, record) => (
                <Tag color='geekblue'>{record.situacionJuridica}</Tag>
            ),
        },
        
    ];
    
    return columns;
};