import React from "react";
import { Flex, Typography, Table, Spin, Empty } from "antd";
const { Text } = Typography;
import {
    Users
} from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
import { ColumnsImputados, ColumnsAgraviados } from "../../../../../../utils/consultaLegajos/columnsPartesTable";

function PartesProcesalesWeb(props) {
    const { imputados, agraviados, loadingPp } = props;

    const columnsImputados = ColumnsImputados()
    const columnsAgraviados = ColumnsAgraviados()

    /*
    {
            imputado:"Debora Leon Sanchez",
            tipoDoc:"DNI",
            nroDoc:"72606359",
            delitos:["Tenencia Ilegal de Armas","Homicidio Culposo"],
            estado:"Investigado",
        },
    */

    /*
    {
            agraviado:"Ivan Fernandez Rodriguez",
            tipoDoc:"DNI",
            nroDoc:"72606348",
        },
    */


    return (
        <>
            <Spin spinning={loadingPp} style={{ width: "100%", minHeight: "60vh" }}>
                {
                    imputados && agraviados ? (
                        <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.0em" }}>
                            <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                <Users size={24} color={colors.lightBlack} />
                                <Text className="sie-content-title">Partes Procesales</Text>
                            </Flex>
                            <br></br>
                            <Flex vertical gap={"middle"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                <Table
                                    rowKey={"imputadoId"}
                                    style={{ width: "100%" }}
                                    columns={columnsImputados}
                                    dataSource={imputados}
                                    pagination={false}
                                    size="small"
                                />

                                <Table
                                    rowKey={"agraviadoId"}
                                    style={{ width: "100%" }}
                                    columns={columnsAgraviados}
                                    dataSource={agraviados}
                                    pagination={false}
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

export default PartesProcesalesWeb;