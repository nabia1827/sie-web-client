import React from "react";
import { Flex, Typography, Table } from "antd";
const { Text } = Typography;
import {
    CalendarBlank
} from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
import { ColumnsAudiencia } from "../../../../../../utils/consultaLegajos/columnsAudienciaTable";
function HistorialAudienciasWeb(props){
    const { showMdObs} = props;

    const columns = ColumnsAudiencia(showMdObs)
    const data = [
        {
            fecha:"12/09/24",
            hora:"4PM",
            tipoAudiencia:"Audiencia de Prisión Preventina",
            link:"https://meet.google.com/rde-ahfv-nit",
            estado:"Pendiente",
            observacion:"Caso emblemático",            
        },
        {
            fecha:"10/06/24",
            hora:"2PM",
            tipoAudiencia:"Audiencia de Diligencias Preliminares",
            link:"https://meet.google.com/rde-ahfv-nit",
            estado:"Asistió",
            observacion:"Quedó inconcluso",            
        }
    ]



    return(
        <>
        <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding:"1.0em" }}>
                <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                    <CalendarBlank size={24} color={colors.lightBlack} />
                    <Text className="sie-content-title">Historial de Audiencias</Text>
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

export default HistorialAudienciasWeb;