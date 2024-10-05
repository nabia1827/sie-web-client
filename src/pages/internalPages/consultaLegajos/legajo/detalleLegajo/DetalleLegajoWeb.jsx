import React from "react";
import { Tabs, Flex } from "antd";
import InfoGeneralWeb from "./informacionGeneral/InfoGeneralWeb";
import PartesProcesalesWeb from "./partesProcesales/PartesProcesalesWeb";
import HistorialAudienciasWeb from "./historialAudiencias/HistorialAudienciasWeb";
import ResultadosFinalesWeb from "./resultadosFinales/ResultadosFinalesWeb";

function DetalleLegajoWeb(props) {
    const {showMdObs,showMdApel}=props;

    const items = [
        {
            key: '1',
            label: 'Información General',
            children: <InfoGeneralWeb></InfoGeneralWeb>,
        },
        {
            key: '2',
            label: 'Partes Procesales',
            children: <PartesProcesalesWeb></PartesProcesalesWeb>,
        },
        {
            key: '3',
            label: 'Historial Audiencias',
            children: <HistorialAudienciasWeb showMdObs = {showMdObs}></HistorialAudienciasWeb>,
        },
        {
            key: '4',
            label: 'Resultados Finales',
            children: <ResultadosFinalesWeb showMdApel = {showMdApel}></ResultadosFinalesWeb>,
        },
    ];

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <>
            <Flex justify="center" align="center" style={{width:"100%",padding:"0.6em 1.2em 1.2em 1.2em", backgroundColor:"white",borderRadius:"0.7em"}}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} style={{width:"100%", minHeight:"70vh"}}>

                </Tabs>
            </Flex>
        </>
    );

}

export default DetalleLegajoWeb;