import React from "react";
import { Flex, Table, Typography, Button, Empty, Spin } from "antd";
import { colors } from "../../../../../utils/colors";
import { ColumnsDocsSalida } from "../../../../../utils/consultaLegajos/columnsDocsSalida";
import {
    FileText, Plus
} from "@phosphor-icons/react";
const { Text } = Typography;

function DocsSalidaWeb(props) {
    const { showMdCrearRecurso, showMdEditarRecurso, legajo, docsSalida, loadingDocsSalida,
        onClickDownload,loadingsPDF
     } = props;

    const columns = ColumnsDocsSalida(showMdEditarRecurso,onClickDownload,loadingsPDF)
    
    return (
        <>
            <Spin spinning={loadingDocsSalida} style={{ width: "100%", minHeight: "60vh" }}>
                {legajo ? (
                    <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.7em", minHeight: "74vh", backgroundColor: "white", borderRadius: "0.7em" }}>
                        <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%" }}>
                            <Flex gap={"small"} justify="flex-start" align="center" >
                                <FileText size={24} color={colors.lightBlack} />
                                <Text className="sie-content-title">Documentos de Salida</Text>
                            </Flex>
                            <Button onClick={showMdCrearRecurso} type="primary" icon={<Plus size={16} color="white" />}>Crear Documento</Button>
                        </Flex>
                        <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%", backgroundColor: colors.lightBlue, padding: "0.7em 1.4em", marginBottom: "1.0em", marginTop: "1.0em", borderRadius: "0.4em" }}>
                            <Flex gap={"small"} justify="flex-start" align="center">
                                <Text className="sie-info-column-label" >
                                    Carpeta Fiscal:
                                </Text>
                                <Text className="sie-info-column-content" >
                                {legajo.carpetaFiscal?legajo.carpetaFiscal:"--"}
                                </Text>
                            </Flex>

                            <Flex gap={"small"} justify="flex-start" align="center">
                                <Text className="sie-info-column-label" >
                                    Lugar:
                                </Text>
                                <Text className="sie-info-column-content" >
                                {legajo.distritoJudicial?legajo.distritoJudicial:legajo.lugar}
                                </Text>
                            </Flex>

                            <Flex gap={"small"} justify="flex-start" align="center">
                                <Text className="sie-info-column-label" >
                                    Estado:
                                </Text>
                                <Text className="sie-info-column-content" >
                                {legajo.estado?legajo.estado:"--"}
                                </Text>
                            </Flex>
                        </Flex>
                        <br></br>
                        <Flex vertical gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                            <Table
                                rowKey={"docId"}
                                style={{ width: "100%" }}
                                columns={columns}
                                dataSource={docsSalida}
                                pagination={{
                                    pageSize: 4,
                                    size: "small"
                                }}
                                size="small"
                            />


                        </Flex>

                    </Flex>
                ) : (
                    <Flex justify="center" align="center" style={{ width: "100%", minHeight: "60vh" }}>
                        <Empty description={false} />
                    </Flex>

                )

                }
            </Spin>

        </>
    );

}

export default DocsSalidaWeb;