import React from "react";
import { Tabs, Flex } from "antd";
import InfoGeneralWeb from "./informacionGeneral/InfoGeneralWeb";
import PartesProcesalesWeb from "./partesProcesales/PartesProcesalesWeb";
import HistorialAudienciasWeb from "./historialAudiencias/HistorialAudienciasWeb";
import ResultadosFinalesWeb from "./resultadosFinales/ResultadosFinalesWeb";

function DetalleLegajoWeb(props) {
    const {showMdObs,showMdApel,legajo, loadingInfo,
        imputados, agraviados,loadingPp,audiencias,loadingAud,resultados,loadingRes,
        showMdDele,showMdHechos,onClickAsistencia,onRefreshAudiencias
    }=props;

    const items = [
        {
            key: '1',
            label: 'Información General',
            children: <InfoGeneralWeb legajo={legajo} loadingInfo={loadingInfo} showMdDele={showMdDele} showMdHechos={showMdHechos}></InfoGeneralWeb>,
        },
        {
            key: '2',
            label: 'Partes Procesales',
            children: <PartesProcesalesWeb imputados={imputados} agraviados={agraviados} loadingPp={loadingPp}></PartesProcesalesWeb>,
        },
        {
            key: '3',
            label: 'Historial Audiencias',
            children: <HistorialAudienciasWeb onClickAsistencia={onClickAsistencia} onRefreshAudiencias={onRefreshAudiencias} audiencias={audiencias} loadingAud={loadingAud} showMdObs = {showMdObs}></HistorialAudienciasWeb>,
        },
        {
            key: '4',
            label: 'Resultados Finales',
            children: <ResultadosFinalesWeb resultados={resultados} loadingRes={loadingRes} showMdApel = {showMdApel}></ResultadosFinalesWeb>,
        },
    ];

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <Flex justify="center" align="center" style={{width:"100%",padding:"0.6em 1.2em 1.2em 1.2em", backgroundColor:"white",borderRadius:"0.7em"}}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} style={{width:"100%", minHeight:"75vh"}}>

                </Tabs>
            </Flex>
        </>
    );

}

export default DetalleLegajoWeb;