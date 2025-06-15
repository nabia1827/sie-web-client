import React from "react";
import { Tag, Button, Flex, Typography, Card } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../../utils/colors";
const { Text } = Typography;
import {
    PencilSimpleLine,
    TrashSimple,
} from "@phosphor-icons/react";

function ParteProcesalCard(props) {
    const { pp, tipo, isReception, showMdEditImp,showMdDelImp} = props;

    return (
        <>
            {tipo == 1 ? (
                <Card
                    style={{width:"100%"}}
                    title={pp.imputadoNombre}
                    
                >
                    <Flex vertical justify="flex-start" align="flex-start" style={{ width: "100%" }}>
                        <Text style={{ textAlign: "left" }}>
                            <Text style={{ fontWeight: "bold" }}>{pp.tipoDoc}</Text> : {pp.nroDoc}
                        </Text>

                        <Text strong> Delitos </Text>
                        <ul style={{ margin: "0em 0", textAlign: "left" }} >
                            {pp.delitos.map((d, index) => (
                                <li key={index}>
                                    {d.delitoNombre} ({d.estado})
                                </li>
                            ))
                            }
                        </ul>
                        {
                            isReception !== undefined && (
                                <Flex gap={"small"} justify="center" align="center" style={{width:"100%", paddingTop:"10px"}}>
                                    <Button onClick={() => showMdEditImp(pp)} type="primary" shape="circle" style={{ backgroundColor: colors.blue }} icon={<PencilSimpleLine size={20} color={colors.white} />} />
                                    <Button onClick={() => showMdDelImp(pp.imputadoId)} type="primary" shape="circle" style={{ backgroundColor: colors.red }} icon={<TrashSimple size={20} color={colors.white} />} />
                                </Flex>
                            )
                        }
                    </Flex>
                </Card>
            ) : (
                <Flex vertical justify="flex-start" align="flex-start" style={{padding:"10px",width:"100%",borderRadius:"5px",border:`1px solid ${colors.lightGray}`}}>
                    <Text >{pp.agraviadoNombre}</Text>
                    {pp.tipoDoc &&(
                        <Text > {pp.tipoDoc} : {pp.nroDoc} </Text>
                    )

                    }
                </Flex>
            )}

        </>
    );

}

export default ParteProcesalCard;