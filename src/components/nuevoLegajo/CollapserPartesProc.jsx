import { Flex,Typography, Input, Collapse, Select,Row, Col, Form} from "antd";
import { colors } from "../../utils/colors";
const { Text } = Typography;

function CollapserPartesProc(props) {
    const { form } = props;

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
                                
                            </>
                    },
                ]}
            />
        </>
    )
}

export default CollapserPartesProc;