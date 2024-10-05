import React from "react";
import { Flex, Typography, Button, Tag, Row, Col } from "antd";
import InfoCard from "../../../../../../components/consultaLegajos/InfoCard";
const { Text } = Typography
import { PencilSimpleLine, FileText, User, Path, MapPin } from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
function InfoGeneralWeb() {

    return (
        <>
            <Flex vertical justify="center" align="center" style={{ width: "100%", height: "100%" }}>
                <Row gutter={[8, 8]} justify={"center"} align={"center"} style={{ width: "100%" }}>
                    <Col xs={12} sm={12} md={5} lg={5} xl={5}>
                        <InfoCard IconComponent={FileText} subtitle="CARPETA FISCAL" title="2023-4818-0" copyable={{ tooltips: false, }}></InfoCard>
                    </Col>
                    <Col xs={12} sm={12} md={5} lg={5} xl={5}>
                        <InfoCard IconComponent={FileText} subtitle="EXPEDIENTE" title="No definido" copyable={false}></InfoCard>
                    </Col>
                    <Col xs={12} sm={12} md={5} lg={5} xl={5}>
                        <InfoCard IconComponent={User} subtitle="ABOGADO" title="Pedro Pachas" copyable={false}></InfoCard>
                    </Col>
                    <Col xs={12} sm={12} md={5} lg={5} xl={5}>
                        <InfoCard IconComponent={Path} subtitle="SITUACIÓN JURIDICA" title="Inv. Preparatoria" copyable={false}></InfoCard>
                    </Col>
                    <Col xs={24} sm={24} md={4} lg={4} xl={4}>
                        <InfoCard IconComponent={MapPin} subtitle="LUGAR" title="Cajarmarca" copyable={false}></InfoCard>
                    </Col>

                </Row>
                <br></br>
                <Row gutter={[8, 8]} justify={"center"} align={"center"} style={{ width: "100%" }}>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} >
                        <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", borderRight: `1px solid ${colors.lightGray}`, height: "100%", padding: "1.0em" }}>
                            <Text className="sie-info-column-subtitle" >
                                DATOS GENERALES
                            </Text>
                            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                <Text className="sie-info-column-label" >
                                    Delitos:
                                </Text>
                                <ul style={{ margin: "0em 0" }} >
                                    <li>
                                        Tenencia Ilegal de Armas
                                    </li>
                                    <li>
                                        Resistencia y desobediencia a la autoridad
                                    </li>
                                    <li>
                                        Homicidio Culposo
                                    </li>
                                </ul>
                            </Flex>

                            <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                <Text className="sie-info-column-label" >
                                    Fecha Registro:
                                </Text>
                                <Text className="sie-info-column-content" >
                                    30/09/2024 12:14:45
                                </Text>
                            </Flex>
                            <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                <Text className="sie-info-column-label" >
                                    Registrador:
                                </Text>
                                <Text className="sie-info-column-content" >
                                    Juan Perez Cruz
                                </Text>
                            </Flex>
                            <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                <Text className="sie-info-column-label" >
                                    Legajo Asociado:
                                </Text>
                                <Text className="sie-info-column-content" copyable={{ tooltips: false, }}>
                                    123456789
                                </Text>
                            </Flex>
                            <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                <Text className="sie-info-column-label" >
                                    Delegado:
                                </Text>
                                <Text className="sie-info-column-content" >
                                    Rosa Dominguez Rua
                                </Text>
                                <Button type="text" icon={<PencilSimpleLine size={24} />}>

                                </Button>
                            </Flex>
                        </Flex>
                    </Col>
                
                    <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                        <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", borderRight: `1px solid ${colors.lightGray}`, height: "100%", padding: "1.0em" }}>
                            <Text className="sie-info-column-subtitle" >
                                DATOS FISCALIA
                            </Text>

                            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                <Text className="sie-info-column-label" >
                                    Fiscalia:
                                </Text>
                                <Text className="sie-info-column-content" >
                                    2° Fiscalia Provincial Penal Corporativa de Cajamarca
                                </Text>
                            </Flex>
                            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                <Text className="sie-info-column-label" >
                                    Correo:
                                </Text>
                                <Text className="sie-info-column-content" >
                                    fiscaliacajamarca@mp.gob.pe
                                </Text>
                            </Flex>
                            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                <Text className="sie-info-column-label" >
                                    Fiscal Titular:
                                </Text>
                                <Text className="sie-info-column-content">
                                    Pepito Perez Huamani
                                </Text>
                            </Flex>
                            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                <Text className="sie-info-column-label" >
                                    Fiscal Adjunto:
                                </Text>
                                <Text className="sie-info-column-content" >
                                    Jose Perez Sandoval
                                </Text>

                            </Flex>
                        </Flex>
                    </Col>
                    <Col xs={24} sm={12} md={6} lg={6} xl={6}>
                        <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", borderRight: `1px solid ${colors.lightGray}`, height: "100%", padding: "1.0em" }}>
                            <Text className="sie-info-column-subtitle" >
                                DATOS JUZGADO
                            </Text>

                            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                <Text className="sie-info-column-label" >
                                    Juzgado:
                                </Text>
                                <Text className="sie-info-column-content" >
                                    Juzgado de Investigacion Preparatoria Sede Nueva Cajamarca
                                </Text>
                            </Flex>
                            <Flex vertical gap={"small"} justify="flex-start" align="flex-start" style={{ width: "100%", textAlign: "left" }}>
                                <Text className="sie-info-column-label" >
                                    Correo:
                                </Text>
                                <Text className="sie-info-column-content" >
                                    juzgadocajamarca@pj.gob.pe
                                </Text>
                            </Flex>
                            <br></br>
                            <Text className="sie-info-column-subtitle" >
                                STATUS
                            </Text>

                            <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                <Text className="sie-info-column-label" >
                                    Estado:
                                </Text>
                                <Tag color="geekblue">En trámite</Tag>
                            </Flex>

                        </Flex>
                    </Col>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6}>
                        <Flex gap={"small"} vertical justify="flex-start" align="flex-start" style={{ width: "100%", height: "100%", textAlign: "justify", padding: "1.0em" }}>
                            <Text className="sie-info-column-subtitle" >
                                HECHOS DEL CASO
                            </Text>

                            <Typography.Paragraph
                                ellipsis={{
                                    rows: 10,
                                    expandable: false,


                                }}
                                copyable
                            >
                                {"To be, or not to be, that is the question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, 'tis a consummation Devoutly to be wish'd. To die, to sleep To sleep- perchance to dream: ay, there's the rub! For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. There 's the respect That makes calamity of so long life William Shakespeare"}
                            </Typography.Paragraph>


                        </Flex>
                    </Col>
                </Row>



            </Flex>
        </>
    );

}

export default InfoGeneralWeb;