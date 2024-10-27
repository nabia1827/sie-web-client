import React, { useState ,useEffect} from "react";
import {Grid, Form} from "antd";
import AdicionarDocsMobile from "./AdicionarDocsMobile";
import AdicionarDocsWeb from "./AdicionarDocsWeb";
import ModalApelacion from "../../../../components/consultaLegajos/ModalApelacion";
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import {
    GetImputadosByLegajoId,
    GetResultadosByLegajoId,GetAudienciasByLegajoId,
    GetDocumento,GetDatosGeneralesTemp, SearchJuzgado,SearchFiscalia,
    GetAudiencia
} from "../../../../utils/consultaLegajos/dinamicCalls";

import ModalEditResultado from "../../../../components/recepcionLegajo/ModalEditResultado";
import ModalEditImputado from "../../../../components/recepcionLegajo/ModalEditImputado";
import ModalEditAgraviado from "../../../../components/recepcionLegajo/nuevoLegajo/ModalEditAgraviado";
import ModalDelImputado from "../../../../components/recepcionLegajo/ModalDelImputado";
import ModalDelResultado from "../../../../components/recepcionLegajo/ModalDelResultado";
import ModalDelAgraviado from "../../../../components/recepcionLegajo/nuevoLegajo/ModalDelAgraviado";

const { useBreakpoint } = Grid;

