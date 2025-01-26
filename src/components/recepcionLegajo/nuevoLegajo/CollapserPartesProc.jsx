import { Flex, Typography, Input, Collapse, Empty, Row, Col, Spin, Table, Button } from "antd";
import { ColumnsImputados, ColumnsAgraviados } from "../../../utils/nuevoLegajo/columnsPartesColapserTable";
import { colors } from "../../../utils/colors";
import {
    PlusOutlined
} from '@ant-design/icons';
const { Text } = Typography;
import {
    Users
} from "@phosphor-icons/react";
function CollapserPartesProc(props) {
    const { imputados, agraviados, loadingPp, showMdEditImp, showMdDelImp, showMdEditAgr, showMdDelAgr,
        showMdAddAgr,showMdAddImp
     } = props;


    const columnsImputados = ColumnsImputados(showMdEditImp, showMdDelImp)
    const columnsAgraviados = ColumnsAgraviados(showMdEditAgr, showMdDelAgr)



    return (
        <>
            <Collapse style={{ width: "100%", backgroundColor: colors.background }}
                items={[
                    {
                        key: '1',
                        label:
                            <Flex gap={"small"} justify="flex-start" align="left">
                                <Text style={{ width: "100%", textAlign: "left" }} >Partes Procesales</Text>
                            </Flex>,

                        children:
                            <>
                                <Spin spinning={loadingPp} style={{ width: "100%", minHeight: "60vh" }}>
                                    {
                                        imputados && agraviados ? (
                                            <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.0em" }}>

                                                <Flex vertical gap={"middle"} justify="flex-start" align="flex-end" style={{ width: "100%" }}>
                                                    <Button onClick={showMdAddImp} icon={<PlusOutlined />} type="text" >Añadir Imputado</Button>
                                                    <Table
                                                        rowKey={"imputadoId"}
                                                        style={{ width: "100%" }}
                                                        columns={columnsImputados}
                                                        dataSource={imputados}
                                                        pagination={false}
                                                        size="small"
                                                    />
                                                    <Button onClick={showMdAddAgr} icon={<PlusOutlined />} type="text" >Añadir Agraviado</Button>
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
                    },
                ]}
            />
        </>
    )
}

export default CollapserPartesProc;