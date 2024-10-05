import { Flex, Typography } from "antd";
import { FileText } from "@phosphor-icons/react";
import { colors } from "../../utils/colors";
const { Text } = Typography
function InfoCard(props) {
    const { subtitle, title, copyable, IconComponent } = props;

    return (
        <>
            <Flex justify="space-between" align="center" style={{ width: "100%", height: "12vh", backgroundColor: colors.lightBlue, borderRadius: "0.7em", padding: "0.6em 1.3em" }}>
                <Flex vertical gap={0} justify="center" align="flex-start" >
                    <Text className="sie-info-card-subtitle">
                        {subtitle}
                    </Text>
                    <Text className="sie-info-card-title" copyable={copyable}>
                        {title}
                    </Text>
                </Flex>

                <Flex justify="center" align="center" style={{ height: "80%", aspectRatio: "1/1", backgroundColor: colors.blue, borderRadius: "0.7em" }}>
                    {IconComponent && <IconComponent size={32} color="white" />}
                </Flex>

            </Flex>
        </>
    );

}

export default InfoCard;