function AdicionarDocsPage() {

    //Legajo actual
    const { legajoId, documentoId } = useParams();

    //Datos del dataDd
    const [loadingDd, setLoadingDd] = useState(true);
    const [dataDd, setDataDd] = useState(null);
    const [formDd] = Form.useForm();

    //Datos Generales
    const [loadingDg, setLoadingDg] = useState(true);
    const [dataDg, setDataDg] = useState(null);
    const [formDg] = Form.useForm();

    //dataAud
    const [loadingAud, setLoadingAud] = useState(true);
    const [dataAud, setDataAud] = useState(null);
    const [formAud] = Form.useForm();

    //Partes procesales
    const [loadingPp, setLoadingPp] = useState(true);
    const [dataImp, setDataImp] = useState(null);
    //const [agraviados, setAgraviados] = useState(null);

    //dataRes
    const [loadingRes, setLoadingRes] = useState(true);
    const [dataRes, setDataRes] = useState(null);


    const fetchJuzgados = async (nombre,callback) => {
        try {
            const juzgadoResponse = await SearchJuzgado(nombre);
            callback(juzgadoResponse.data);
        } finally {
            //callback([]);
        }
    };

    const fetchFiscalias = async (nombre,callback) => {
        try {
            const fiscaliaResponse = await SearchFiscalia(nombre);
            callback(fiscaliaResponse.data);
        } finally {
            //callback([]);
        }
    };


    const fetchDocumento = async (id) => {
        setLoadingDd(true);
        try {
            const documentoResponse = await GetDocumento(id);
            setDataDd(documentoResponse.data)
        } finally {
            setLoadingDd(false);
        }
    };

    const fetchDatosGenerales = async (id) => {
        setLoadingDg(true);
        try {
            const datosGeneralesResponse = await GetDatosGeneralesTemp(id);
            setDataDg(datosGeneralesResponse.data)
        } finally {
            setLoadingDg(false);
        }
    };

    const fetchPartesProcesales = async (id) => {
        setLoadingPp(true);
        try {
            const imputadosResponse = await GetImputadosByLegajoId(id);
            setDataImp(imputadosResponse.data);

        } finally {
            setLoadingPp(false);
        }
    };

    const fetchAudiencias = async (id) => {
        setLoadingAud(true);
        try {
            const response = await GetAudienciasByLegajoId(id);
            if (response.data[0] !== null && response.data[0] !== undefined) {
                const audienciaId = response.data[0].audienciaId;
                const audienciaResponse = await GetAudiencia(audienciaId);
                setDataAud(audienciaResponse.data);
            }
        } finally {
            setLoadingAud(false);
        }
    };

    const fetchResultados = async (id) => {
        setLoadingRes(true);
        try {
            const response = await GetResultadosByLegajoId(id);
            setDataRes(response.data);
        } finally {
            setLoadingRes(false);
        }
    };

    useEffect(() => {
        if (legajoId !== null && legajoId !== undefined) {
            fetchDatosGenerales(legajoId);
            fetchPartesProcesales(legajoId);
            fetchAudiencias(legajoId);
            fetchResultados(legajoId);
        }
    }, [legajoId]);
    

    useEffect(() => {
        if (documentoId !== null && documentoId !== undefined) {
            fetchDocumento(documentoId);
        }
    }, [documentoId]);



    //Modal Editar Resultado
    const [mdResOpen, setMdResOpen] = useState(false);
    const [mdResLoading, setMdResLoading] = useState(false);
    const [resForm] = Form.useForm();
    const [currentResultado, setCurrentResultado] = useState(null);

    const showMdEditRes = (record) => {
        setCurrentResultado(record);
        setMdResOpen(true);
    };

    const onOkMdRes = () => {
        setMdResLoading(true);
        /*const observacion = resForm.getFieldValue("observacion")
        UpdateObservacionesAudiencia(currentAudiencia.audienciaId, observacion).then(() => {
            resForm.resetFields();
            setCurrentAudiencia(null);
            fetchAudiencias(id);
            setMdObsLoading(false);
            setMdObsOpen(false);
        })Aqui debo realizar todo*/
    };
    const onCancelMdRes = () => {
        resForm.resetFields();
        setCurrentResultado(null);
        setMdResOpen(false);
    };


    //Modal Editar Imputado
    const [mdImpOpen, setMdImpOpen] = useState(false);
    const [mdImpLoading, setMdImpLoading] = useState(false);
    const [impForm] = Form.useForm();
    const [currentImputado, setCurrentImputado] = useState(null);

    const showMdEditImp = (record) => {
        setCurrentImputado(record);
        setMdImpOpen(true);
    };

    const onOkMdImp = () => {
        setMdImpLoading(true);
        /*const observacion = ImpForm.getFieldValue("observacion")
        UpdateObservacionesAudiencia(currentAudiencia.audienciaId, observacion).then(() => {
            ImpForm.ImpetFields();
            setCurrentAudiencia(null);
            fetchAudiencias(id);
            setMdObsLoading(false);
            setMdObsOpen(false);
        })Aqui debo realizar todo*/
    };
    const onCancelMdImp = () => {
        impForm.resetFields();
        setCurrentImputado(null);
        setMdImpOpen(false);
    };


    
    //Modal de Detalle de Apelacion
    const [mdApelLoading, setMdApelLoading] = useState(false);
    const [mdApelOpen, setMdApelOpen] = useState(false);
    const FORMAT_DATE = "DD/MM/YYYY";

    const showMdApel = (record) => {
        console.log("nuuu",record)
        resForm.setFieldsValue({
            imputado: record.imputado,
            delito: record.delito,
            fechaApelacion: record.fechaApelacion !== null? dayjs(record.fechaApelacion, FORMAT_DATE) : "",
            resApelacionId: record.resApelacionId,
        }
        );
        setMdApelOpen(true);
    };

    const onOkMdApel = () => {
        setMdApelLoading(true);

        setTimeout(() => {
            
            resForm.resetFields();
            setMdApelLoading(false);
            setMdApelOpen(false);
        }, 3000);
    };
    const onCancelMdApel = () => {
        resForm.resetFields();
        setMdApelOpen(false);
    };

    
    //Modal Delete Imputado
    const [mdDelImpOpen, setMdDelImpOpen] = useState(false);
    const [mdDelImpLoading, setMdDelImpLoading] = useState(false);
    const [currentImputadoId, setCurrentImputadoId] = useState(null);

    const showMdDelImp = (imputadoId) => {
        setCurrentImputadoId(imputadoId);
        setMdDelImpOpen(true);
    };

    const onOkMdDelImp = () => {
        setMdDelImpLoading(true);
        console.log(currentImputadoId)
        /*const observacion = agrForm.getFieldValue("observacion")
        UpdateObservacionesAudiencia(currentAudiencia.audienciaId, observacion).then(() => {
            AgrForm.AgretFields();
            setCurrentAudiencia(null);
            fetchAudiencias(id);
            setMdObsLoading(false);
            setMdObsOpen(false);
        })Aqui debo realizar todo*/
    };
    const onCancelMdDelImp = () => {
        setCurrentImputadoId(null);
        setMdDelImpOpen(false);
    };


    

    //Modal Delete Resultados
    const [mdDelResOpen, setMdDelResOpen] = useState(false);
    const [mdDelResLoading, setMdDelResLoading] = useState(false);
    const [currentResultadoId, setCurrentResultadoId] = useState(null);

    const showMdDelRes = (resultadoId) => {
        setCurrentResultadoId(resultadoId);
        setMdDelResOpen(true);
    };

    const onOkMdDelRes = () => {
        setMdDelResLoading(true);
        console.log("Eliminar")
        /*const observacion = agrForm.getFieldValue("observacion")
        UpdateObservacionesAudiencia(currentAudiencia.audienciaId, observacion).then(() => {
            AgrForm.AgretFields();
            setCurrentAudiencia(null);
            fetchAudiencias(id);
            setMdObsLoading(false);
            setMdObsOpen(false);
        })Aqui debo realizar todo*/
    };

    const onCancelMdDelRes = () => {
        setCurrentResultadoId(null);
        setMdDelResOpen(false);
    };

    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>{isXsScreen ?
        <AdicionarDocsMobile

            loadingDd={loadingDd}
            dataDd={dataDd}

            loadingDg={loadingDg}
            dataDg={dataDg}
            formDd = {formDd}

            loadingAud={loadingAud}
            dataAud={dataAud}

            loadingPp={loadingPp}
            dataImp={dataImp}
            //agraviados={agraviados}

            loadingRes={loadingRes}
            dataRes={dataRes}
        /> :
        <AdicionarDocsWeb

            loadingDd={loadingDd} // loadingDd, dataDd, formDd
            dataDd={dataDd} 
            formDd = {formDd}

            loadingDg={loadingDg}  //loadingDg , dataDg, formDg
            dataDg={dataDg}
            formDg={formDg}
            fetchJuzgados = {fetchJuzgados}
            fetchFiscalias = {fetchFiscalias}

            loadingAud={loadingAud} 
            dataAud={dataAud}
            formAud={formAud}

            loadingPp={loadingPp}
            dataImp={dataImp}

            loadingRes={loadingRes}
            dataRes={dataRes}

            showMdEditRes={showMdEditRes}
            showMdEditImp={showMdEditImp}

            showMdDelImp={showMdDelImp}
            showMdDelRes={showMdDelRes}

            showMdApel={showMdApel}
        />
    }

    <ModalEditResultado
        modalOpen={mdResOpen}
        handleOk={onOkMdRes}
        handleCancel={onCancelMdRes}
        modalLoading={mdResLoading}
        currentResultado={currentResultado}
        form={resForm}
    ></ModalEditResultado>

    <ModalEditImputado
        modalOpen={mdImpOpen}
        handleOk={onOkMdImp}
        handleCancel={onCancelMdImp}
        modalLoading={mdImpLoading}
        dataImputado={currentImputado}
        form={impForm}
    ></ModalEditImputado>


    <ModalDelImputado
        modalOpen={mdDelImpOpen}
        handleOk={onOkMdDelImp}
        handleCancel={onCancelMdDelImp}
        modalLoading={mdDelImpLoading}
        currentImputadoId={currentImputadoId}
    ></ModalDelImputado>

    <ModalApelacion
        modalOpen={mdApelOpen}
        handleOk={onOkMdApel}
        handleCancel={onCancelMdApel}
        modalLoading={mdApelLoading}
        form = {resForm}
    ></ModalApelacion>


    <ModalDelResultado
        modalOpen={mdDelResOpen}
        handleOk={onOkMdDelRes}
        handleCancel={onCancelMdDelRes}
        modalLoading={mdDelResLoading}
        currentResultadoId={currentResultadoId}
    ></ModalDelResultado>
    </>;
}

export default AdicionarDocsPage;