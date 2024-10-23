import React, { useState, useEffect } from "react";
import { Flex, Grid, Form, message } from "antd";
import { useParams } from 'react-router-dom';
import CrearDocMobile from "./CrearDocMobile";
import CrearDocWeb from "./CrearDocWeb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { DSGenerarActorCivil, DSGenerarQueja,DSGenerarDenuncia } from "../../../../../utils/consultaLegajos/dinamicCalls";
import { paths } from "../../../../../utils/paths";
import dayjs from "dayjs";
import { ListarProvincias, GetDelitosByLegajoId } from "../../../../../utils/consultaLegajos/dinamicCalls";

const { useBreakpoint } = Grid;

function CrearDocPage() {
    const screens = useBreakpoint();
    const navigate = useNavigate();
    const isXsScreen = screens.xs !== undefined && screens.xs;
    const { id, claseDocumento } = useParams();
    const { usuId } = useSelector((state) => state.auth.user);

    //Form Actor Civil
    const [acForm] = Form.useForm();
    const [loadingAc, setLoadingAc] = useState(false);

    const onFinishAc = () => {
        setLoadingAc(true);
        const procuradorId = acForm.getFieldValue("procuradorId")
        const dependenciaAfectadaId = acForm.getFieldValue("dependenciaAfectadaId")
        const tipoDanioId = acForm.getFieldValue("dependenciaAfectadaId")
        const especialistaLegal = acForm.getFieldValue("especialistaLegal")

        DSGenerarActorCivil(id, usuId, procuradorId, dependenciaAfectadaId,
            tipoDanioId, especialistaLegal).then((response) => {
                setLoadingAc(false);
                if (response.isSuccess) {
                    message.success("Se creó el documento exitosamente");
                    navigate(-1);
                    acForm.resetFields();
                } else {
                    message.error(response.message);
                }

            }
            );
    }
    const onCancelAc = () => {
        acForm.resetFields();
        navigate(-1);
    }

    //Form Queja
    const [qjForm] = Form.useForm();
    const [loadingQj, setLoadingQj] = useState(false);


    const onFinishQj = () => {
        setLoadingQj(true);

        const fechaArchivo = dayjs(qjForm.getFieldValue("fechaArchivo")).format('DD/MM/YYYY')
        const procuradorId = qjForm.getFieldValue("procuradorId")
        const fundDispImpugnada = qjForm.getFieldValue("fundDispImpugnada")
        const fundPretImpug = qjForm.getFieldValue("fundPretImpug")

        DSGenerarQueja(id, usuId, procuradorId, fechaArchivo,
            fundDispImpugnada, fundPretImpug).then((response) => {
                setLoadingQj(false);

                if (response.isSuccess) {
                    message.success("Se creó el documento exitosamente");
                    navigate(-1);
                    qjForm.resetFields();
                } else {
                    message.error(response.message);
                }
            });

    }
    const onCancelQj = () => {
        qjForm.resetFields();
        navigate(-1);
    }

    //Form Denuncia
    const [dnForm] = Form.useForm();
    const [loadingDn, setLoadingDn] = useState(false);
    const [provincias, setProvincias] = useState([]);
    const [delitos, setDelitos] = useState([]);


    const onFinishDn = () => {
        setLoadingDn(true);
        const analisis = delitos.map(d => ({
            delitoId: d.delitoId,
            delitoAnalisis: dnForm.getFieldValue(d.delitoId) || '',  // Si no hay comentario, guarda una cadena vacía
        }));
        const procuradorId = dnForm.getFieldValue("procuradorId")
        const provinciaId = dnForm.getFieldValue("provinciaId")
        const dependenciaAfectadaId = dnForm.getFieldValue("dependenciaAfectadaId")
        const anexos = dnForm.getFieldValue("anexos")
        console.log("anexoooooos: ",anexos);

        DSGenerarDenuncia(id,usuId,procuradorId,provinciaId,dependenciaAfectadaId,anexos,analisis).then((response)=>{
            setLoadingDn(false);//isSuccess
            if (response.isSuccess) {
                message.success("Se creó el documento exitosamente");
                navigate(-1);
                dnForm.resetFields();
            } else {
                message.error(response.message);
            }
        }).catch(()=>{
            setLoadingDn(false);
        });


    }
    const onCancelDn = () => {
        dnForm.resetFields();
        navigate(-1);
    }

    const fetchProvincias = async (depId) => {

        try {
            const response = await ListarProvincias(depId)
            setProvincias(response.data);
        } finally {
            //setLoadingDocsSalida(false);
        }
    };

    const fetchDelitosByLegajoId = async (legajoId) => {

        try {
            const response = await GetDelitosByLegajoId(legajoId)
            setDelitos(response.data);
        } finally {
            //setLoadingDocsSalida(false);
        }
    };

    useEffect(() => {
        if (id !== null && id !== undefined) {
            fetchDelitosByLegajoId(id);
        }
    }, [id]);

    const onFieldsChangeDn = (changeFields, allFields) => {
        const campo = changeFields[0].name[0];
        const value = changeFields[0].value;
        if (campo == 'departamentoId') {
            dnForm.setFieldValue('provinciaId', null);
            if (value !== null && value !== undefined) {
                fetchProvincias(value)
            } else {
                setProvincias([])
            }

        }
    };

    return <>{isXsScreen ?
        <CrearDocMobile
            claseDocId={claseDocumento}

            acForm={acForm}
            onFinishAc={onFinishAc}
            onCancelAc={onCancelAc}
            loadingAc={loadingAc}

            qjForm={qjForm}
            onFinishQj={onFinishQj}
            onCancelQj={onCancelQj}
            loadingQj={loadingQj}

            dnForm={dnForm}
            onFinishDn={onFinishDn}
            onCancelDn={onCancelDn}
            loadingDn={loadingDn}
            provincias={provincias}
            onFieldsChangeDn={onFieldsChangeDn}
            delitos={delitos}
        /> :
        <CrearDocWeb
            claseDocId={claseDocumento}

            acForm={acForm}
            onFinishAc={onFinishAc}
            onCancelAc={onCancelAc}
            loadingAc={loadingAc}

            qjForm={qjForm}
            onFinishQj={onFinishQj}
            onCancelQj={onCancelQj}
            loadingQj={loadingQj}

            dnForm={dnForm}
            onFinishDn={onFinishDn}
            onCancelDn={onCancelDn}
            loadingDn={loadingDn}
            provincias={provincias}
            onFieldsChangeDn={onFieldsChangeDn}
            delitos={delitos}
        />
    }

    </>;
}

export default CrearDocPage;