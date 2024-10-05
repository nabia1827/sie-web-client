import React from "react";
import { Flex, Typography, Table } from "antd";
const { Text } = Typography;
import {
    Users
} from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
import { ColumnsImputados,ColumnsAgraviados } from "../../../../../../utils/consultaLegajos/columnsPartesTable";

function PartesProcesalesWeb() {

    const columnsImputados = ColumnsImputados()
    const columnsAgraviados = ColumnsAgraviados()

    const data1 = [
        {
            imputado:"Debora Leon Sanchez",
            tipoDoc:"DNI",
            nroDoc:"72606359",
            delitos:["Tenencia Ilegal de Armas","Homicidio Culposo"],
            estado:"Investigado",
        },
        {
            imputado:"Angela Urteaga Lopez",
            tipoDoc:"DNI",
            nroDoc:"72606359",
            delitos:["Tenencia Ilegal de Armas","Homicidio Culposo"],
            estado:"Investigado",
        },
        {
            imputado:"John Flores Torres",
            tipoDoc:"DNI",
            nroDoc:"72606359",
            delitos:["Tenencia Ilegal de Armas","Homicidio Culposo"],
            estado:"Investigado",
        },
    ];

    const data2 = [
        {
            agraviado:"Ivan Fernandez Rodriguez",
            tipoDoc:"DNI",
            nroDoc:"72606348",
        },
        {
            agraviado:"Oscar Enriquez Davila",
            tipoDoc:"DNI",
            nroDoc:"72606348",
        },
    ];



    return (
        <>
            <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.0em" }}>
                <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                    <Users size={24} color={colors.lightBlack} />
                    <Text className="sie-content-title">Partes Procesales</Text>
                </Flex>
                <br></br>
                <Flex vertical gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                    <Table
                        style={{ width: "100%" }}
                        columns={columnsImputados}
                        dataSource={data1}
                        pagination={{
                            pageSize: 5,
                            size:"small"
                        }}
                        size="small"
                    />

                    <Table
                        style={{ width: "100%" }}
                        columns={columnsAgraviados}
                        dataSource={data2}
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

export default PartesProcesalesWeb;