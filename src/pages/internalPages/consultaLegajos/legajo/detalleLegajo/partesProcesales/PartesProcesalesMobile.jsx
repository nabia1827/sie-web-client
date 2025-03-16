import React from "react";
import { Flex, Typography, Table, Spin, Empty, } from "antd";
const { Text } = Typography;
import {
    Users
} from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
import ParteProcesalCard from "../../../../../../components/consultaLegajos/ParteProcesalCard";

function PartesProcesalesMobile(props) {
    const { imputados, agraviados, loadingPp } = props;

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
                                {imputados?.map((imp) => (
                                    <ParteProcesalCard tipo={1} pp={imp} />
                                ))

                                }

                                {agraviados?.map((agr) => (
                                    <ParteProcesalCard tipo={2} pp={agr} />
                                ))

                                }


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

export default PartesProcesalesMobile;