import React from "react";
import { Flex, Typography, Input, Button, Collapse, Select,Row, Col} from "antd";
import { colors } from "../../../../utils/colors";
const { Text } = Typography
import CollapserDatosDoc from "../../../../components/recepcionLegajo/CollapserDatosDoc";
import CollapserDatosGen from "../../../../components/recepcionLegajo/adicionarDocumentos/CollapserDatosGen";
import CollapserAudiencia from "../../../../components/recepcionLegajo/CollapserAudiencia";
import CollapserPartesProc from "../../../../components/recepcionLegajo/adicionarDocumentos/CollapserPartesProc";
import CollapserResultado from "../../../../components/recepcionLegajo/CollapserResultado";

function AdicionarDocsWeb(props){
    const {
        loadingDd,dataDd,formDd,fetchFiscalias,
        loadingDg,dataDg,formDg,fetchJuzgados,
        loadingAud,dataAud,formAud,showMdApel,
        loadingPp,dataImp,
        loadingRes,dataRes, showMdEditRes,showMdEditImp,showMdAgr,showMdDelImp,showMdDelAgr,showMdDelRes

        //loadingDd, formDd, dataDd
        // loadingDg, formDg, dataDg

    } = props
    
    return(
        <>
            <Flex justify="center" align="flex-start" style={{ width: "100%", minHeight: "76vh", backgroundColor: colors.white, paddingTop: "2em", paddingBottom: "2em"}}>
                <Flex gap={"3em"} vertical justify="center" align="center" style={{ width: "100%", height: "100%"}}>
                    <Flex justify="space-between" align="center"  style={{ width: "100%", height: "28%"}}>
                        <Flex gap={"small"} justify="center" align="center" style={{ width: "50%", paddingLeft: "2.7em", paddingRight: "10%", paddingTop:"1em"}}>
                            <Text style={{width: "100%", textAlign: "start"}}>Número Legajo:</Text>
                            <Input style={{width: "100%"}} value="LP - 948948" disabled />
                        </Flex>
                        
                    </Flex>
                    
                    <Flex gap={"1em"} vertical justify="start" align="center" style={{ width: "100%", height: "72%", paddingLeft: "2.7em", paddingRight: "2.7em"}}>
                        <Text style={{width: "100%", textAlign:"left", marginBottom: "1em"}}>Los datos identificados automáticamente en el dataDd, son los siguientes:</Text> 

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
                        ></CollapserDatosGen>

                        <CollapserPartesProc
                            loading = {loadingPp}
                            imputados = {dataImp}
                            
                            showMdEditImp={showMdEditImp}
                            showMdDelImp={showMdDelImp}

                            showMdEditAgr={showMdAgr}
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

export default AdicionarDocsWeb;