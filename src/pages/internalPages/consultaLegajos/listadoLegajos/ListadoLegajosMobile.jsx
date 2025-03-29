import React, { useState } from "react";
import { Flex, Typography, Layout, Menu, Breadcrumb, Button, Row, Col, Collapse, Input, Select, DatePicker, Table, Pagination } from "antd";
const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Header, Footer, Sider, Content } = Layout;
import { ListTipoCaso } from "../../../../utils/constants";
import { colors } from "../../../../utils/colors";
import api from "../../../../services/api";
import CardLegajo from "../../../../components/listadoLegajos/CardLegajo";
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
import { fourFiltersStyle, fiveFiltersStyle, fourFiltersRangeStyle, fiveFiltersRangeStyle } from "../../../../utils/styles";
import LegajoFilter from "../../../../components/consultaLegajos/LegajoFilter";
import useLegajoFilteredData from "../../../../hooks/filters/useLegajoFilteredData";
import { switchOnFieldsChange } from "../../../../utils/consultaLegajos/switchOnFieldsChange";
import { ignore } from "antd/es/theme/useToken";



function ListadoLegajosMobile(props) {
    const { onClickDetalle, onClickDocsIngreso, onClickDocsSalida, onPinClick,
        onClickEstado, onClickDownload, onChangeCollapse, abogados, allLegajos,
        paginador, loading, onChange, request, setRequest, onReset, form, loadingsPDF, onClickExcel, excelLoading } = props;

    const handleOnFieldsChange = (changeFields, allFields) => {
        const campo = changeFields[0].name[0];
        switchOnFieldsChange(campo, changeFields, setRequest);
    };

    console.log("paginador: ", paginador.data)

    const columns = ColumnsLegajo(
        onClickDetalle,
        onClickDocsIngreso,
        onClickDocsSalida,
        onClickEstado,
        onClickDownload,
        loadingsPDF,
        onPinClick
    )

    return (
        <>
            <LegajoFilter
                onChangeCollapse={onChangeCollapse}
                abogados={abogados}
                form={form}
                onReset={onReset}
                handleOnFieldsChange={handleOnFieldsChange}
            ></LegajoFilter>
            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", backgroundColor: colors.white, margin: "1.0em 0.0em", borderRadius: "0.7em", padding: "1.5em" }}>
                <Flex justify="space-between" align="center" style={{ width: "100%" }}>
                    <Text className="sie-content-title">Todos los Resultados</Text>
                    <Button loading={excelLoading} onClick={onClickExcel} type="primary" icon={<MicrosoftExcelLogo size={16} weight="fill" color="white" />}></Button>
                </Flex>
                <Flex justify="center" align="center" style={{ width: "100%" }}>
                    <Pagination
                        current={paginador?.pageIndex}
                        pageSize={paginador?.pageSize}
                        onChange={onChange}
                        total={paginador?.count}
                        style={{ marginTop: '16px', textAlign: 'center' }}
                    />
                </Flex>

                {
                    paginador.data && paginador.data.length > 0 ? (
                        paginador?.data.map((record, index) => (
                            <CardLegajo
                                onClickDetalle={onClickDetalle}
                                onClickDocsIngreso={onClickDocsIngreso}
                                onClickDocsSalida={onClickDocsSalida}
                                onClickEstado={onClickEstado}
                                onClickDownload={onClickDownload}
                                loadingsPDF={loadingsPDF}
                                onPinClick={onPinClick}
                                record={record}
                                index={index}
                            />
                        ))

                    ) :
                        <></>
                }



            </Flex>
        </>
    );

}

export default ListadoLegajosMobile;