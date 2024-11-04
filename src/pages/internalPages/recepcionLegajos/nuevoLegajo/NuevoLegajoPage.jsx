import React, { useState ,useEffect} from "react";
import {Grid, Form} from "antd";
import NuevoLegajoMobile from "./NuevoLegajoMobile";
import NuevoLegajoWeb from "./NuevoLegajoWeb";
import ModalApelacion from "../../../../components/consultaLegajos/ModalApelacion";
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

import {
    GetImputadosByLegajoId,GetAgraviadosByLegajoId,
    GetResultadosByLegajoId,GetAudienciasByLegajoId,
    GetDocumento,GetInfoLegajoById,
    SearchJuzgado,SearchFiscalia,
    GetAudiencia
} from "../../../../utils/consultaLegajos/dinamicCalls";


import {
    UpdateImputadoById, DeleteImputado,
    UpdateImputadoDelito, DeleteImputadoDelito, DeleteAgraviado,
    UpdateAudiencia, UpdateDatosDocumento, UpdateDatosGenerales,
    GetDatosGenerales, UpdateAgraviadoById
} from "../../../../utils/recepcionLegajos/dinamicCalls";

import ModalEditResultado from "../../../../components/recepcionLegajo/ModalEditResultado";
import ModalEditImputado from "../../../../components/recepcionLegajo/ModalEditImputado";
import ModalEditAgraviado from "../../../../components/recepcionLegajo/nuevoLegajo/ModalEditAgraviado";
import ModalDelImputado from "../../../../components/recepcionLegajo/ModalDelImputado";
import ModalDelResultado from "../../../../components/recepcionLegajo/ModalDelResultado";
import ModalDelAgraviado from "../../../../components/recepcionLegajo/nuevoLegajo/ModalDelAgraviado";
import ModalGuardarDatos from "../../../../components/recepcionLegajo/ModalGuardarDatos";
import { isNull } from "lodash";



const { useBreakpoint } = Grid;

