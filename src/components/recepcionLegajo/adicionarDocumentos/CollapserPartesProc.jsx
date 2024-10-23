import { Flex,Typography, Input, Collapse, Empty,Row, Col, Spin, Table} from "antd";
import { ColumnsImputados } from "../../../utils/nuevoLegajo/columnsPartesColapserTable";
import { colors } from "../../../utils/colors";
const { Text } = Typography;
import {
    Users
} from "@phosphor-icons/react";
function CollapserPartesProc(props) {
    const { /*imputados, agraviados, loadingPp,*/ showMdEditImp, showMdDelImp} = props;
    

    const columnsImputados = ColumnsImputados(showMdEditImp, showMdDelImp)

    // Pasar a Dinamico
    const loadingPp = false
    const imputados =[
    {
        imputadoId: 1,
        imputadoNombre:"Debora Leon Sanchez",
        tipoDoc:"DNI",
        nroDoc:"72606359",
        delitos:[
            {
                imputadoDelitoId: 20,
                delitoId: 15,
                delitoNombre: "Tenencia Ilegal de Armas",
                reparacioCivil: 0,
                estado: "Incluido",
            },

            {
                imputadoDelitoId: 21,
                delitoId: 1,
                delitoNombre: "Homicidio Culposo",
                reparacioCivil: 40,
                estado:"Investigado",
            },
            
        ],
        
    }]


    const agraviados =[
        {
            agraviadoId: 6,
            agraviadoNombre: "El Estado",
            tipoDoc: null,
            nroDoc: null
        },
        {
            agraviadoId: 7,
            agraviadoNombre: "Pedro Martinez Pinedo",
            tipoDoc: "Carnet Extranjeria o Pasaporte",
            nroDoc: "015475896"
        }

    ]


    return (
        <>
            <Collapse style={{width: "100%", backgroundColor: colors.background}} 
                items={[
                    {
                        key: '1',
                        label:
                            <Flex gap={"small"} justify="flex-start" align="left">
                                <Text style={{width: "100%", textAlign:"left"}} >Partes Procesales</Text>
                            </Flex>,

                        children:
                            <>
                                <Spin spinning={loadingPp} style={{ width: "100%", minHeight: "60vh" }}>
                                    {
                                        imputados ? (
                                            <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.0em" }}>
                                               
                                                <Flex vertical gap={"middle"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                                    <Table
                                                        rowKey={"imputadoId"}
                                                        style={{ width: "100%" }}
                                                        columns={columnsImputados}
                                                        dataSource={imputados}
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
                    },
                ]}
            />
        </>
    )
}

export default CollapserPartesProc;