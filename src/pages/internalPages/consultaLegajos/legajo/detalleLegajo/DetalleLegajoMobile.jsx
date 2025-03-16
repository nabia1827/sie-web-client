import React, { useState } from "react";
import { Tabs, Flex, Steps } from "antd";
import InfoGeneralMobile from "./informacionGeneral/InfoGeneralMobile";
import PartesProcesalesMobile from "./partesProcesales/PartesProcesalesMobile";
function DetalleLegajoMobile(props) {
    const {showMdObs,showMdApel,legajo, loadingInfo,
        imputados, agraviados,loadingPp,audiencias,loadingAud,resultados,loadingRes,
        showMdDele,showMdHechos,onClickAsistencia,onRefreshAudiencias,onClickTipoProceso
    }=props;

    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };
    const steps = [
        {
            content: <InfoGeneralMobile legajo={legajo} loadingInfo={loadingInfo} onClickTipoProceso={onClickTipoProceso} showMdDele={showMdDele} showMdHechos={showMdHechos}/>,
            status: 'process',
        },
        {
            content: <PartesProcesalesMobile imputados={imputados} agraviados={agraviados} loadingPp={loadingPp}/>,
            status: 'process',
        },
        {
            content: 'Third-content',
            status: 'process',
        },
        {
            content: 'Last-content',
            status: 'process',
        },
    ]

    const onChange = (value) => {
        console.log('onChange:', value);
        setCurrent(value);
    };

    return (
        <>
            <Flex vertical justify="center" align="center" style={{ width: "100%", padding: "0.6em 1.2em 1.2em 1.2em", backgroundColor: "white", borderRadius: "0.7em" }}>
                <Steps
                    type="navigation"
                    size="small"
                    current={current}
                    onChange={onChange}
                    responsive={false}
                    direction="horizontal"
                    labelPlacement="vertical"
                    items={steps}
                    style={{ marginBottom: '24px' }}
                />
                <div>{steps[current].content}</div>
            </Flex>
        </>
    );

}

export default DetalleLegajoMobile;