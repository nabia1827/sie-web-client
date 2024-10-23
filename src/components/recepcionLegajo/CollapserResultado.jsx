import React from "react";
import { Flex, Typography, Table, Spin, Empty,Collapse } from "antd";
import { colors } from "../../utils/colors";
const { Text } = Typography;

import { ColumnsResultado } from "../../utils/nuevoLegajo/columnsResultadoColapserTable";

function CollapserResultado(props) {
    const { showMdApel/*, resultados, loadingRes*/, showMdEditRes, showMdDelRes } = props;

    const columns = ColumnsResultado(showMdApel,showMdEditRes,showMdDelRes)
    const loadingRes = false
    const resultados = [
        {
            imputadoDelitoId: 20,
            imputado: "Cristian Eduardo Méndez López",
            delito: "Falsificacion y/o uso de Documento Falso",
            reparacionCivil: "358",
            tipoSentencia: "Sentencia Condenatoria",
            tipoPena: "Pena privativa de libertad",
            cantidad: "27 años",
            fechaApelacion: "08/10/2024",
            resApelacionId: 1
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
                                <Text style={{width: "100%", textAlign:"left"}} >Resultados</Text>
                            </Flex>,

                        children:
                            <>
                                <Spin spinning={loadingRes} style={{width:"100%", minHeight:"60vh"}} >
                                    {resultados.length>0 ? (
                                        <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.0em" }}>
                                            <Flex vertical gap={"small"} justify="flex-start" align="center" style={{ width: "100%" }}>
                                                <Table
                                                    rowKey={"imputadoDelitoId"}
                                                    style={{ width: "100%" }}
                                                    columns={columns}
                                                    dataSource={resultados}
                                                    pagination={{
                                                        pageSize: 5,
                                                        size: "small"
                                                    }}
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
                    },
                ]}
            />
            

        </>
    );

}


export default CollapserResultado;