import React,{useEffect,useState} from "react";
import { Grid } from "antd";
import DetalleLegajoMobile from "./DetalleLegajoMobile";
import DetalleLegajoWeb from "./DetalleLegajoWeb";
import ModalApelacion from "../../../../../components/consultaLegajos/ModalApelacion";
import ModalEditarObs from "../../../../../components/consultaLegajos/ModalEditarObs";

const { useBreakpoint } = Grid;

function DetalleLegajoPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    //Modal de Observaciones de Audiencia
    const [mdObsLoading, setMdObsLoading] = useState(false);
    const [mdObsOpen, setMdObsOpen] = useState(false);

    const showMdObs = () => {
        setMdObsOpen(true);
    };

    const onOkMdObs = () => {
        setMdObsLoading(true);
        setTimeout(() => {
            setMdObsLoading(false);
            setMdObsOpen(false);
        }, 3000);
    };
    const onCancelMdObs = () => {
        setMdObsOpen(false);
    };


    //Modal de Detalle de Apelacion
    const [mdApelLoading, setMdApelLoading] = useState(false);
    const [mdApelOpen, setMdApelOpen] = useState(false);

    const showMdApel = () => {
        setMdApelOpen(true);
    };

    const onOkMdApel = () => {
        setMdApelLoading(true);
        setTimeout(() => {
            setMdApelLoading(false);
            setMdApelOpen(false);
        }, 3000);
    };
    const onCancelMdApel = () => {
        setMdApelOpen(false);
    };

    

    return <>{isXsScreen ?
        <DetalleLegajoMobile
            showMdObs={showMdObs}
            showMdApel={showMdApel}            
        /> :
        <DetalleLegajoWeb
            showMdObs={showMdObs}
            showMdApel={showMdApel}
        />
        }

        <ModalEditarObs 
        modalOpen={mdObsOpen}
        handleOk={onOkMdObs}
        handleCancel={onCancelMdObs}
        modalLoading={mdObsLoading}
        ></ModalEditarObs>

        <ModalApelacion
        modalOpen={mdApelOpen}
        handleOk={onOkMdApel}
        handleCancel={onCancelMdApel}
        modalLoading={mdApelLoading}
        ></ModalApelacion>
        </>;
}

export default DetalleLegajoPage;