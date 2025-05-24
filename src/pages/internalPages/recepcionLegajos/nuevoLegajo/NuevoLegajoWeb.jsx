import React, { useState } from "react";
import { Flex, Typography, Input, Button, Collapse, Select,Row, Col,notification, Spin} from "antd";
import { colors } from "../../../../utils/colors";
import {InfoCircleOutlined } from '@ant-design/icons';
import CollapserDatosDoc from "../../../../components/recepcionLegajo/CollapserDatosDoc";
import CollapserDatosGen from "../../../../components/recepcionLegajo/nuevoLegajo/CollapserDatosGen";
import CollapserAudiencia from "../../../../components/recepcionLegajo/CollapserAudiencia";
import CollapserPartesProc from "../../../../components/recepcionLegajo/nuevoLegajo/CollapserPartesProc";
import CollapserResultado from "../../../../components/recepcionLegajo/CollapserResultado";
import {
    Plus 
} from "@phosphor-icons/react";

const { Text } = Typography

function NuevoLegajoWeb(props){
    const {
        loadingDd,dataDd,formDd,fetchFiscalias,
        loadingDg,dataDg,formDg,fetchJuzgados,
        loadingAud,dataAud,formAud,showMdApel,showMdAddImp,showMdAddAgr,
        loadingPp,dataImp,showMdEditImp,showMdEditAgr,showMdDelImp,showMdDelAgr,dataAgr,
        loadingRes,dataRes, showMdEditRes,showMdDelRes,
        loadingCl,dataLeg,

        showMdBtnSv,
        typeOfDesign

        //loadingDd, formDd, dataDd
        // loadingDg, formDg, dataDg

    } = props

    const [api, contextHolder] = notification.useNotification();


    const openNotification = () => {
        api.info({
            message: 'Actualización de Registros',
            description: 'Los tabs de Partes Procesales y Resultados son independientes del boton de guardado, así que asegurate de realizar los cambios en esos apartados de manera premeditada para evitar errores.',
            duration: 5,
        });
    };

    return(
        <>
            <Flex justify="center" align="flex-start" style={{ width: "100%", minHeight: "76vh", backgroundColor: colors.white, paddingTop: "2em", paddingBottom: "2em"}}>
                <Flex gap={"3em"} vertical justify="center" align="center" style={{ width: "100%", height: "100%"}}>
                    <Flex justify="space-between" align="center"  style={{ width: "100%", height: "28%"}}>
                        <Flex gap={"small"} justify="center" align="center" style={{paddingLeft: "2.7em"}}>
                            <Text style={{textAlign: "start"}}>Número Legajo:</Text>
                            <Spin spinning= {loadingCl} style={{width: "100%"}}>
                                <Input style={{width: "100%"}} value={dataLeg} disabled />
                            </Spin>
                        </Flex>
                        
                        <Flex gap={"small"} justify="flex-end" align="flex-end" style={{ paddingRight: "3em"}}>
                            <Button style={{ height: "3em"}} type="primary" onClick={showMdBtnSv}>Guardar Datos</Button>
                        </Flex>
                        
                    </Flex>
                    
                    <Flex gap={"1em"} vertical justify="start" align="center" style={{ width: "100%", height: "72%", paddingLeft: "2.7em", paddingRight: "2.7em"}}>
                        <Flex gap={"1em"}  justify="start" align="left" style={{ width: "100%", height: "72%"}}> 
                            <Text style={{width: "100%", textAlign:"left", marginBottom: "1em"}}>Los datos identificados automáticamente en el documento, son los siguientes:</Text> 
                            {contextHolder}
                            <Button style={{width: "15%", alignItems:"left", marginBottom: "1em"}} color="default" variant="text" onClick={openNotification}  icon={<InfoCircleOutlined />}>
                                Informacion
                            </Button>
                        </Flex>

                        <CollapserDatosDoc
                            loading = {loadingDd} 
                            data = {dataDd}
                            form = {formDd}
                            fetchFiscalias = {fetchFiscalias}
                            fetchJuzgados = {fetchJuzgados}
                        ></CollapserDatosDoc>

                        <CollapserDatosGen
                            loading = {loadingDg}
                            data = {dataDg}
                            form = {formDg}
                            fetchJuzgados = {fetchJuzgados}
                            fetchFiscalias={fetchFiscalias}
                        ></CollapserDatosGen>

                        <CollapserPartesProc
                            loadingPp = {loadingPp}
                            typeOfDesign={typeOfDesign}
                            imputados = {dataImp}
                            agraviados = {dataAgr}
                            showMdAddImp = {showMdAddImp}
                            showMdEditImp={showMdEditImp}
                            showMdDelImp={showMdDelImp}
                            showMdAddAgr={showMdAddAgr}
                            showMdEditAgr={showMdEditAgr}
                            showMdDelAgr={showMdDelAgr}
                        ></CollapserPartesProc>

                        <CollapserAudiencia
                            loading={loadingAud}
                            data={dataAud}
                            form={formAud}
                        ></CollapserAudiencia>

                        <CollapserResultado
                            loading={loadingRes}
                            resultados={dataRes}
                            typeOfDesign={typeOfDesign}
                            showMdApel={showMdApel}
                            showMdEditRes={showMdEditRes}
                            showMdDelRes={showMdDelRes}
                        ></CollapserResultado>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );

}

export default NuevoLegajoWeb;