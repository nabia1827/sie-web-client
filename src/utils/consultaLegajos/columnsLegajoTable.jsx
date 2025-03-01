import React from "react";
import { Tag, Flex, Button,Typography } from "antd";
import {FilePdfOutlined} from '@ant-design/icons';
import { colors } from "../colors";
const {Text} = Typography;
import { 
    CalendarBlank, 
    Eye,
    FileArrowDown,
    FileArrowUp,
    PencilSimpleLine,
    PushPin,
 } from "@phosphor-icons/react";

export const ColumnsLegajo = (onClickDetalle,onClickDocsIngreso,onClickDocsSalida,onClickEstado,onClickDownload,loadingsPDF,onPinClick) => {
    const columns = [
        {
            title: 'Legajo',
            dataIndex: 'legajoCodigo',
            key: 'legajoCodigoTxt',
            width:'130px',
            render: (_, record) => (
                <Flex gap={"small"} justify="center" align="center">
                    {record.anclado?
                    <Button onClick={()=>onPinClick(record.legajoId)} type="text" size="small" shape="circle" icon={<PushPin size={16} weight="fill" color={colors.lightBlack} />}></Button>
                    :
                    <Button onClick={()=>onPinClick(record.legajoId)} type="text" size="small" shape="circle" icon={<PushPin size={16} color={colors.gray} />}></Button>

                    }
                    <Text>{record.legajoCodigo}</Text>
                    
                </Flex>
            ),
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
            title: 'Abogado',
            dataIndex: 'abogado',
            key: 'abogado',
        },
        {
            title: 'Situación',
            key: 'sj',
            render: (_, record) => (
                <Tag color='geekblue'>{record.situacionJuridica}</Tag>
            ),
        },
        {
            title: 'Fecha Registro',
            dataIndex: 'fechaRegistro',
            key: 'fechaRegistro',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record, index) => (
                <Flex gap={"small"} justify="center" align="center">
                    <Button onClick={() => onClickDetalle(record.legajoId)} type="primary" shape="circle" style={{backgroundColor:colors.lightBlack}} icon={<Eye size={20} color={colors.white} />} />
                    <Button onClick={() => onClickDocsIngreso(record.legajoId)} type="primary" shape="circle" style={{backgroundColor:colors.cian}} icon={<FileArrowDown size={20} color={colors.white} />} />
                    <Button onClick={() => onClickDocsSalida(record.legajoId)} type="primary" shape="circle" style={{backgroundColor:colors.cian}} icon={<FileArrowUp size={20} color={colors.white} />} />
                    <Button onClick={() => onClickEstado(record)} type="primary" shape="circle" style={{backgroundColor:colors.blue}} icon={<PencilSimpleLine size={20} color={colors.white} />} />
                    <Button loading={loadingsPDF[index]} onClick={() =>onClickDownload(index,record.legajoId)} size="large" type="text" shape="circle" icon={<FilePdfOutlined size={28}  style={{color:colors.red}} />} />
                </Flex>
            ),
        }
    ];
    
    return columns;
};