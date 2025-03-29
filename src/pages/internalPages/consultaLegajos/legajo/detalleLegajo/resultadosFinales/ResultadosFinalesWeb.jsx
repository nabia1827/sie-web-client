import React from "react";
import { Flex, Typography, Table, Spin, Empty } from "antd";
const { Text } = Typography;
import {
    FileText
} from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
import { ColumnsResultado } from "../../../../../../utils/consultaLegajos/columnsResultadoTable";

function ResultadosFinalesWeb(props) {
    const { showMdApel, resultados, loadingRes } = props;

    const columns = ColumnsResultado(showMdApel)


    return (
        <>
            <Spin spinning={loadingRes} style={{width:"100%", minHeight:"60vh"}} >
                {resultados.length>0 ? (
                    <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.0em" }}>
                        <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                            <FileText size={24} color={colors.lightBlack} />
                            <Text className="sie-content-title">Resultados del Proceso</Text>
                        </Flex>
                        <br></br>
                        <Flex vertical gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                            <Table
                                rowKey={"imputadoDelitoId"}
                                style={{ width: "100%" }}
                                columns={columns}
                                dataSource={resultados}
                                pagination={false}
                                size="small"
                            />

                        </Flex>
                    </Flex>
                ) : (
                    <Flex justify="center" align="center" style={{width:"100%",minHeight:"60vh"}}>
                        <Empty description={"Sin sentencia registrada"} />
                    </Flex>
                )

                }
            </Spin>

        </>
    );

}

export default ResultadosFinalesWeb;