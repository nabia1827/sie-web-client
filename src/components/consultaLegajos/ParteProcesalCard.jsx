import React from "react";
import { Tag, Button, Flex, Typography, Card } from "antd";
import { FilePdfOutlined } from '@ant-design/icons';
import { colors } from "../../utils/colors";
const { Text } = Typography;

function ParteProcesalCard(props) {
    const { pp, tipo } = props;

    return (
        <>
            {tipo == 1 ? (
                <Card
                    title={pp.imputadoNombre}
                    extra={<Button size="small" type="text" shape="circle" icon={<FilePdfOutlined size={20} style={{ color: colors.red }} />} />}
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