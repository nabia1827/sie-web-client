import React, { useEffect, useState } from "react";
import { Grid, Form,message } from "antd";
import DetalleLegajoMobile from "./DetalleLegajoMobile";
import DetalleLegajoWeb from "./DetalleLegajoWeb";
import ModalApelacion from "../../../../../components/consultaLegajos/ModalApelacion";
import ModalEditarObs from "../../../../../components/consultaLegajos/ModalEditarObs";
import ModalEditarDelegado from "../../../../../components/consultaLegajos/ModalEditarDelegado";
import ModalEditarHechos from "../../../../../components/consultaLegajos/ModalEditarHechos";
import {
    GetInfoLegajoById, GetAgraviadosByLegajoId, GetImputadosByLegajoId,
    GetAudienciasByLegajoId, GetResultadosByLegajoId, UpdateDelegado,UpdateTipoProceso, UpdateHecho,
    UpdateObservacionesAudiencia, UpdateEstadoAsistencia
} from "../../../../../utils/consultaLegajos/dinamicCalls";
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLegajoCod } from "../../../../../store/actions/consultaLegajos/consultaLegajosActionSync";
const { useBreakpoint } = Grid;
import dayjs from 'dayjs';
import { update } from "lodash";

function DetalleLegajoPage() {
    const screens = useBreakpoint();
    const dispacth = useDispatch();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    //Legajo actual
    const { id } = useParams();

    //Info Legajo    
    const [legajo, setLegajo] = useState(null);
    const [loadingInfo, setLoadingInfo] = useState(true);

    //Partes procesales
    const [loadingPp, setLoadingPp] = useState(true);
    const [imputados, setImputados] = useState(null);
    const [agraviados, setAgraviados] = useState(null);

    //Audiencias
    const [loadingAud, setLoadingAud] = useState(true);
    const [audiencias, setAudiencias] = useState(null);

    //Resultados
    const [loadingRes, setLoadingRes] = useState(true);
    const [resultados, setResultados] = useState(null);

    const fetchInfoGeneral = async (id) => {
        setLoadingInfo(true);
        try {
            const response = await GetInfoLegajoById(id);
            setLegajo(response.data);
        } finally {
            setLoadingInfo(false);
        }
    };

    const fetchPartesProcesales = async (id) => {
        setLoadingPp(true);
        try {
            const imputadosResponse = await GetImputadosByLegajoId(id);
            setImputados(imputadosResponse.data);
            const agraviadosResponse = await GetAgraviadosByLegajoId(id);
            setAgraviados(agraviadosResponse.data);
        } finally {
            setLoadingPp(false);
        }
    };

    const fetchAudiencias = async (id) => {
        setLoadingAud(true);
        try {
            const response = await GetAudienciasByLegajoId(id);
            setAudiencias(response.data);
        } finally {
            setLoadingAud(false);
        }
    };

    const fetchResultados = async (id) => {
        setLoadingRes(true);
        try {
            const response = await GetResultadosByLegajoId(id);
            setResultados(response.data);
        } finally {
            setLoadingRes(false);
        }
    };


    useEffect(() => {
        if (id !== null && id !== undefined) {
            fetchInfoGeneral(id);
            fetchPartesProcesales(id);
            fetchAudiencias(id);
            fetchResultados(id);
        }
    }, [id]);

    useEffect(() => {
        if (legajo) {
            dispacth(setCurrentLegajoCod(legajo.codigoLegajo))
        }
    }, [legajo]);

    const onClickTipoProceso = (value) =>{
        UpdateTipoProceso(legajo.legajoId,value).then(()=>{
            fetchInfoGeneral(id);
        });
    }

    //Modal de Observaciones de Audiencia
    const [mdObsLoading, setMdObsLoading] = useState(false);
    const [mdObsOpen, setMdObsOpen] = useState(false);
    const [obsForm] = Form.useForm();
    const [currentAudiencia, setCurrentAudiencia] = useState(null);

    const showMdObs = (record) => {
        setCurrentAudiencia(record);
        setMdObsOpen(true);
    };

    const onOkMdObs = () => {
        setMdObsLoading(true);
        const observacion = obsForm.getFieldValue("observacion")
        UpdateObservacionesAudiencia(currentAudiencia.audienciaId, observacion).then(() => {
            obsForm.resetFields();
            setCurrentAudiencia(null);
            fetchAudiencias(id);
            setMdObsLoading(false);
            setMdObsOpen(false);
        })
    };
    const onCancelMdObs = () => {
        obsForm.resetFields();
        setCurrentAudiencia(null);
        setMdObsOpen(false);
    };


    //Modal de Detalle de Apelacion
    const [mdApelLoading, setMdApelLoading] = useState(false);
    const [mdApelOpen, setMdApelOpen] = useState(false);
    const [resForm] = Form.useForm();
    const FORMAT_DATE = "DD/MM/YYYY";

    const showMdApel = (record) => {
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

    //Modal Actualizar Delegado
    const [mdDeleLoading, setMdDeleLoading] = useState(false);
    const [mdDeleOpen, setMdDeleOpen] = useState(false);
    const [delegadoForm] = Form.useForm();

    const showMdDele = () => {
        setMdDeleOpen(true);
    };

    const onOkMdDele = () => {
        setMdDeleLoading(true);
        const delegadoId = delegadoForm.getFieldValue("delegadoId")
        UpdateDelegado(legajo.legajoId, delegadoId).then(() => {
            delegadoForm.resetFields();
            fetchInfoGeneral(id);
            setMdDeleLoading(false);
            setMdDeleOpen(false);
        });

    };
    const onCancelMdDele = () => {
        delegadoForm.resetFields();
        setMdDeleOpen(false);
    };

    //Modal Actualizar Hechos
    const [mdHechosLoading, setMdHechosLoading] = useState(false);
    const [mdHechosOpen, setMdHechosOpen] = useState(false);
    const [hechosForm] = Form.useForm();


    const showMdHechos = () => {
        setMdHechosOpen(true);
    };

    const onOkMdHechos = () => {
        setMdHechosLoading(true);
        const hechos = hechosForm.getFieldValue("hechos")
        UpdateHecho(legajo.hechosId, hechos).then(() => {
            hechosForm.resetFields();
            fetchInfoGeneral(id);
            setMdHechosLoading(false);
            setMdHechosOpen(false);
        });

    };
    const onCancelMdHechos = () => {
        hechosForm.resetFields();
        setMdHechosOpen(false);
    };
    //Marcar asistencia
    const onClickAsistencia = (audienciaId) => {
        UpdateEstadoAsistencia(audienciaId).then(()=>{
            message.success("Asistencia marcada correctamente.")
            fetchAudiencias(id);
        })
    }

    const onRefreshAudiencias = () => {
        fetchAudiencias(id);
    }

    return <>{isXsScreen ?
        <DetalleLegajoMobile
            showMdObs={showMdObs}
            showMdApel={showMdApel}
            legajo={legajo}
            loadingInfo={loadingInfo}
            onClickTipoProceso = {onClickTipoProceso}
            imputados={imputados}
            agraviados={agraviados}
            loadingPp={loadingPp}
            audiencias={audiencias}
            loadingAud={loadingAud}
            resultados={resultados}
            loadingRes={loadingRes}
            showMdDele={showMdDele}
            showMdHechos={showMdHechos}
            onClickAsistencia = {onClickAsistencia}
            onRefreshAudiencias = {onRefreshAudiencias}
        /> :
        <DetalleLegajoWeb
            showMdObs={showMdObs}
            showMdApel={showMdApel}
            legajo={legajo}
            loadingInfo={loadingInfo}
            onClickTipoProceso = {onClickTipoProceso}
            imputados={imputados}
            agraviados={agraviados}
            loadingPp={loadingPp}
            audiencias={audiencias}
            loadingAud={loadingAud}
            resultados={resultados}
            loadingRes={loadingRes}
            showMdDele={showMdDele}
            showMdHechos={showMdHechos}
            onClickAsistencia = {onClickAsistencia}
            onRefreshAudiencias = {onRefreshAudiencias}
        />
    }

        <ModalEditarObs
            modalOpen={mdObsOpen}
            handleOk={onOkMdObs}
            handleCancel={onCancelMdObs}
            modalLoading={mdObsLoading}
            currentAudiencia={currentAudiencia}
            form={obsForm}
        ></ModalEditarObs>

        <ModalApelacion
            modalOpen={mdApelOpen}
            handleOk={onOkMdApel}
            handleCancel={onCancelMdApel}
            modalLoading={mdApelLoading}
            form = {resForm}
        ></ModalApelacion>
        <ModalEditarDelegado
            modalOpen={mdDeleOpen}
            handleOk={onOkMdDele}
            handleCancel={onCancelMdDele}
            modalLoading={mdDeleLoading}
            legajo={legajo}
            form={delegadoForm}
        >
        </ModalEditarDelegado>
        <ModalEditarHechos
            modalOpen={mdHechosOpen}
            handleOk={onOkMdHechos}
            handleCancel={onCancelMdHechos}
            modalLoading={mdHechosLoading}
            legajo={legajo}
            form={hechosForm}
        >

        </ModalEditarHechos>
    </>;
}

export default DetalleLegajoPage;