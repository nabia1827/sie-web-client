import React, { useState } from "react";
import { Flex, Typography, Input, Button, Collapse, Select,Row, Col} from "antd";
import { colors } from "../../../../utils/colors";

import CollapserDatosDoc from "../../../../components/recepcionLegajo/CollapserDatosDoc";
import CollapserDatosGen from "../../../../components/recepcionLegajo/nuevoLegajo/CollapserDatosGen";
import CollapserAudiencia from "../../../../components/recepcionLegajo/CollapserAudiencia";
import CollapserPartesProc from "../../../../components/recepcionLegajo/nuevoLegajo/CollapserPartesProc";
import CollapserResultado from "../../../../components/recepcionLegajo/CollapserResultado";
import {
    Plus 
} from "@phosphor-icons/react";

const { Text } = Typography




function NuevoLegajoWeb(){

    return(
        <>
            <Flex justify="center" align="flex-start" style={{ width: "100%", minHeight: "76vh", backgroundColor: colors.white, paddingTop: "2em", paddingBottom: "2em"}}>
                <Flex gap={"3em"} vertical justify="center" align="center" style={{ width: "100%", height: "100%"}}>
                    <Flex justify="space-between" align="center"  style={{ width: "100%", height: "28%"}}>
                        <Flex gap={"small"} justify="center" align="center" style={{ width: "50%", paddingLeft: "2.7em", paddingRight: "10%"}}>
                            <Text style={{width: "100%", textAlign: "start"}}>Número Legajo:</Text>
                            <Input style={{width: "100%"}} value="LP - 948948" disabled />
                        </Flex>
                        <Flex gap={"small"} justify="center" align="center" style={{ width: "50%", paddingLeft: "26%"}}>
                            <Button style={{width: "70%", height: "3em"}} type="primary" icon={<Plus size={16}/>}>Añadir Otro Campo</Button>
                        </Flex>
                    </Flex>
                    
                    <Flex gap={"1em"} vertical justify="start" align="center" style={{ width: "100%", height: "72%", paddingLeft: "2.7em", paddingRight: "2.7em"}}>
                        <Text style={{width: "100%", textAlign:"left", marginBottom: "1em"}}>Los datos identificados automáticamente en el documento, son los siguientes:</Text> 

                        <CollapserDatosDoc></CollapserDatosDoc>
                        <CollapserDatosGen></CollapserDatosGen>
                        <CollapserPartesProc></CollapserPartesProc>
                        <CollapserAudiencia></CollapserAudiencia>
                        <CollapserResultado></CollapserResultado>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );

}

export default NuevoLegajoWeb;