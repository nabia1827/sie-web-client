import React from "react";
import { Flex, Typography, Table } from "antd";
const { Text } = Typography;
import {
    FileText
} from "@phosphor-icons/react";
import { colors } from "../../../../../../utils/colors";
import { ColumnsResultado } from "../../../../../../utils/consultaLegajos/columnsResultadoTable";

function ResultadosFinalesWeb(props) {
    const {showMdApel} =props;

    const columns = ColumnsResultado(showMdApel)

    const data = [
        {
            nro:"1",
            imputado:"Debora Leon Sanchez",
            delito:"Tenencia Ilegal de Armas",
            repCivil:"S/.1000",
            tipoSentencia:"Sentencia Condenatoria",
            tipoPena:"Privativa de la Libertad",
            cantidad:"5 años",
        },
        {
            nro:"2",
            imputado:"Debora Leon Sanchez",
            delito:"Homicidio Culposo",
            repCivil:"S/.2000",
            tipoSentencia:"Sentencia Condenatoria",
            tipoPena:"Privativa de la Libertad",
            cantidad:"5 años",
        },
        {
            nro:"3",
            imputado:"Angela Urteaga Lope",
            delito:"Tenencia Ilegal de Armas",
            repCivil:"S/.1000",
            tipoSentencia:"Sentencia Condenatoria",
            tipoPena:"Privativa de la Libertad",
            cantidad:"5 años",
        },
        {
            nro:"4",
            imputado:"Angela Urteaga Lope",
            delito:"Homicidio Culposo",
            repCivil:"S/.2000",
            tipoSentencia:"Sentencia Condenatoria",
            tipoPena:"Privativa de la Libertad",
            cantidad:"5 años",
        },

    ]

    return (
        <>
            <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.0em" }}>
                <Flex gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                    <FileText size={24} color={colors.lightBlack} />
                    <Text className="sie-content-title">Resultados del Proceso</Text>
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

export default ResultadosFinalesWeb;