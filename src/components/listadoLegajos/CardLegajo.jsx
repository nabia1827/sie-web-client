import { Card, Avatar, Typography,Button, Row, Col, Flex,Tag, Dropdown } from "antd";

import { UserOutlined, ArrowRightOutlined, CheckCircleOutlined} from "@ant-design/icons";
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

import {Path, MapPin,Eye } from "@phosphor-icons/react";
import { colors } from "../../utils/colors";

import { 
    PushPin,
 } from "@phosphor-icons/react";

 const { Text, Title } = Typography;

export default function CardLegajo(
  {
    onClickDetalle,
    onClickDocsIngreso,
    onClickDocsSalida,
    onClickEstado,
    onClickDownload,
    loadingsPDF,
    onPinClick,
    record,
    index
  }
) {
    console.log("record = ", record)

    const items = [
      {
        key: '1',
        label: (
          <a onClick={() => onClickDocsIngreso(record.legajoId)}>
            Documento de Entrada
          </a>
        ),
      },
      {
        key: '2',
        label: (
          <a onClick={() => onClickDocsSalida(record.legajoId)}>
            Documento de Salida
          </a>
        ),
      },
      {
        key: '3',
        label: (
          <a onClick={() =>onClickDownload(index,record.legajoId)} >
            Descargar legajo
          </a>
        ),
      },
    ];

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

          actions={[
            <Eye key="visualize" onClick={() => onClickDetalle(record.legajoId)}/>,
            <EditOutlined key="edit"  onClick={() => onClickEstado(record)} ></EditOutlined>,
            <Dropdown menu={{ items }} placement="bottomLeft">
              <EllipsisOutlined key="ellipsis" />
            </Dropdown>
          ]}

          
        >
          {/* Top row with title and arrow icon */}
          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
            {record.anclado?
              <Button onClick={()=>onPinClick(record.legajoId)} type="text" size="small" shape="circle" icon={<PushPin size={16} weight="fill" color={colors.lightBlack} />}></Button>
              :
              <Button onClick={()=>onPinClick(record.legajoId)} type="text" size="small" shape="circle" icon={<PushPin size={16} color={colors.gray} />}></Button>

            }
            <Title level={5} style={{ margin: 0 }}>
              {record.legajoCodigo}
            </Title>
          </div>

          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>{record.tipoCaso+" || "+record.nroCaso}</Text>
          </div>

          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>
              <Text style={{ fontWeight: 'bold' }}>Abogado: </Text> 
              {' '}{record.abogado}
            </Text>
          </div>

          <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'center' }}>
            <Text style={{ color: 'black' }}>
              <Text style={{ fontWeight: 'bold' }}>Fecha Registro: </Text> 
              {' '}{record.fechaRegistro}
            </Text>
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