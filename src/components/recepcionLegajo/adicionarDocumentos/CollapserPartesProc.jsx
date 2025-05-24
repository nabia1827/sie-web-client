import { Flex,Typography, Input, Collapse, Empty,Row, Col, Spin, Table, Button,Pagination} from "antd";
import { ColumnsImputados } from "../../../utils/nuevoLegajo/columnsPartesColapserTable";
import ParteProcesalCard from "../../consultaLegajos/ParteProcesalCard";
import {
    PlusOutlined
  } from '@ant-design/icons';
import { colors } from "../../../utils/colors";
const { Text } = Typography;
import {
    Users
} from "@phosphor-icons/react";
function CollapserPartesProc(props) {
    const { imputados, loading, showMdEditImp, showMdDelImp,showMdAddImp,typeOfDesign} = props;
    
    
    const columnsImputados = ColumnsImputados(showMdEditImp, showMdDelImp)

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
                                <Spin spinning={loading} style={{ width: "100%", minHeight: "60vh" }}>
                                    {
                                        imputados ? (
                                            <Flex vertical justify="flex-start" align="center" style={{ width: "100%", padding: "1.0em" }}>
                                               
                                                <Flex vertical gap={"middle"} justify="flex-start" align="flex-end" style={{ width: "100%" }}>
                                                    <Button onClick={showMdAddImp} icon={<PlusOutlined />} type="text" >Añadir Imputado</Button>
                                                    
                                                    {

                                                        typeOfDesign==="web"?
                                                        (
                                                            <Table
                                                                rowKey={"imputadoId"}
                                                                style={{ width: "100%" }}
                                                                columns={columnsImputados}
                                                                dataSource={imputados}
                                                                pagination={false}
                                                                size="small"
                                                            />
                                                        )
                                                        :(

                                                            imputados?.map((record, index) => (
                                                                <ParteProcesalCard
                                                                    key = {index}
                                                                    pp = {record}
                                                                    tipo = {1}
                                                                    isReception = {true}
                                                                    showMdEditImp = {showMdEditImp}
                                                                    showMdDelImp = {showMdDelImp}
                                                                />
                                                            ))
                                                            
                                                        )
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
                    },
                ]}
            />
        </>
    )
}

export default CollapserPartesProc;