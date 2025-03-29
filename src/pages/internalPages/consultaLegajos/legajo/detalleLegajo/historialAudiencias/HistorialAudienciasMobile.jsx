import React from "react";
import { Flex, Typography, Table, Spin, Empty, Button } from "antd";
const { Text } = Typography;
import {
    CalendarBlank, ArrowsClockwise
} from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
import { ColumnsAudiencia } from "../../../../../../utils/consultaLegajos/columnsAudienciaTable";
import AudienciaCard from "../../../../../../components/consultaLegajos/AudienciaCard";

function HistorialAudienciasMobile(props) {
    const { showMdObs, audiencias, loadingAud, onClickAsistencia, onRefreshAudiencias } = props;


    return (
        <>
            <Spin spinning={loadingAud} style={{ width: "100%", minHeight: "60vh" }}>
                {audiencias.length > 0 ? (
                    <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.0em" }}>
                        <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%" }}>
                            <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                
                                <Text className="sie-content-title">Historial de Audiencias</Text>
                            </Flex>
                            <Button onClick={onRefreshAudiencias} type="text" icon={<ArrowsClockwise size={24} />}>

                            </Button>
                        </Flex>
                        <br></br>
                        <Flex vertical gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>

                            {audiencias?.map((a) => (
                                <AudienciaCard aud={a} showMdObs = {showMdObs} onClickAsistencia= {onClickAsistencia}/>
                            ))

                            }

                        </Flex>
                    </Flex>
                ) : (
                    <Flex justify="center" align="center" style={{ width: "100%", minHeight: "60vh" }}>
                        <Empty description={"Sin audiencias registradas"} />
                    </Flex>

                )

                }
            </Spin>

        </>
    );

}

export default HistorialAudienciasMobile;