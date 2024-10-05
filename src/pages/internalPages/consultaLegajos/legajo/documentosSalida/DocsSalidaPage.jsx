import React,{useState,useEffect} from "react";
import { Grid } from "antd";
import DocsSalidaWeb from "./DocsSalidaWeb";
import DocsSalidaMobile from "./DocsSalidaMobile";
import ModalCrearRecurso from "../../../../../components/consultaLegajos/ModalCrearRecurso";
import ModalEnviarRecurso from "../../../../../components/consultaLegajos/ModalEnviarRecurso";

const { useBreakpoint } = Grid;

function DocsSalidaPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    //Modal Crear Recurso
    const [mdCrearRecursoLoading, setMdCrearRecursoLoading] = useState(false);
    const [mdCrearRecursoOpen, setMdCrearRecursoOpen] = useState(false);

    const showMdCrearRecurso = () => {
        setMdCrearRecursoOpen(true);
    };

    const onOkMdCrearRecurso = () => {
        setMdCrearRecursoLoading(true);
        setTimeout(() => {
            setMdCrearRecursoLoading(false);
            setMdCrearRecursoOpen(false);
        }, 3000);
    };
    const onCancelMdCrearRecurso = () => {
        setMdCrearRecursoOpen(false);
    };

    //Modal Enviar Recurso
    const [mdEditarRecursoLoading, setMdEditarRecursoLoading] = useState(false);
    const [mdEditarRecursoOpen, setMdEditarRecursoOpen] = useState(false);

    const showMdEditarRecurso = () => {
        setMdEditarRecursoOpen(true);
    };

    const onOkMdEditarRecurso = () => {
        setMdEditarRecursoLoading(true);
        setTimeout(() => {
            setMdEditarRecursoLoading(false);
            setMdEditarRecursoOpen(false);
        }, 3000);
    };
    const onCancelMdEditarRecurso = () => {
        setMdEditarRecursoOpen(false);
    };

    return <>{isXsScreen ?
        <DocsSalidaMobile
            showMdCrearRecurso={showMdCrearRecurso}
            showMdEditarRecurso={showMdEditarRecurso}
        /> :
        <DocsSalidaWeb
            showMdCrearRecurso={showMdCrearRecurso}
            showMdEditarRecurso={showMdEditarRecurso}
        />
    }
        <ModalCrearRecurso
            modalOpen={mdCrearRecursoOpen}
            handleOk={onOkMdCrearRecurso}
            handleCancel={onCancelMdCrearRecurso}
            modalLoading={mdCrearRecursoLoading}
        ></ModalCrearRecurso>
        <ModalEnviarRecurso
            modalOpen={mdEditarRecursoOpen}
            handleOk={onOkMdEditarRecurso}
            handleCancel={onCancelMdEditarRecurso}
            modalLoading={mdEditarRecursoLoading}
        ></ModalEnviarRecurso>
    </>;
}

export default DocsSalidaPage;