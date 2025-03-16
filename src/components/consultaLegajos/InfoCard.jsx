import { Flex, Typography } from "antd";
import { FileText } from "@phosphor-icons/react";
import { colors } from "../../utils/colors";
const { Text } = Typography
function InfoCard(props) {
    const { subtitle, title, copyable, IconComponent } = props;

    return (
        <>
            <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%", height:"100%", backgroundColor: colors.background, borderRadius: "0.7em", padding: "0.8em 1.3em" }}>
                <Flex vertical gap={0} justify="center" align="flex-start" >
                    <Text className="sie-info-card-subtitle">
                        {subtitle}
                    </Text>
                    <Text className="sie-info-card-title" copyable={copyable}>
                        {title}
                    </Text>
                </Flex>

                <Flex justify="center" align="center" style={{ aspectRatio: "1/1",padding:"0.4em", backgroundColor: colors.lightBlack, borderRadius: "0.7em" }}>
                    {IconComponent && <IconComponent size={32} color="white" />}
                </Flex>

            </Flex>
        </>
    );

}

export default InfoCard;