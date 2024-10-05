import React, { useState } from "react";
import { Flex, Typography, Layout, Menu, Breadcrumb, Button, Tooltip, Avatar, Badge, Collapse, Input, Select, DatePicker, Table } from "antd";
const { Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
import { ListTipoCaso } from "../../../../utils/constants";
import { colors } from "../../../../utils/colors";

import {
    Lightning,
    Funnel,
    Bell,
    FileText,
    CalendarBlank,
    ChartBar,
    HandArrowDown,
    EnvelopeSimple,
    MicrosoftExcelLogo
} from "@phosphor-icons/react";

import { ColumnsLegajo } from "../../../../utils/consultaLegajos/columnsLegajoTable";


function ListadoLegajosWeb(props) {
    const { onClickDetalle, onClickDocsIngreso, onClickDocsSalida,
        onClickEstado, onClickDownload, onChangeCollapse, pageSize } = props;

    const columns = ColumnsLegajo(
        onClickDetalle,
        onClickDocsIngreso,
        onClickDocsSalida,
        onClickEstado,
        onClickDownload
    )


    const data = [
        {
            key: '1',
            legajo: '123456789',
            tipoCaso: 'Carpeta Fiscal',
            nroCaso: '2717',
            lugar: 'Cajamarca',
            abogado: 'Nabia Pachas',
            situacionJudicialColor: 'geekblue',
            situacionJudicialNombre: 'Inv. Preparatoria',
            fechaRegistro: '17/12/2003',
        },
        {
            key: '2',
            legajo: '123456789',
            tipoCaso: 'Carpeta Fiscal',
            nroCaso: '2717',
            lugar: 'Cajamarca',
            abogado: 'Nabia Pachas',
            situacionJudicialColor: 'geekblue',
            situacionJudicialNombre: 'Inv. Preparatoria',
            fechaRegistro: '17/12/2003',
        },
        {
            key: '3',
            legajo: '123456789',
            tipoCaso: 'Carpeta Fiscal',
            nroCaso: '2717',
            lugar: 'Cajamarca',
            abogado: 'Nabia Pachas',
            situacionJudicialColor: 'geekblue',
            situacionJudicialNombre: 'Inv. Preparatoria',
            fechaRegistro: '17/12/2003',
        },
        {
            key: '4',
            legajo: '123456789',
            tipoCaso: 'Carpeta Fiscal',
            nroCaso: '2717',
            lugar: 'Cajamarca',
            abogado: 'Nabia Pachas',
            situacionJudicialColor: 'geekblue',
            situacionJudicialNombre: 'Inv. Preparatoria',
            fechaRegistro: '17/12/2003',
        },
        {
            key: '5',
            legajo: '123456789',
            tipoCaso: 'Carpeta Fiscal',
            nroCaso: '2717',
            lugar: 'Cajamarca',
            abogado: 'Nabia Pachas',
            situacionJudicialColor: 'geekblue',
            situacionJudicialNombre: 'Inv. Preparatoria',
            fechaRegistro: '17/12/2003',
        },
        {
            key: '6',
            legajo: '123456789',
            tipoCaso: 'Carpeta Fiscal',
            nroCaso: '2717',
            lugar: 'Cajamarca',
            abogado: 'Nabia Pachas',
            situacionJudicialColor: 'geekblue',
            situacionJudicialNombre: 'Inv. Preparatoria',
            fechaRegistro: '17/12/2003',
        },

    ];





    return (
        <>
            <Collapse
                onChange={onChangeCollapse}
                items={[
                    {
                        key: '1',
                        label:
                            <Flex gap={"small"} justify="flex-start" align="center">
                                <Funnel size={24} color={colors.blue} />
                                <Text className="sie-content-filter">Filtros</Text>
                            </Flex>,
                        children:
                            <Flex gap={"middle"} justify="flex-start" align="flex-end" style={{ width: "100%" }}>
                                <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "17%" }} >
                                    <Text>Legajo: </Text>
                                    <Input placeholder="Legajo" size="large" style={{ width: "100%", height: "36px" }} />
                                </Flex>
                                <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "17%" }} >
                                    <Text> Tipo de caso: </Text>

                                    <Select
                                       
                                        style={{ width: "100%", height: "36px" }}
                                        placeholder="Número de caso"
                                        allowClear
                                    >
                                        {
                                            ListTipoCaso.map((t) => (
                                                <Option key={t.tipoCasoId} value={t.tipoCasoId}>
                                                    {t.tipoCasoNombre}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </Flex>

                                <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "17%" }} >
                                    <Text> Número de caso: </Text>
                                    <Input placeholder="Legajo" size="large" style={{ width: "100%", height: "36px" }} />
                                </Flex>

                                <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "18%" }} >
                                    <Text> Fecha Registro Inicio: </Text>
                                    <DatePicker style={{ width: "100%", height: "36px" }} />
                                </Flex>

                                <Flex gap={"small"} vertical justify="center" align="flex-start" style={{ width: "18%" }} >
                                    <Text> Fecha Registro Fin: </Text>
                                    <DatePicker style={{ width: "100%", height: "36px" }} />
                                </Flex>

                                <Flex gap={"small"} vertical justify="flex-end" align="center" style={{ width: "13%", height: "100%" }} >
                                    <Button type="primary" style={{ backgroundColor: colors.lightBlack, width: "100%", height: "36px" }}>
                                        Limpiar
                                    </Button>
                                </Flex>

                            </Flex>,
                        showArrow: false,
                    },
                ]}
            />
            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", backgroundColor: colors.white, margin: "1.0em 0.0em", borderRadius: "0.7em", padding: "1.5em" }}>
                <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                    <Text className="sie-content-title">Todos los Resultados</Text>
                    <Button type="primary" icon={<MicrosoftExcelLogo size={16} weight="fill" color="white" />}>Exportar</Button>
                </Flex>
                <br></br>
                <Table
                    style={{ width: "100%" }}
                    columns={columns}
                    dataSource={data}
                    pagination={{
                        pageSize: pageSize,
                    }}
                    size="small"

                />
            </Flex>
        </>
    );

}

export default ListadoLegajosWeb;