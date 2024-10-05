import React from "react";
import { Flex, Table, Typography } from "antd";
import { colors } from "../../../../../utils/colors";
import { ColumnsDocsIngreso } from "../../../../../utils/consultaLegajos/columnsDocsIngreso";
import {
    FileText
} from "@phosphor-icons/react";

const { Text } = Typography;

function DocsIngresoWeb() {
    const columns = ColumnsDocsIngreso()

    const data = [
        {
            fechaRegistro:"31/06/2024",
            entidadRemitente:"2° Fiscalia Provincial Penal Corporativa de Cajamarca",
            tipoDocumento:"Oficio",
            nroDocumento:"01",
            registrador:"Aracelli Perez Ortega Sanchez"
        },
        {
            fechaRegistro:"31/06/2024",
            entidadRemitente:"2° Fiscalia Provincial Penal Corporativa de Cajamarca",
            tipoDocumento:"Oficio",
            nroDocumento:"01",
            registrador:"Aracelli Perez Ortega Sanchez"
        },
        {
            fechaRegistro:"31/06/2024",
            entidadRemitente:"2° Fiscalia Provincial Penal Corporativa de Cajamarca",
            tipoDocumento:"Oficio",
            nroDocumento:"01",
            registrador:"Aracelli Perez Ortega Sanchez"
        },
    ]

    return (
        <>
            <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.7em", minHeight: "74vh", backgroundColor: "white", borderRadius: "0.7em" }}>
                <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                    <FileText size={24} color={colors.lightBlack} />
                    <Text className="sie-content-title">Documentos de Ingreso</Text>
                </Flex>
                <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%", backgroundColor: colors.lightBlue,padding:"0.7em 1.4em",marginBottom:"1.0em",marginTop:"1.0em",borderRadius:"0.4em" }}>
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
                            size:"small"
                        }}
                        size="small"
                    />

                    
                </Flex>



            </Flex>
        </>
    );

}

export default DocsIngresoWeb;