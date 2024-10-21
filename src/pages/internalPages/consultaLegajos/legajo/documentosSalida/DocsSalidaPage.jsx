import React,{useState,useEffect} from "react";
import { Grid } from "antd";
import DocsSalidaWeb from "./DocsSalidaWeb";
import DocsSalidaMobile from "./DocsSalidaMobile";
import ModalCrearRecurso from "../../../../../components/consultaLegajos/ModalCrearRecurso";
import ModalEnviarRecurso from "../../../../../components/consultaLegajos/ModalEnviarRecurso";
import { useParams } from 'react-router-dom';
import { GetInfoLegajoById, ListarDocsEntrada,ListarDocsSalida } from "../../../../../utils/consultaLegajos/dinamicCalls";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLegajoCod } from "../../../../../store/actions/consultaLegajos/consultaLegajosActionSync";
import { onDownloadDocPDF } from "../../../../../utils/consultaLegajos/dinamicCalls";
import { TipoDoc } from "../../../../../utils/constants";
const { useBreakpoint } = Grid;

function DocsSalidaPage() {
    const screens = useBreakpoint();
    const dispacth = useDispatch();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const { id } = useParams();
    const [loadingsPDF, setLoadingsPDF] = useState([]);

    const enterLoading = (index, value) => {
        setLoadingsPDF((prevLoadings) => {
          const newLoadings = [...prevLoadings];
          newLoadings[index] = value;
          return newLoadings;
        });
        
    };

    const onClickDownload = async (index, docId) => {
        enterLoading(index,true);
        try {
            onDownloadDocPDF(docId,TipoDoc.DOCUMENTO_SALIDA).then(()=>{
                enterLoading(index,false);
            });
        } catch (error) {
            message.error("Error al descargar el PDF");
        }
    }

    //Documentos de Salida
    const [legajo, setLegajo] = useState(null);
    
    const [docsSalida, setDocsSalida] = useState(null);
    const [loadingDocsSalida, setLoadingDocsSalida] = useState(true);

    const fetchDocsSalida = async (id) => {
        setLoadingDocsSalida(true);
        try {
            const response = await GetInfoLegajoById(id);
            setLegajo(response.data);
            const response2 = await ListarDocsSalida(id);
            setDocsSalida(response2.data);
        } finally {
            setLoadingDocsSalida(false);
        }
    };

    useEffect(() => {
        if (id !== null && id !== undefined) {
            fetchDocsSalida(id);
        }
    }, [id]);

    useEffect(() => {
        if (legajo) {
            dispacth(setCurrentLegajoCod(legajo.codigoLegajo))
        }
    }, [legajo]);

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
            legajo = {legajo}
            docsSalida = {docsSalida}
            loadingDocsSalida = {loadingDocsSalida}
            showMdCrearRecurso={showMdCrearRecurso}
            showMdEditarRecurso={showMdEditarRecurso}
            onClickDownload = {onClickDownload}
            loadingsPDF = {loadingsPDF}
        /> :
        <DocsSalidaWeb
            legajo = {legajo}
            docsSalida = {docsSalida}
            loadingDocsSalida = {loadingDocsSalida}
            showMdCrearRecurso={showMdCrearRecurso}
            showMdEditarRecurso={showMdEditarRecurso}
            onClickDownload = {onClickDownload}
            loadingsPDF = {loadingsPDF}
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