import React, { useState } from "react";
import { Flex, Grid, Form} from "antd";
import NuevoLegajoMobile from "./NuevoLegajoMobile";
import NuevoLegajoWeb from "./NuevoLegajoWeb";
import ModalEditResultado from "../../../../components/recepcionLegajo/ModalEditResultado";
import ModalEditImputado from "../../../../components/recepcionLegajo/ModalEditImputado";
import ModalEditAgraviado from "../../../../components/recepcionLegajo/nuevoLegajo/ModalEditAgraviado";
import ModalDelImputado from "../../../../components/recepcionLegajo/ModalDelImputado";
import ModalDelResultado from "../../../../components/recepcionLegajo/ModalDelResultado";
import ModalDelAgraviado from "../../../../components/recepcionLegajo/nuevoLegajo/ModalDelAgraviado";

import { useParams } from 'react-router-dom';



const { useBreakpoint } = Grid;

function NuevoLegajoPage() {
    const screens = useBreakpoint();
    const isXsScreen = screens.xs !== undefined && screens.xs;

    //Legajo actual
    const { id } = useParams();

    //Datos del Documento
    const [loadingDd, setLoadingDd] = useState(true);
    const [documento, setDocumento] = useState(null);

    //Datos Generales
    const [loadingDg, setLoadingDg] = useState(true);
    const [datosGeneral, setDatosGeneral] = useState(null);

    //Audiencia
    const [loadingAud, setLoadingAud] = useState(true);
    const [audiencia, setAudiencia] = useState(null);

    //Partes procesales
    const [loadingPp, setLoadingPp] = useState(true);
    const [imputados, setImputados] = useState(null);
    const [agraviados, setAgraviados] = useState(null);

    //Resultados
    const [loadingRes, setLoadingRes] = useState(true);
    const [resultados, setResultados] = useState(null);

    //Modal Resultados
    const [mdResOpen, setMdResOpen] = useState(false);
    const [mdResLoading, setMdResLoading] = useState(false);
    const [resForm] = Form.useForm();
    const [currentResultado, setCurrentResultado] = useState(null);

    const showMdRes = (record) => {
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


    //Modal Imputados
    const [mdImpOpen, setMdImpOpen] = useState(false);
    const [mdImpLoading, setMdImpLoading] = useState(false);
    const [impForm] = Form.useForm();
    const [currentImputado, setCurrentImputado] = useState(null);

    const showMdImp = (record) => {
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


    //Modal Agraviados
    const [mdAgrOpen, setMdAgrOpen] = useState(false);
    const [mdAgrLoading, setMdAgrLoading] = useState(false);
    const [agrForm] = Form.useForm();
    const [currentAgraviado, setCurrentAgraviado] = useState(null);

    const showMdAgr = (record) => {
        setCurrentAgraviado(record);
        setMdAgrOpen(true);
    };

    const onOkMdAgr = () => {
        setMdAgrLoading(true);
        /*const observacion = agrForm.getFieldValue("observacion")
        UpdateObservacionesAudiencia(currentAudiencia.audienciaId, observacion).then(() => {
            AgrForm.AgretFields();
            setCurrentAudiencia(null);
            fetchAudiencias(id);
            setMdObsLoading(false);
            setMdObsOpen(false);
        })Aqui debo realizar todo*/
    };
    const onCancelMdAgr = () => {
        agrForm.resetFields();
        setCurrentAgraviado(null);
        setMdAgrOpen(false);
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


    //Modal Delete Agraviado
    const [mdDelAgrOpen, setMdDelAgrOpen] = useState(false);
    const [mdDelAgrLoading, setMdDelAgrLoading] = useState(false);
    const [currentAgraviadoId, setCurrentAgraviadoId] = useState(null);

    const showMdDelAgr = (agraviadoId) => {
        setCurrentAgraviadoId(agraviadoId);
        setMdDelAgrOpen(true);
    };

    const onOkMdDelAgr = () => {
        setMdDelAgrLoading(true);
        /*const observacion = agrForm.getFieldValue("observacion")
        UpdateObservacionesAudiencia(currentAudiencia.audienciaId, observacion).then(() => {
            AgrForm.AgretFields();
            setCurrentAudiencia(null);
            fetchAudiencias(id);
            setMdObsLoading(false);
            setMdObsOpen(false);
        })Aqui debo realizar todo*/
    };
    const onCancelMdDelAgr = () => {
        setCurrentAgraviadoId(null);
        setMdDelAgrOpen(false);
    };


    //Modal Delete Agraviado
    const [mdDelResOpen, setMdDelResOpen] = useState(true);
    const [mdDelResLoading, setMdDelResLoading] = useState(false);
    const [currentResultadoId, setCurrentResultadoId] = useState(null);

    const showMdDelRes = (resultadoId) => {
        setCurrentResultadoId(resultadoId);
        setMdDelResOpen(true);
    };

    const onOkMdDelRes = () => {
        setMdDelResLoading(true);
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



    return <>
        {   isXsScreen ?
            <NuevoLegajoMobile
            /> :
            <NuevoLegajoWeb
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
            currentResultado={currentImputado}
            form={impForm}
        ></ModalEditImputado>

        <ModalEditAgraviado
            modalOpen={mdAgrOpen}
            handleOk={onOkMdAgr}
            handleCancel={onCancelMdAgr}
            modalLoading={mdAgrLoading}
            currentResultado={currentAgraviado}
            form={agrForm}
        ></ModalEditAgraviado>

        <ModalDelImputado
            modalOpen={mdDelImpOpen}
            handleOk={onOkMdDelImp}
            handleCancel={onCancelMdDelImp}
            modalLoading={mdDelImpLoading}
        ></ModalDelImputado>

        <ModalDelAgraviado
            modalOpen={mdDelAgrOpen}
            handleOk={onOkMdDelAgr}
            handleCancel={onCancelMdDelAgr}
            modalLoading={mdDelAgrLoading}
        ></ModalDelAgraviado>

        <ModalDelResultado
            modalOpen={mdDelResOpen}
            handleOk={onOkMdDelRes}
            handleCancel={onCancelMdDelRes}
            modalLoading={mdDelResLoading}
        ></ModalDelResultado>
    </>;
}

export default NuevoLegajoPage;