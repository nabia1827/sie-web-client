import React from "react";
import { Tag, Flex, Button } from "antd";
import {FilePdfOutlined} from '@ant-design/icons';
import { colors } from "../colors";

import { 
    CalendarBlank, 
    Eye,
    FileArrowDown,
    FileArrowUp,
    PencilSimpleLine,
 } from "@phosphor-icons/react";

export const ColumnsLegajo = (onClickDetalle,onClickDocsIngreso,onClickDocsSalida,onClickEstado,onClickDownload) => {
    const columns = [
        {
            title: 'Legajo',
            dataIndex: 'legajo',
            key: 'legajo'
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
                <Tag color={record.situacionJudicialColor}>{record.situacionJudicialNombre}</Tag>
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
            render: (_, record) => (
                <Flex gap={"small"} justify="center" align="center">
                    <Button onClick={() => onClickDetalle(record.legajo)} type="primary" shape="circle" style={{backgroundColor:colors.lightBlack}} icon={<Eye size={20} color={colors.white} />} />
                    <Button onClick={() =>onClickDocsIngreso(record.legajo)} type="primary" shape="circle" style={{backgroundColor:colors.cian}} icon={<FileArrowDown size={20} color={colors.white} />} />
                    <Button onClick={()=>onClickDocsSalida(record.legajo)} type="primary" shape="circle" style={{backgroundColor:colors.cian}} icon={<FileArrowUp size={20} color={colors.white} />} />
                    <Button onClick={onClickEstado} type="primary" shape="circle" style={{backgroundColor:colors.blue}} icon={<PencilSimpleLine size={20} color={colors.white} />} />
                </Flex>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Flex gap={"small"} justify="center" align="center">
                    <Button onClick={onClickDownload} size="large" type="text" shape="circle" icon={<FilePdfOutlined size={28}  style={{color:colors.red}} />} />
                    
                </Flex>
            ),
        },
    ];
    
    return columns;
};