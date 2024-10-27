import React from "react";
import Basic from "./gantt/Basic";
import { Flex } from "antd";
import { colors } from "../../../../utils/colors";

function TodasAudienciasWeb() {

    return (
        <>
            <Flex vertical justify="center" align="center" style={{ width: "100%", minHeight: "76vh", paddingBottom: "1em", backgroundColor: colors.white, borderRadius: "0.7em", padding: "2.0em" }}>
                <Basic></Basic>
            </Flex>

        </>
    );

}

export default TodasAudienciasWeb;