function NuevoLegajoPage() {

    //Legajo actual
    const { legajoId, documentoId, audienciaId } = useParams();

    const [loadingCl, setlogadingCl] = useState(true);
    const [dataLeg, setDataLeg] = useState(null);

    //Datos del dataDd
    const [loadingDd, setLoadingDd] = useState(true);
    const [dataDd, setDataDd] = useState(null);
    const [formDd] = Form.useForm();

    //Datos Generales
    const [loadingDg, setLoadingDg] = useState(true);
    const [dataDg, setDataDg] = useState(null);
    const [formDg] = Form.useForm();

    //dataAud
    const [loadingAud, setLoadingAud] = useState(false);
    const [dataAud, setDataAud] = useState(null);
    const [formAud] = Form.useForm();

    //Partes procesales
    const [loadingPp, setLoadingPp] = useState(true);
    const [dataImp, setDataImp] = useState(null);
    const [dataAgr, setDataAgr] = useState(null);

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

    const fetchCodigoLegajo = async (id) => {
        setlogadingCl(true);
        try {
            const CodigoResponse = await GetInfoLegajoById(id);
            setDataLeg(CodigoResponse.data.codigoLegajo)
        } finally {
            setlogadingCl(false);
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
            const datosGeneralesResponse = await GetDatosGenerales(id);
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

            const agraviadosResponse = await GetAgraviadosByLegajoId(id);
            setDataAgr(agraviadosResponse.data);
        } finally {
            setLoadingPp(false);
        }
    };

    const fetchAudiencias = async (id) => {
        setLoadingAud(true);
        try {
            const audienciaResponse = await GetAudiencia(id);
            if(audienciaResponse && audienciaResponse.data){
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
            fetchCodigoLegajo(legajoId)
            fetchDatosGenerales(legajoId);
            fetchPartesProcesales(legajoId);
            fetchResultados(legajoId);
        }
    }, [legajoId]);

    useEffect(() => {
        if (audienciaId !== null && audienciaId !== undefined && audienciaId!=0) {
            fetchAudiencias(audienciaId);
        }
    }, [audienciaId]);
    

    useEffect(() => {
        if (documentoId !== null && documentoId !== undefined) {
            fetchDocumento(documentoId);
        }
    }, [documentoId]);



    //Modal Guardar Datos
    const [mdBtnSvOpen, setMdBtnSvOpen] = useState(false);
    const [mdBtnSvLoading,setMdBtnSvLoading]= useState(false);

    const showMdBtnSv = () => {
        setMdBtnSvOpen(true);
    };

    const onOkMdBtnSv = () => {
        setMdBtnSvLoading(true);
        const claseId = formDd.getFieldValue("claseDocumento")
        const tipoRemitenteId = formDd.getFieldValue("tipoRemitente")
        const nroDoc = formDd.getFieldValue("nroDocumento")
        const remitenteId = formDd.getFieldValue("remitente")

        const datosDocumento ={
            docId:documentoId,
            claseId:  isNull(claseId)?0:claseId,
            tipoRemitenteId: isNull(tipoRemitenteId)?0:tipoRemitenteId,
            nroDoc: nroDoc,
            remitenteId: isNull(remitenteId)?0:remitenteId,
            usuModificacion: 1
        }

        const nroCarpeta = formDg.getFieldValue("carpetaFiscal")
        const nroExpediente = formDg.getFieldValue("expedienteJudicial")
        const estadoId = formDg.getFieldValue("estado")
        const subfaseId = formDg.getFieldValue("subfase")
        const juzgadoId = formDg.getFieldValue("juzgado")
        const tipoProcesoId = formDg.getFieldValue("tipoProceso")
        const departamentoId = formDg.getFieldValue("departamento")
        const provinciaId = formDg.getFieldValue("provincia")
        const distritoId = formDg.getFieldValue("distrito")
        const distritoJudicialId = formDg.getFieldValue("distritoJudicial")
        const fiscaliaId = formDg.getFieldValue("fiscalia")
        const fiscalTitular = formDg.getFieldValue("fiscalTitular")
        const fiscalResponsable = formDg.getFieldValue("fiscalResponsable")
        const hechos = formDg.getFieldValue("hechos")
        

        const datosGenerales ={
            legajoId: legajoId,
            nroCarpeta: nroCarpeta, 
            nroExpediente:nroExpediente,
            estadoId: isNull(estadoId)?0:estadoId,
            subfaseId: isNull(subfaseId)?0:subfaseId, 
            juzgadoId: isNull(juzgadoId)?0:juzgadoId,
            tipoProcesoId: isNull(tipoProcesoId)?0:tipoProcesoId,
            departamentoId: isNull(departamentoId)?0:departamentoId,
            provinciaId: isNull(provinciaId)?0:provinciaId,
            distritoId: isNull(distritoId)?0:distritoId,
            distritoJudicialId: isNull(distritoJudicialId)?0:distritoJudicialId,
            fiscaliaId: isNull(fiscaliaId)?0:fiscaliaId,
            fiscalTitular: fiscalTitular,
            fiscalResponsable:fiscalResponsable,
            hechos:hechos
        }

        const fecha = formAud.getFieldValue("fecha");
        const fechaFormateada = fecha ? fecha.format('YYYY-MM-DD') : "2024-01-01";
        const tipo = isNull(formAud.getFieldValue("tipo")) || formAud.getFieldValue("tipo") === undefined?0:formAud.getFieldValue("tipo")
        const hora = formAud.getFieldValue("hora");
        const horaFormateada = hora ? hora.format('hh:mm a') : "02:20 am";
        const link = formAud.getFieldValue("link")

        Promise.all([
            UpdateDatosDocumento(datosDocumento), 
            UpdateDatosGenerales(datosGenerales), 
            UpdateAudiencia(audienciaId,fechaFormateada, horaFormateada,tipo,link,legajoId)
        ])
        .then(() => {
            setMdBtnSvLoading(false);
            setMdBtnSvOpen(false);
        })        
    };
    const onCancelMdBtnSv = () => {
        setMdBtnSvOpen(false);
    };



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
        const imputadoDelitoId = currentResultado.imputadoDelitoId
        const reparacionCivil = resForm.getFieldValue("reparacionCivil")
        const tipoSentenciaId = resForm.getFieldValue("tipoSentencia")
        const cantidad = resForm.getFieldValue("cantidad")
        const tipoPenaId = resForm.getFieldValue("tipoPena")
        const fechaApelacion = resForm.getFieldValue("fechaApelacion")
        const resultadoApelacionId = resForm.getFieldValue("resApelacionId")
        const imputadoDelito = {
            imputadoDelitoId: imputadoDelitoId,
            reparacionCivil: reparacionCivil,
            tipoSentenciaId: isNull(tipoSentenciaId)?0:tipoSentenciaId,
            tipoPenaId: isNull(tipoPenaId)?0:tipoPenaId,
            cantidad: cantidad,
            fechaApelacion: isNull(fechaApelacion)?"":fechaApelacion,
            resultadoApelacionId: isNull(resultadoApelacionId)?0:resultadoApelacionId,
        }

        UpdateImputadoDelito(imputadoDelito).then(() => {
            resForm.resetFields();
            setCurrentResultado(null);
            fetchResultados(legajoId);
            setMdResLoading(false);
            setMdResOpen(false);
        })
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
        const imputadoId = currentImputado.imputadoId
        const delitosIds = impForm.getFieldValue("nombreDelito")
        const nombre = impForm.getFieldValue("nombreImputado")
        const nroDoc = impForm.getFieldValue("nroDoc")
        const tipoDocId = impForm.getFieldValue("tipoDoc")
        const imputadoEdit = {
            imputadoId:imputadoId,
            nombre:nombre,
            tipoDocId: tipoDocId,
            nroDoc:nroDoc,
            delitosIds: delitosIds,
        }
        UpdateImputadoById(imputadoEdit).then(() => {
            impForm.resetFields();
            setCurrentImputado(null);
            fetchPartesProcesales(legajoId);
            setMdImpLoading(false);
            setMdImpOpen(false);
        })

    };
    const onCancelMdImp = () => {
        impForm.resetFields();
        setCurrentImputado(null);
        setMdImpOpen(false);
    };


    //Modal Editar Agraviado
    const [mdAgrOpen, setMdAgrOpen] = useState(false);
    const [mdAgrLoading, setMdAgrLoading] = useState(false);
    const [agrForm] = Form.useForm();
    const [currentAgraviado, setCurrentAgraviado] = useState(null);

    const showMdEditAgr = (record) => {
        setCurrentAgraviado(record);
        setMdAgrOpen(true);
    };

    const onOkMdAgr = () => {
        setMdAgrLoading(true);
        console.log(agrForm)
        
        const agraviadoId = currentAgraviado.agraviadoId
        const nombre = agrForm.getFieldValue("nombreAgraviado")
        const nroDoc = agrForm.getFieldValue("nroDoc")
        const tipoDocId = agrForm.getFieldValue("tipoDoc")

        const agraviadoEdit = {
            agraviadoId:agraviadoId,
            nombre:nombre,
            tipoDocId: tipoDocId,
            nroDoc:nroDoc
        }

        console.log(agraviadoEdit)
        UpdateAgraviadoById(agraviadoEdit).then(() => {
            agrForm.resetFields();
            setCurrentAgraviado(null);
            fetchPartesProcesales(legajoId);
            setMdAgrLoading(false);
            setMdAgrOpen(false);
        })

    };
    const onCancelMdAgr = () => {
        agrForm.resetFields();
        setCurrentAgraviado(null);
        setMdAgrOpen(false);
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
        setMdDelImpLoading(true)
        DeleteImputado(currentImputadoId).then(() => {
            setCurrentImputadoId(null);
            setMdDelImpLoading(false);
            fetchPartesProcesales(legajoId);
            setMdDelImpOpen(false);
        })
    };

    const onCancelMdDelImp = () => {
        setCurrentImputadoId(null);
        setMdDelImpOpen(false);
    };




    //Modal Delete Agraviado
    const [mdDelAgrOpen, setMdDelAgrOpen] = useState(false);
    const [mdDelAgrLoading, setMdDelAgrLoading] = useState(false);
    const [currentAgraviadoId, setCurrentAgraviadoId] = useState(null);

    const showMdDelAgr = (agraviadoId) => {
        setCurrentAgraviadoId(agraviadoId);
        setMdDelAgrOpen(true);
    };

    const onOkMdDelAgr = () => {
        setMdDelAgrLoading(true)
        DeleteAgraviado(currentAgraviadoId).then(() => {
            setCurrentAgraviadoId(null);
            setMdDelAgrLoading(false);
            fetchPartesProcesales(legajoId);
            setMdDelAgrOpen(false);
        })
    };
    const onCancelMdDelAgr = () => {
        setCurrentAgraviadoId(null);
        setMdDelAgrOpen(false);
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
        console.log(currentResultadoId)

        DeleteImputadoDelito(currentResultadoId).then(() => {
            setCurrentResultadoId(null);
            fetchResultados(legajoId);
            setMdDelResLoading(false);
            setMdDelResOpen(false);
        })
    };

    const onCancelMdDelRes = () => {
        setCurrentResultadoId(null);
        setMdDelResOpen(false);
    };

    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    return <>
        {isXsScreen ?
            <NuevoLegajoMobile

                loadingDd={loadingDd}
                dataDd={dataDd}

                loadingDg={loadingDg}
                dataDg={dataDg}
                formDd = {formDd}

                loadingAud={loadingAud}
                dataAud={dataAud}

                loadingPp={loadingPp}
                dataImp={dataImp}


                loadingRes={loadingRes}
                dataRes={dataRes}

                dataLeg={dataLeg}
                loadingCl = {loadingCl}
                

            /> :
            <NuevoLegajoWeb

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
                dataAgr={dataAgr}

                loadingRes={loadingRes}
                dataRes={dataRes}

                dataLeg={dataLeg}
                loadingCl = {loadingCl}

                showMdEditRes={showMdEditRes}
                showMdEditImp={showMdEditImp}
                showMdEditAgr={showMdEditAgr}

                showMdDelImp={showMdDelImp}
                showMdDelRes={showMdDelRes}
                showMdDelAgr= {showMdDelAgr}

                showMdApel={showMdApel}

                showMdBtnSv = {showMdBtnSv}
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

        <ModalEditAgraviado
            modalOpen={mdAgrOpen}
            handleOk={onOkMdAgr}
            handleCancel={onCancelMdAgr}
            modalLoading={mdAgrLoading}
            dataAgraviado={currentAgraviado}
            form={agrForm}
        ></ModalEditAgraviado>


        <ModalDelImputado
            modalOpen={mdDelImpOpen}
            handleOk={onOkMdDelImp}
            handleCancel={onCancelMdDelImp}
            modalLoading={mdDelImpLoading}
            currentImputadoId={currentImputadoId}
        ></ModalDelImputado>


        <ModalDelAgraviado
            modalOpen={mdDelAgrOpen}
            handleOk={onOkMdDelAgr}
            handleCancel={onCancelMdDelAgr}
            modalLoading={mdDelAgrLoading}
            currentAgraviadoId={currentAgraviadoId}
        ></ModalDelAgraviado>

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

        <ModalGuardarDatos

            modalOpen = {mdBtnSvOpen}
            handleOk = {onOkMdBtnSv}
            handleCancel = {onCancelMdBtnSv}
            modalLoading = {mdBtnSvLoading}

        ></ModalGuardarDatos>
    </>;
}

export default NuevoLegajoPage;