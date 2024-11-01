import { Flex, Typography } from "antd";
import { colors } from "../../utils/colors";
const { Text } = Typography

function ReportCard(props) {
    const { subtitle, title, copyable, IconComponent } = props;
/*
border-radius: 10px;
background: var(--White, #FFF);
box-shadow: 0px 8px 20px 4px rgba(55, 84, 169, 0.15);
*/
    return (
        <>
            <Flex gap={"small"} justify="space-between" align="center" style={{ width: "100%", height:"100%", backgroundColor: colors.white, borderRadius: "0.7em", padding: "0.8em 1.3em",boxShadow:"0px 8px 20px 4px rgba(55, 84, 169, 0.10)" }}>
                <Flex vertical gap={0} justify="center" align="flex-start" >
                    <Text className="sie-report-card-subtitle">
                        {subtitle}
                    </Text>
                    <Text className="sie-report-card-title" copyable={copyable}>
                        {title}
                    </Text>
                </Flex>

                <Flex justify="center" align="center" style={{ aspectRatio: "1/1",padding:"0.4em", backgroundColor: colors.lightBlue, borderRadius: "0.7em" }}>
                    {IconComponent && <IconComponent size={32} color={colors.blue} />}
                </Flex>

            </Flex>
        </>
    );

}

export default ReportCard;