import React, { useState } from "react";
import { Flex, Typography, Layout, Menu, Breadcrumb, Button, Row, Col, Collapse, Input, Select, DatePicker, Table } from "antd";
const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Header, Footer, Sider, Content } = Layout;
import { ListTipoCaso } from "../../../../utils/constants";
import { colors } from "../../../../utils/colors";
import api from "../../../../services/api";
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

function ListadoLegajosWeb(props) {
    const { onClickDetalle, onClickDocsIngreso, onClickDocsSalida,
        onClickEstado, onClickDownload, onChangeCollapse, abogados,allLegajos, 
        paginador,loading, onChange,request,setRequest,onReset,form,loadingsPDF,onClickExcel,excelLoading} = props;

    



    const handleOnFieldsChange = (changeFields, allFields) => {
        const campo = changeFields[0].name[0];
        switchOnFieldsChange(campo, changeFields, setRequest);
    };

    const columns = ColumnsLegajo(
        onClickDetalle,
        onClickDocsIngreso,
        onClickDocsSalida,
        onClickEstado,
        onClickDownload,
        loadingsPDF
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
                    <Button loading={excelLoading} onClick={onClickExcel} type="primary" icon={<MicrosoftExcelLogo size={16} weight="fill" color="white" />}>Exportar</Button>
                </Flex>
                <br></br>
                <Table
                    style={{ width: "100%" }}
                    loading = {loading}
                    rowKey="legajoId"
                    columns={columns}
                    dataSource={paginador?.data}
                    pagination={{
                        onChange,
                        total: paginador?.count,
                        pageSize: paginador?.pageSize,
                        current: paginador?.pageIndex,
                        showSizeChanger: true,
                        showTotal: (total) => `Hay ${total} registros`,
                      }}
                    size="small"

                />
            </Flex>
        </>
    );

}

export default ListadoLegajosWeb;