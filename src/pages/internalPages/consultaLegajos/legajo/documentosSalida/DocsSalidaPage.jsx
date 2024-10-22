import React, { useState, useEffect } from "react";
import { Grid, Form } from "antd";
import DocsSalidaWeb from "./DocsSalidaWeb";
import DocsSalidaMobile from "./DocsSalidaMobile";
import ModalCrearRecurso from "../../../../../components/consultaLegajos/ModalCrearRecurso";
import ModalEnviarRecurso from "../../../../../components/consultaLegajos/ModalEnviarRecurso";
import { useParams } from 'react-router-dom';
import { GetInfoLegajoById, ListarDocsEntrada, ListarDocsSalida, ListDestinatariosPosibles } from "../../../../../utils/consultaLegajos/dinamicCalls";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLegajoCod } from "../../../../../store/actions/consultaLegajos/consultaLegajosActionSync";
import { onDownloadDocPDF, SendDocSalida } from "../../../../../utils/consultaLegajos/dinamicCalls";
import { TipoDoc, TipoDestinatario } from "../../../../../utils/constants";
import ModalAddDest from "../../../../../components/consultaLegajos/ModalAddDest";
const { useBreakpoint } = Grid;

function DocsSalidaPage() {
    const screens = useBreakpoint();
    const dispacth = useDispatch();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const { id } = useParams();
    const [loadingsPDF, setLoadingsPDF] = useState([]);
    const { usuId, usuEmail } = useSelector((state) => state.auth.user);

    const enterLoading = (index, value) => {
        setLoadingsPDF((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = value;
            return newLoadings;
        });

    };

    const onClickDownload = async (index, docId) => {
        enterLoading(index, true);
        try {
            onDownloadDocPDF(docId, TipoDoc.DOCUMENTO_SALIDA).then(() => {
                enterLoading(index, false);
            });
        } catch (error) {
            message.error("Error al descargar el PDF");
        }
    }

    //Documentos de Salida
    const [legajo, setLegajo] = useState(null);
    const [destsPosibles, setDestsPosibles] = useState([]);
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

    const fetchDestinatarios = async (id) => {

        try {
            const response = await ListDestinatariosPosibles(id);
            setDestsPosibles(response.data);
        } finally {
            //setLoadingDocsSalida(false);
        }
    };

    useEffect(() => {
        if (id !== null && id !== undefined) {
            fetchDocsSalida(id);
            fetchDestinatarios(id);
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
    const [enviarForm] = Form.useForm();
    const [currentDoc, setCurrentDoc] = useState(null);


    const showMdEditarRecurso = (record) => {
        setCurrentDoc(record)
        setMdEditarRecursoOpen(true);
    };

    const onOkMdEditarRecurso = () => {
        setMdEditarRecursoLoading(true);

        const contenidoCorreo = enviarForm.getFieldValue("contenidoCorreo")
        const autogenerar = enviarForm.getFieldValue("autogenerar")
        const destsIds = enviarForm.getFieldValue("destinatarios")
        const destinatarios = destsPosibles.filter(d => destsIds.includes(d.destCod));
        const contenido = contenidoCorreo?contenidoCorreo:""

        SendDocSalida(currentDoc.docId, usuId, usuEmail, contenido, autogenerar, destinatarios).then(() => {
            setMdEditarRecursoLoading(false);
            setMdEditarRecursoOpen(false);
            fetchDocsSalida(id);
            enviarForm.resetFields();
            setCurrentDoc(null);
            setCantNews(0);
            
        });

    };
    const onCancelMdEditarRecurso = () => {
        enviarForm.resetFields();
        setCurrentDoc(null);
        setCantNews(0);
        setMdEditarRecursoOpen(false);
    };

    //Modal Añadir destinatario
    const [mdAddDestLoading, setMdAddDestLoading] = useState(false);
    const [mdAddDestOpen, setMdAddDestOpen] = useState(false);
    const [cantNews, setCantNews] = useState(0);
    const [addDestForm] = Form.useForm();


    const showMdAddDest = () => {
        setMdAddDestOpen(true);
    };

    const onOkMdAddDest = () => {
        setMdAddDestLoading(true);

        const newDest = {
            destId: 0,
            destDescripcion: addDestForm.getFieldValue("descripcion"),
            destCorreo: addDestForm.getFieldValue("correo"),
            destTipoId: TipoDestinatario.EXTRA,
            destCod: `${cantNews + 1}-0`
        }
        setDestsPosibles([...destsPosibles, newDest]);
        setCantNews(cantNews + 1);

        let destsIds = enviarForm.getFieldValue("destinatarios")
        destsIds = destsIds?destsIds:[]
        destsIds = [...destsIds,newDest.destCod]
        enviarForm.setFieldValue("destinatarios",destsIds)

        addDestForm.resetFields();
        setMdAddDestLoading(false);
        setMdAddDestOpen(false);

    };
    const onCancelMdAddDest = () => {
        addDestForm.resetFields();
        setMdAddDestOpen(false);
    };

    return <>{isXsScreen ?
        <DocsSalidaMobile
            legajo={legajo}
            docsSalida={docsSalida}
            loadingDocsSalida={loadingDocsSalida}
            showMdCrearRecurso={showMdCrearRecurso}
            showMdEditarRecurso={showMdEditarRecurso}
            onClickDownload={onClickDownload}
            loadingsPDF={loadingsPDF}
        /> :
        <DocsSalidaWeb
            legajo={legajo}
            docsSalida={docsSalida}
            loadingDocsSalida={loadingDocsSalida}
            showMdCrearRecurso={showMdCrearRecurso}
            showMdEditarRecurso={showMdEditarRecurso}
            onClickDownload={onClickDownload}
            loadingsPDF={loadingsPDF}
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
            form={enviarForm}
            documento={currentDoc}
            destinatariosPosibles={destsPosibles}
            showMdAddDest={showMdAddDest}
        ></ModalEnviarRecurso>
        <ModalAddDest
            modalOpen={mdAddDestOpen}
            handleOk={onOkMdAddDest}
            handleCancel={onCancelMdAddDest}
            modalLoading={mdAddDestLoading}
            form={addDestForm}
        >

        </ModalAddDest>
    </>;
}

export default DocsSalidaPage;