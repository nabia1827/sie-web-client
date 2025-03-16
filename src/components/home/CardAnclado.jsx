import { Card, Avatar, Typography,Button, Row, Col, Flex,Tag } from "antd";
import { UserOutlined, ArrowRightOutlined, CheckCircleOutlined} from "@ant-design/icons";
import {Path, MapPin } from "@phosphor-icons/react";
import { colors } from "../../utils/colors";

import { 
    PushPin,
 } from "@phosphor-icons/react";

 const { Text, Title } = Typography;

export default function CardAnclado({onPinClick,onClickLegajo,record}) {
    console.log("record = ", record)
    return (
        <Card 
          style={{ 
            width: '100%', 
            maxWidth: 500,
            borderRadius: 8,
          }}
          styles={{
            body: {
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }
          }}
        >
          {/* Top row with title and arrow icon */}
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
            <Button onClick={()=>onPinClick(record.legajoId)} size="small" shape="circle" type="text" icon={<PushPin size={16} weight="fill"/>} ></Button>
            <Title level={5} style={{ margin: 0 }}>
                <a onClick={() => onClickLegajo(record.legajoId)}>{record.legajoCodigo}</a>
            </Title>
          </div>

          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>{record.tipoCaso+" || "+record.nroCaso}</Text>
          </div>
          
          
            {/* Bottom row with text and check icon */}
            <Flex wrap="wrap" gap={"small"} justify="space-between" align="center">
                <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%", height:"100%", backgroundColor: colors.lightBlue, borderRadius: "0.7em", padding: "0.8em 1.3em" }}>
                    <Flex vertical gap={0} justify="center" align="flex-start" >
                        <Text className="sie-info-card-subtitle" style={{ fontSize: "14px"}}>{record.distritoJudicial?record.distritoJudicial:record.lugar}</Text>
                    </Flex>
                    <Flex justify="center" align="center" style={{ aspectRatio: "1/1",padding:"0.4em", backgroundColor: colors.blue, borderRadius: "0.7em" }}>
                        <MapPin style={{ color: colors.white, fontSize: 18 }} />
                    </Flex>
                </Flex>

                <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%", height:"100%", backgroundColor: colors.lightBlue, borderRadius: "0.7em", padding: "0.8em 1.3em" }}>
                    <Flex vertical gap={0} justify="center" align="flex-start" >
                        <Tag color='geekblue' style={{ fontSize: "14px"}}>{record.situacionJuridica}</Tag>
                    </Flex>
                    <Flex justify="center" align="center" style={{ aspectRatio: "1/1",padding:"0.4em", backgroundColor: colors.blue, borderRadius: "0.7em" }}>
                        <Path style={{ color: colors.white, fontSize: 18 }} />
                    </Flex>
                </Flex>
            </Flex>
        </Card>
      );
}