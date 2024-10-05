import React from "react";
import { Flex, Table, Typography, Button } from "antd";
import { colors } from "../../../../../utils/colors";
import { ColumnsDocsSalida } from "../../../../../utils/consultaLegajos/columnsDocsSalida";
import {
    FileText,Plus
} from "@phosphor-icons/react";
const { Text } = Typography;

function DocsSalidaWeb(props) {
    const { showMdCrearRecurso, showMdEditarRecurso } = props;

    const columns = ColumnsDocsSalida(showMdEditarRecurso)
    const data = [
        {
            fechaCreacion: "12/05/2024",
            abogado: "Pedro Pablo Pachas de la Cruz",
            tipoDocumento: "Escrito",
            destinatario: "2° Fiscalia Provincial Penal Corporativa de Cajamarca",
        },
        {
            fechaCreacion: "16/05/2024",
            abogado: "Pedro Pablo Pachas de la Cruz",
            tipoDocumento: "Escrito",
            destinatario: "2° Fiscalia Provincial Penal Corporativa de Cajamarca",
        },
        {
            fechaCreacion: "16/05/2024",
            abogado: "Pedro Pablo Pachas de la Cruz",
            tipoDocumento: "Escrito",
            destinatario: "2° Fiscalia Provincial Penal Corporativa de Cajamarca",
        }
    ]

    return (
        <>
            <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.7em", minHeight: "74vh", backgroundColor: "white", borderRadius: "0.7em" }}>
                <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%" }}>
                    <Flex gap={"small"} justify="flex-start" align="center" >
                        <FileText size={24} color={colors.lightBlack} />
                        <Text className="sie-content-title">Documentos de Salida</Text>
                    </Flex>
                    <Button onClick={showMdCrearRecurso} type="primary" icon={<Plus size={16}  color="white" />}>Crear Documento</Button>
                </Flex>
                <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%", backgroundColor: colors.lightBlue, padding: "0.7em 1.4em", marginBottom: "1.0em", marginTop: "1.0em", borderRadius: "0.4em" }}>
                    <Flex gap={"small"} justify="flex-start" align="center">
                        <Text className="sie-info-column-label" >
                            Carpeta Fiscal:
                        </Text>
                        <Text className="sie-info-column-content" >
                            2023-4818-0
                        </Text>
                    </Flex>

                    <Flex gap={"small"} justify="flex-start" align="center">
                        <Text className="sie-info-column-label" >
                            Lugar:
                        </Text>
                        <Text className="sie-info-column-content" >
                            Cajamarca
                        </Text>
                    </Flex>

                    <Flex gap={"small"} justify="flex-start" align="center">
                        <Text className="sie-info-column-label" >
                            Estado:
                        </Text>
                        <Text className="sie-info-column-content" >
                            Inv. Preparatoria
                        </Text>
                    </Flex>
                </Flex>
                <br></br>
                <Flex vertical gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                    <Table
                        style={{ width: "100%" }}
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            pageSize: 5,
                            size: "small"
                        }}
                        size="small"
                    />


                </Flex>

            </Flex>
        </>
    );

}

export default DocsSalidaWeb;