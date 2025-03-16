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
                        <Text > {pp.tipoDoc} : {pp.nroDoc} </Text>
                        <Text > Estado : {pp.estado} </Text>
                        <Text strong> Delitos </Text>
                        <ul style={{ margin: "0em 0" }} >
                            {pp.delitos.map((d, index) => (
                                <li key={index}>
                                    {d.delitoNombre}
                                </li>
                            ))
                            }
                        </ul>
                    </Flex>
                </Card>
            ) : (
                <Card
                    title={pp.agraviadoNombre}
                    extra={<Button size="small" type="text" shape="circle" icon={<FilePdfOutlined size={20} style={{ color: colors.red }} />} />}
                >
                    <Text > {pp.tipoDoc} : {pp.nroDoc} </Text>
                </Card>
            )}

        </>
    );

}

export default ParteProcesalCard;