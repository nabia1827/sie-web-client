import React, { useState, useEffect } from "react";
import { Flex, Typography, Button, Tag, Row, Col, Spin, Empty,Switch } from "antd";
import InfoCard from "../../../../../../components/consultaLegajos/InfoCard";
const { Text } = Typography
import { PencilSimpleLine, FileText, User, Path, MapPin } from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
import { useParams } from 'react-router-dom';
import { GetInfoLegajoById } from "../../../../../../utils/consultaLegajos/dinamicCalls";

function InfoGeneralWeb(props) {
    const { legajo, loadingInfo, showMdDele, showMdHechos,onClickTipoProceso } = props;

    return (
        <>
            <Spin spinning={loadingInfo} style={{ width: "100%", minHeight: "60vh" }}>
                {legajo ? (
                    <Flex vertical justify="center" align="center" style={{ width: "100%", height: "100%" }}>
                        <Row gutter={[8, 8]} justify={"center"} align={"center"} style={{ width: "100%", minHeight: "12vh" }}>
                            <Col xs={12} sm={12} md={12} lg={8} xl={5}>
                                <InfoCard IconComponent={FileText} subtitle="CARPETA FISCAL" title={legajo.carpetaFiscal ? legajo.carpetaFiscal : "No definido"} copyable={{ tooltips: false, }}></InfoCard>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={8} xl={5}>
                                <InfoCard IconComponent={FileText} subtitle="EXPEDIENTE" title={legajo.expediente ? legajo.expediente : "No definido"} copyable={false}></InfoCard>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={8} xl={5}>
                                <InfoCard IconComponent={User} subtitle="ABOGADO" title={legajo.abogado ? legajo.abogado : "No asignado"} copyable={false}></InfoCard>
                            </Col>
                            <Col xs={12} sm={12} md={12} lg={12} xl={5}>
                                <InfoCard IconComponent={Path} subtitle="SITUACIÓN JURIDICA" title={legajo.situacionJuridica ? legajo.situacionJuridica : "--"} copyable={false}></InfoCard>
                            </Col>
                            <Col xs={24} sm={24} md={24} lg={12} xl={4}>
                                <InfoCard IconComponent={MapPin} subtitle="LUGAR" title={legajo.distritoJudicial ? legajo.distritoJudicial : legajo.lugar} copyable={false}></InfoCard>
                            </Col>

                        </Row>
                        <br></br>
                        <Row gutter={[8, 8]} justify={"center"} align={"center"} style={{ width: "100%" }}>
                            <Col xs={24} sm={24} md={12} lg={8} xl={6} >
                                <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", borderRight: `1px solid ${colors.lightGray}`, height: "100%", padding: "1.0em" }}>
                                    <Text className="sie-info-column-subtitle" >
                                        DATOS GENERALES
                                    </Text>
                                    <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                        <Text className="sie-info-column-label" >
                                            Delitos:
                                        </Text>
                                        <ul style={{ margin: "0em 0" }}>
                                            {legajo.delitos.map((d, index) => (
                                                <li key={d.delitoId}>
                                                    {d.delitoNombre}
                                                </li>
                                            ))}
                                        </ul>
                                    </Flex>

                                    <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                        <Text className="sie-info-column-label" >
                                            Fecha Registro:
                                        </Text>
                                        <Text className="sie-info-column-content" >
                                            {legajo.fechaRegistro ? legajo.fechaRegistro : "--"}
                                        </Text>
                                    </Flex>
                                    <Flex vertical gap={"small"} justify="center" align="flex-start" style={{ width: "100%" }}>
                                        <Text className="sie-info-column-label" >
                                            Registrador:
                                        </Text>
                                        <Text className="sie-info-column-content" >
                                            {legajo.registrador ? legajo.registrador : "--"}
                                        </Text>
                                    </Flex>
                                    {legajo.legajoAsociado && (
                                        <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                            <Text className="sie-info-column-label" >
                                                Legajo Asociado:
                                            </Text>
                                            <Text className="sie-info-column-content" copyable={{ tooltips: false, }}>
                                                {legajo.legajoAsociado ? legajo.legajoAsociado : "--"}
                                            </Text>
                                        </Flex>
                                    )

                                    }
                                    <Flex vertical gap={"small"} justify="center" align="flex-start" style={{ width: "100%" }}>
                                        <Text className="sie-info-column-label" >
                                            Delegado:
                                        </Text>
                                        <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                            <Text className="sie-info-column-content" >
                                                {legajo.delegadoNombre ? legajo.delegadoNombre : "No asignado"}
                                            </Text>
                                            <Button onClick={() => showMdDele()} type="text" icon={<PencilSimpleLine size={24} />}>

                                            </Button>
                                        </Flex>

                                    </Flex>
                                </Flex>
                            </Col>

                            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
                                <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", borderRight: `1px solid ${colors.lightGray}`, height: "100%", padding: "1.0em" }}>
                                    <Text className="sie-info-column-subtitle" >
                                        DATOS FISCALIA
                                    </Text>

                                    <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                        <Text className="sie-info-column-label" >
                                            Fiscalia:
                                        </Text>
                                        <Text className="sie-info-column-content" >
                                            {legajo.fiscaliaNombre ? legajo.fiscaliaNombre : "--"}
                                        </Text>
                                    </Flex>
                                    <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                        <Text className="sie-info-column-label" >
                                            Correo:
                                        </Text>
                                        <Text className="sie-info-column-content" >
                                            {legajo.fiscaliaCorreo ? legajo.fiscaliaCorreo : "No especificado"}
                                        </Text>
                                    </Flex>
                                    <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                        <Text className="sie-info-column-label" >
                                            Fiscal Titular:
                                        </Text>
                                        <Text className="sie-info-column-content">
                                            {legajo.fiscalTitular ? legajo.fiscalTitular : "No especificado"}
                                        </Text>
                                    </Flex>
                                    <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                        <Text className="sie-info-column-label" >
                                            Fiscal Adjunto:
                                        </Text>
                                        <Text className="sie-info-column-content" >
                                            {legajo.fiscalAdjunto ? legajo.fiscalAdjunto : "No especificado"}
                                        </Text>

                                    </Flex>
                                </Flex>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={8} xl={6}>
                                <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", borderRight: `1px solid ${colors.lightGray}`, height: "100%", padding: "1.0em" }}>
                                    <Text className="sie-info-column-subtitle" >
                                        JUZGADOS
                                    </Text>
                                    {legajo.juzgadoIPNombre && legajo.juzgadoENombre ? (
                                        <Text className="sie-info-column-content" >
                                            El caso tiene asignado los siguientes juzgados:
                                        </Text>
                                    ) : (
                                        <Text className="sie-info-column-content" >
                                            No asignado todavía
                                        </Text>
                                    )

                                    }
                                    <ul style={{ margin: "0em 0" }}>
                                        {legajo.juzgadoIPNombre && (
                                            <li key={"JIP"} style={{ textAlign: "left" }}>
                                                {legajo.juzgadoIPNombre}
                                            </li>
                                        )
                                        }
                                        {legajo.juzgadoENombre && legajo.juzgadoENombre!=legajo.juzgadoIPNombre  && (
                                            <li key={"JIP"} style={{ textAlign: "left" }}>
                                                {legajo.juzgadoENombre}
                                            </li>
                                        )
                                        }
                                    </ul>
                                    <br></br>
                                    <Text className="sie-info-column-subtitle" >
                                        STATUS
                                    </Text>

                                    <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                        <Text className="sie-info-column-label" >
                                            Estado:
                                        </Text>
                                        {legajo.estado && (
                                            <Tag color="geekblue">{legajo.estado}</Tag>
                                        )}

                                    </Flex>
                                    <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                        <Text className="sie-info-column-label" >
                                            Tipo:
                                        </Text>
                                        {legajo.estado && (
                                            <Tag color="geekblue">{legajo.tipoProceso}</Tag>
                                        )}
                                        <Switch size="small" value={legajo.esProcesoInmediato} onClick={() => onClickTipoProceso(!legajo.esProcesoInmediato)}></Switch>

                                    </Flex>

                                </Flex>
                            </Col>
                            <Col xs={24} sm={24} md={12} lg={24} xl={6}>
                                <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", height: "100%", textAlign: "justify", padding: "1.0em" }}>

                                    <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%" }}>
                                        <Text className="sie-info-column-subtitle" >
                                            HECHOS DEL CASO
                                        </Text>
                                        <Button onClick={() => showMdHechos()} type="text" icon={<PencilSimpleLine size={24} />}>

                                        </Button>
                                    </Flex>

                                    <Typography.Paragraph
                                        ellipsis={{
                                            rows: 10,
                                            expandable: false,


                                        }}
                                        copyable
                                    >
                                        {legajo.hechosNombre ? legajo.hechosNombre : "No especificado"}
                                    </Typography.Paragraph>


                                </Flex>
                            </Col>
                        </Row>



                    </Flex>
                ) : (
                    <Flex justify="center" align="center" style={{ width: "100%", minHeight: "60vh" }}>
                        <Empty description={false} />
                    </Flex>

                )}

            </Spin>

        </>
    );

}

export default InfoGeneralWeb;